import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import {
  createInvitationSchema,
  revokeInvitationSchema,
} from "@/lib/validation/invitation";
import { sendAdminInvitation } from "@/lib/email/send-admin-invitation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_SIZE = 10_000;
const INVITATION_LIFETIME_MS = 48 * 60 * 60 * 1000;

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

function successResponse(
  data: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function originIsAllowed(request: NextRequest) {
  const configuredUrl = process.env.APP_URL;
  const origin = request.headers.get("origin");

  if (!configuredUrl || !origin) return false;

  try {
    return new URL(origin).origin === new URL(configuredUrl).origin;
  } catch {
    return false;
  }
}

async function requireManager() {
  const admin = await getCurrentAdmin();

  if (
    !admin ||
    !["SUPER_ADMIN", "CLINIC_ADMIN"].includes(admin.role)
  ) {
    return null;
  }

  return admin;
}

async function readRequestBody(
  request: NextRequest,
): Promise<
  | { success: true; body: unknown }
  | { success: false; response: NextResponse }
> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return {
      success: false,
      response: errorResponse("A JSON request body is required.", 415),
    };
  }

  const contentLength = request.headers.get("content-length");

  if (contentLength !== null) {
    const length = Number(contentLength);

    if (!Number.isSafeInteger(length) || length < 0) {
      return {
        success: false,
        response: errorResponse("Invalid content length.", 400),
      };
    }

    if (length > MAX_REQUEST_SIZE) {
      return {
        success: false,
        response: errorResponse("Request body is too large.", 413),
      };
    }
  }

  const reader = request.body?.getReader();

  if (!reader) {
    return {
      success: false,
      response: errorResponse("Invalid request body.", 400),
    };
  }

  let bodyText: string;

  try {
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        totalBytes += value.byteLength;

        if (totalBytes > MAX_REQUEST_SIZE) {
          await reader.cancel();

          return {
            success: false,
            response: errorResponse("Request body is too large.", 413),
          };
        }

        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;

    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    bodyText = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return {
      success: false,
      response: errorResponse("Invalid request body.", 400),
    };
  }

  try {
    return {
      success: true,
      body: JSON.parse(bodyText),
    };
  } catch {
    return {
      success: false,
      response: errorResponse("Invalid JSON request.", 400),
    };
  }
}

function isPrismaErrorCode(error: unknown, code: string) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === code
  );
}

