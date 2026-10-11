
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import { clinicSettingsSchema } from "@/lib/validation/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  clinicName: "Mrudula ENT Care",
  address:
    "4th Floor, Westend, Road No. 36, Venkatagiri, Jubilee Hills, Hyderabad - 500033",
  phone: "+91-9849835822",
  email: "mrudula.mukiri09@gmail.com",
  openingHours: "Monday–Saturday, 4:00 PM–9:00 PM; Sunday closed",
  mapsUrl: "https://maps.app.goo.gl/ugGUHizAvWBS9scE9",
};

type ClinicSettings = typeof DEFAULT_SETTINGS;

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
    return (
      new URL(origin).origin === new URL(configuredUrl).origin
    );
  } catch {
    return false;
  }
}

async function requireClinicAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return {
      admin: null,
      response: jsonError("Authentication required.", 401),
    };
  }

  if (
    admin.status !== "ACTIVE" ||
    !["SUPER_ADMIN", "CLINIC_ADMIN"].includes(admin.role)
  ) {
    return {
      admin: null,
      response: jsonError(
        "You are not authorized to access clinic settings.",
        403,
      ),
    };
  }

  return { admin, response: null };
}

async function readSettings(): Promise<ClinicSettings> {
  const rows = await prisma.clinicSetting.findMany();

  const saved = Object.fromEntries(
    rows.map(({ key, value }) => [key, value]),
  );

  return {
    clinicName: saved.clinicName ?? DEFAULT_SETTINGS.clinicName,
    address: saved.address ?? DEFAULT_SETTINGS.address,
    phone: saved.phone ?? DEFAULT_SETTINGS.phone,
    email: saved.email ?? DEFAULT_SETTINGS.email,
    openingHours:
      saved.openingHours ?? DEFAULT_SETTINGS.openingHours,
    mapsUrl: saved.mapsUrl ?? DEFAULT_SETTINGS.mapsUrl,
  };
}

export async function GET() {
  try {
    const { response } = await requireClinicAdmin();

    if (response) return response;

    const settings = await readSettings();

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Failed to read clinic settings:", error);
    return jsonError("Unable to load clinic settings.", 500);
  }
}

export async function PUT(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return jsonError("Request origin is not allowed.", 403);
  }

  try {
    const { admin, response } = await requireClinicAdmin();

    if (response || !admin) return response!;

    if (admin.role !== "SUPER_ADMIN") {
      return jsonError(
        "Only a super administrator can update clinic settings.",
        403,
      );
    }

    const contentType = request.headers
      .get("content-type")
      ?.split(";")[0];

    if (contentType !== "application/json") {
      return jsonError("Content-Type must be application/json.", 415);
    }

    const MAX_REQUEST_SIZE = 10_000;
    const contentLength = Number(
      request.headers.get("content-length") ?? "0",
    );

    if (
      !Number.isFinite(contentLength) ||
      contentLength < 0 ||
      contentLength > MAX_REQUEST_SIZE
    ) {
      return jsonError("Request body is too large.", 413);
    }

    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return jsonError("Invalid settings payload.", 400);
    }

    const parsed = clinicSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the invalid settings.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const settings = parsed.data;

    await prisma.$transaction(
      Object.entries(settings).map(([key, value]) =>
        prisma.clinicSetting.upsert({
          where: { key },
          create: { key, value },
          update: { value },
        }),
      ),
    );

    return NextResponse.json({
      success: true,
      message: "Clinic settings saved successfully.",
      settings: await readSettings(),
    });
  } catch (error) {
    console.error("Failed to save clinic settings:", error);
    return jsonError("Unable to save clinic settings.", 500);
  }
}
