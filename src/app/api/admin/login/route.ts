import { isIP } from "node:net";
import { ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";
import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation/auth";
import { createAdminSession } from "@/lib/auth/session-service";
import { adminLoginRateLimit } from "@/lib/security/rate-limit";

const MAX_REQUEST_SIZE = 10_000;

function getClientIp(request: Request): string | null {
  if (process.env.NODE_ENV !== "production") {
    return "local-development";
  }

  const ip = ipAddress(request);
  return ip && isIP(ip) ? ip : null;
}

async function readLimitedBody(
  request: Request,
): Promise<{ text: string; tooLarge: boolean }> {
  const reader = request.body?.getReader();

  if (!reader) {
    return { text: "", tooLarge: false };
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
        return { text: "", tooLarge: true };
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return {
    text: new TextDecoder("utf-8", { fatal: true }).decode(body),
    tooLarge: false,
  };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (!clientIp) {
    return NextResponse.json(
      {
        success: false,
        error: "Login is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  try {
    let rateLimitResult;

    try {
      rateLimitResult = await adminLoginRateLimit.limit(clientIp);
    } catch (error) {
      console.error(
        "Admin login rate limiter unavailable:",
        error instanceof Error ? error.message : "Unknown error",
      );

      return NextResponse.json(
        {
          success: false,
          error: "Login is temporarily unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    if (!rateLimitResult.success) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
      );

      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please wait before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
            "X-RateLimit-Limit": String(rateLimitResult.limit),
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const contentType = request.headers
      .get("content-type")
      ?.split(";")[0]
      .trim()
      .toLowerCase();

    if (contentType !== "application/json") {
      return NextResponse.json(
        { success: false, error: "A JSON request body is required." },
        { status: 415 },
      );
    }

    const contentLength = request.headers.get("content-length");

    if (contentLength !== null) {
      const length = Number(contentLength);

      if (
        !Number.isSafeInteger(length) ||
        length < 0 ||
        length > MAX_REQUEST_SIZE
      ) {
        return NextResponse.json(
          { success: false, error: "Request body is too large or invalid." },
          { status: 413 },
        );
      }
    }

    let bodyText: string;

    try {
      const body = await readLimitedBody(request);

      if (body.tooLarge) {
        return NextResponse.json(
          { success: false, error: "Request body is too large." },
          { status: 413 },
        );
      }

      bodyText = body.text;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Please check your email and password.",
        },
        { status: 400 },
      );
    }

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check your email and password.",
        },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    // Keep authentication errors generic; never reveal whether an account exists.
    if (!admin || admin.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const passwordValid = await argon2.verify(
      admin.passwordHash,
      password,
    );

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 },
      );
    }

    await createAdminSession(admin.id);

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error(
      "Admin login failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      {
        success: false,
        error: "We could not complete the login request.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}