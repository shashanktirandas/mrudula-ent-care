import { createHash } from "node:crypto";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { acceptInvitationSchema } from "@/lib/validation/accept-invitation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_SIZE = 10_000;

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

function originIsAllowed(request: NextRequest) {
  const appUrl = process.env.APP_URL;
  const origin = request.headers.get("origin");

  if (!appUrl || !origin) return false;

  try {
    return new URL(origin).origin === new URL(appUrl).origin;
  } catch {
    return false;
  }
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

    if (
      !Number.isSafeInteger(length) ||
      length < 0 ||
      length > MAX_REQUEST_SIZE
    ) {
      return {
        success: false,
        response: errorResponse("Request body is too large or invalid.", 413),
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

export async function POST(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return errorResponse("Request origin is not allowed.", 403);
  }

  const requestBody = await readRequestBody(request);

  if (!requestBody.success) {
    return requestBody.response;
  }

  const parsed = acceptInvitationSchema.safeParse(requestBody.body);

  if (!parsed.success) {
    return errorResponse(
      "Enter a valid invitation token and a password of at least 12 characters.",
      400,
    );
  }

  const { token, password } = parsed.data;

  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex");

  const now = new Date();

  try {
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    await prisma.$transaction(async (tx) => {
      const invitation = await tx.adminInvitation.findUnique({
        where: { tokenHash },
      });

      if (
        !invitation ||
        invitation.acceptedAt ||
        invitation.revokedAt ||
        invitation.expiresAt <= now
      ) {
        throw new Error("INVITATION_INVALID");
      }

      // Claim the invitation atomically so concurrent requests
      // cannot both create an account from the same invitation.
      const claimed = await tx.adminInvitation.updateMany({
        where: {
          id: invitation.id,
          tokenHash,
          acceptedAt: null,
          revokedAt: null,
          expiresAt: { gt: now },
        },
        data: { acceptedAt: now },
      });

      if (claimed.count !== 1) {
        throw new Error("INVITATION_INVALID");
      }

      await tx.adminUser.create({
        data: {
          email: invitation.email,
          name: invitation.name,
          role: invitation.role,
          passwordHash,
          status: "ACTIVE",
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your account is ready. You can now sign in.",
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "INVITATION_INVALID"
    ) {
      return errorResponse(
        "This invitation is invalid, expired, revoked, or already used.",
        400,
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return errorResponse(
        "An account already exists for this invitation.",
        409,
      );
    }

    console.error("Invitation acceptance failed.");

    return errorResponse(
      "We could not complete your registration. Please try again.",
      500,
    );
  }
}