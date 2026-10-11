import { NextRequest, NextResponse } from "next/server";

import { destroyAdminSession } from "@/lib/auth/session-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Request origin is not allowed.",
      },
      {
        status: 403,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  try {
    await destroyAdminSession();

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    console.error("Admin logout failed.");

    return NextResponse.json(
      {
        success: false,
        error: "We could not complete the logout request.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}