import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  hashSessionToken,
} from "@/lib/auth/session";

const SESSION_COOKIE_NAME = "mrudula_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8; // 8 hours

export async function createAdminSession(adminUserId: string) {
  const { token, tokenHash } = createSessionToken();

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.adminSession.create({
    data: {
      adminUserId,
      tokenHash,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return expiresAt;
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);

  const session = await prisma.adminSession.findUnique({
    where: {
      tokenHash,
    },
    include: {
      adminUser: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  if (session.adminUser.status !== "ACTIVE") {
    return null;
  }

  await prisma.adminSession.update({
    where: {
      id: session.id,
    },
    data: {
      lastUsedAt: new Date(),
    },
  });

  return session.adminUser;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    const tokenHash = hashSessionToken(token);

    await prisma.adminSession.deleteMany({
      where: {
        tokenHash,
      },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}