export async function POST(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return errorResponse("Request origin is not allowed.", 403);
  }

  let admin;

  try {
    admin = await requireManager();
  } catch {
    console.error("Admin invitation authorization check failed.");
    return errorResponse("Unable to verify administrator access.", 500);
  }

  if (!admin) {
    return errorResponse("Administrator access is required.", 401);
  }

  const requestBody = await readRequestBody(request);

  if (!requestBody.success) {
    return requestBody.response;
  }

  const parsed = createInvitationSchema.safeParse(requestBody.body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Please check the invitation details.",
        issues: parsed.error.flatten().fieldErrors,
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const { name, email, role } = parsed.data;

  if (role === "CLINIC_ADMIN" && admin.role !== "SUPER_ADMIN") {
    return errorResponse(
      "Only a super administrator can invite clinic administrators.",
      403,
    );
  }

  const appUrl = process.env.APP_URL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  if (!appUrl || !resendApiKey || !resendFromEmail) {
    return errorResponse(
      "Invitation email service is not configured.",
      503,
    );
  }

  let invitationUrl: URL;

  try {
    invitationUrl = new URL("/admin/accept-invitation", appUrl);

    if (
      invitationUrl.protocol !== "https:" &&
      invitationUrl.hostname !== "localhost"
    ) {
      return errorResponse(
        "The invitation application URL is not configured securely.",
        503,
      );
    }
  } catch {
    return errorResponse(
      "The invitation application URL is invalid.",
      503,
    );
  }

  const now = new Date();
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex");
  const expiresAt = new Date(now.getTime() + INVITATION_LIFETIME_MS);

  let invitation: { id: string };

  try {
    invitation = await prisma.$transaction(
      async (tx) => {
        const existingUser = await tx.adminUser.findUnique({
          where: { email },
          select: { id: true },
        });

        if (existingUser) {
          throw new Error("ACCOUNT_ALREADY_EXISTS");
        }

        const existingInvitation = await tx.adminInvitation.findFirst({
          where: {
            email,
            acceptedAt: null,
            revokedAt: null,
            expiresAt: { gt: now },
          },
          select: { id: true },
        });

        if (existingInvitation) {
          throw new Error("INVITATION_ALREADY_PENDING");
        }

        return tx.adminInvitation.create({
          data: {
            name,
            email,
            role,
            tokenHash,
            invitedById: admin.id,
            expiresAt,
          },
          select: { id: true },
        });
      },
      { isolationLevel: "Serializable" },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "ACCOUNT_ALREADY_EXISTS") {
        return errorResponse(
          "An account already exists for this email address.",
          409,
        );
      }

      if (error.message === "INVITATION_ALREADY_PENDING") {
        return errorResponse(
          "A pending invitation already exists for this email address.",
          409,
        );
      }
    }

    if (
      isPrismaErrorCode(error, "P2002") ||
      isPrismaErrorCode(error, "P2034")
    ) {
      return errorResponse(
        "The invitation could not be created because the account or invitation changed. Refresh and try again.",
        409,
      );
    }

    console.error("Admin invitation database operation failed.");
    return errorResponse(
      "The invitation could not be created. Please try again.",
      500,
    );
  }

  invitationUrl.searchParams.set("token", token);

  try {
    await sendAdminInvitation({
      name,
      email,
      role,
      invitationUrl: invitationUrl.toString(),
      expiresAt,
    });
  } catch {
    console.error("Admin invitation email delivery failed.");

    try {
      await prisma.adminInvitation.deleteMany({
        where: {
          id: invitation.id,
          acceptedAt: null,
          revokedAt: null,
        },
      });
    } catch {
      console.error("Failed to clean up an undelivered invitation.");
    }

    return errorResponse(
      "The invitation email could not be sent. Please try again later.",
      502,
    );
  }

  return successResponse(
    {
      success: true,
      message: "Invitation email sent.",
      invitation: {
        id: invitation.id,
        email,
        role,
        expiresAt: expiresAt.toISOString(),
      },
    },
    201,
  );
}

export async function PATCH(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return errorResponse("Request origin is not allowed.", 403);
  }

  let admin;

  try {
    admin = await requireManager();
  } catch {
    console.error("Admin invitation authorization check failed.");
    return errorResponse("Unable to verify administrator access.", 500);
  }

  if (!admin) {
    return errorResponse("Administrator access is required.", 401);
  }

  const requestBody = await readRequestBody(request);

  if (!requestBody.success) {
    return requestBody.response;
  }

  const parsed = revokeInvitationSchema.safeParse(requestBody.body);

  if (!parsed.success) {
    return errorResponse("Invalid invitation ID.", 400);
  }

  try {
    const invitation = await prisma.adminInvitation.findUnique({
      where: { id: parsed.data.invitationId },
      select: {
        id: true,
        role: true,
        acceptedAt: true,
        revokedAt: true,
      },
    });

    if (!invitation) {
      return errorResponse("Invitation not found.", 404);
    }

    if (
      invitation.role === "CLINIC_ADMIN" &&
      admin.role !== "SUPER_ADMIN"
    ) {
      return errorResponse(
        "Only a super administrator can revoke a clinic administrator invitation.",
        403,
      );
    }

    if (invitation.acceptedAt) {
      return errorResponse(
        "This invitation has already been accepted.",
        409,
      );
    }

    if (invitation.revokedAt) {
      return errorResponse(
        "This invitation has already been revoked.",
        409,
      );
    }

    const result = await prisma.adminInvitation.updateMany({
      where: {
        id: invitation.id,
        acceptedAt: null,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });

    if (result.count !== 1) {
      return errorResponse(
        "The invitation has already changed. Refresh and try again.",
        409,
      );
    }

    return successResponse({
      success: true,
      message: "Invitation revoked.",
    });
  } catch {
    console.error("Admin invitation revocation failed.");
    return errorResponse(
      "The invitation could not be revoked. Please try again.",
      500,
    );
  }
}