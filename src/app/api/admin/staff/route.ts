
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import { updateStaffStatusSchema } from "@/lib/validation/staff";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(error: string, status: number) {
  return NextResponse.json(
    { success: false, error },
    { status },
  );
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

  if (!admin) {
    return {
      admin: null,
      response: jsonError("Authentication required.", 401),
    };
  }

  if (
    admin.role !== "SUPER_ADMIN" &&
    admin.role !== "CLINIC_ADMIN"
  ) {
    return {
      admin: null,
      response: jsonError(
        "You are not authorized to manage staff.",
        403,
      ),
    };
  }

  if (admin.status !== "ACTIVE") {
    return {
      admin: null,
      response: jsonError("Your account is not active.", 403),
    };
  }

  return { admin, response: null };
}

/**
 * Direct account creation is intentionally disabled.
 *
 * All new staff accounts must be created through the secure,
 * expiring invitation workflow:
 * POST /api/admin/invitations
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error:
        "Direct staff creation is disabled. Use the staff invitation workflow.",
    },
    { status: 410 },
  );
}

/**
 * Enable or disable an existing staff account.
 */
export async function PATCH(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return jsonError("Request origin is not allowed.", 403);
  }

  try {
    const { admin, response } = await requireManager();

    if (response || !admin) {
      return response!;
    }

    const MAX_REQUEST_SIZE = 10_000;
const contentType = request.headers
  .get("content-type")
  ?.split(";")[0]
  .trim()
  .toLowerCase();

if (contentType !== "application/json") {
  return jsonError("A JSON request body is required.", 415);
}

const contentLength = request.headers.get("content-length");

if (contentLength !== null) {
  const length = Number(contentLength);

  if (
    !Number.isSafeInteger(length) ||
    length < 0 ||
    length > MAX_REQUEST_SIZE
  ) {
    return jsonError("Request body is too large or invalid.", 413);
  }
}

let bodyText: string;

try {
  const reader = request.body?.getReader();

  if (!reader) {
    return jsonError("Invalid request body.", 400);
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > MAX_REQUEST_SIZE) {
        await reader.cancel();
        return jsonError("Request body is too large.", 413);
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
  return jsonError("Invalid request body.", 400);
}

let body: unknown;

try {
  body = JSON.parse(bodyText);
} catch {
  return jsonError("Invalid JSON request.", 400);
}

    const parsed = updateStaffStatusSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        parsed.error.issues[0]?.message ??
          "Invalid account status.",
        400,
      );
    }

    const { userId, status } = parsed.data;

    // An administrator cannot disable or enable their own account here.
    if (userId === admin.id) {
      return jsonError(
        "You cannot change your own account status.",
        400,
      );
    }

    const target = await prisma.adminUser.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!target) {
      return jsonError("Staff account not found.", 404);
    }

    // Only a super administrator may manage another super administrator.
    if (
      target.role === "SUPER_ADMIN" &&
      admin.role !== "SUPER_ADMIN"
    ) {
      return jsonError(
        "Only a super administrator can manage a super-admin account.",
        403,
      );
    }

    // Clinic administrators cannot manage other clinic administrators.
    if (
      target.role === "CLINIC_ADMIN" &&
      admin.role !== "SUPER_ADMIN"
    ) {
      return jsonError(
        "Only a super administrator can manage clinic administrators.",
        403,
      );
    }

    // Prevent disabling the last active super administrator.
    // if (
    //   target.role === "SUPER_ADMIN" &&
    //   target.status === "ACTIVE" &&
    //   status === "DISABLED"
    // ) {
    //   const activeSuperAdmins = await prisma.adminUser.count({
    //     where: {
    //       role: "SUPER_ADMIN",
    //       status: "ACTIVE",
    //     },
    //   });

    //   if (activeSuperAdmins <= 1) {
    //     return jsonError(
    //       "The last active super administrator cannot be disabled.",
    //       409,
    //     );
    //   }
    // }

    const updated = await prisma.$transaction(
  async (tx) => {
    // Recheck the target inside the transaction to avoid relying
    // exclusively on the earlier account lookup.
    const currentTarget = await tx.adminUser.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!currentTarget) {
      throw new Error("STAFF_ACCOUNT_NOT_FOUND");
    }

    // Protect the final active Super Admin atomically.
    if (
      currentTarget.role === "SUPER_ADMIN" &&
      currentTarget.status === "ACTIVE" &&
      status === "DISABLED"
    ) {
      const activeSuperAdmins = await tx.adminUser.count({
        where: {
          role: "SUPER_ADMIN",
          status: "ACTIVE",
        },
      });

      if (activeSuperAdmins <= 1) {
        throw new Error("LAST_ACTIVE_SUPER_ADMIN");
      }
    }

    const account = await tx.adminUser.update({
      where: { id: userId },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    // Revoke sessions in the same transaction when disabling an account.
    if (status === "DISABLED") {
      await tx.adminSession.deleteMany({
        where: { adminUserId: userId },
      });
    }

    return account;
  },
  {
    isolationLevel: "Serializable",
  },
);

    return NextResponse.json({
      success: true,
      staff: updated,
    });
    } catch (error) {
    if (error instanceof Error) {
      if (error.message === "LAST_ACTIVE_SUPER_ADMIN") {
        return jsonError(
          "The last active super administrator cannot be disabled.",
          409,
        );
      }

      if (error.message === "STAFF_ACCOUNT_NOT_FOUND") {
        return jsonError("Staff account not found.", 404);
      }
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2034"
    ) {
      return jsonError(
        "The staff account changed concurrently. Please retry the request.",
        409,
      );
    }

    console.error("Staff status update failed:", {
      message:
        error instanceof Error ? error.message : "Unknown error",
    });

    return jsonError("Unable to update the staff account.", 500);
  }

}
