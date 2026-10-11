
import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validation/appointment";
import { prisma } from "@/lib/prisma";
import { ipAddress } from "@vercel/functions";

import { isIP } from "node:net";
import { appointmentRateLimit } from "@/lib/security/rate-limit";



function getClientIp(request: Request): string | null {
  if (process.env.NODE_ENV !== "production") {
    return "local-development";
  }

  const ip = ipAddress(request);

  if (!ip || isIP(ip) === 0) {
    return null;
  }

  return ip;
}


const MAX_REQUEST_SIZE = 10_000;
const IDEMPOTENCY_KEY_PATTERN = /^[a-zA-Z0-9_-]{16,128}$/;

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}


export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    if (!clientIp) {
      return NextResponse.json(
        {
          success: false,
          error: "We cannot process your request right now. Please try again later.",
        },
        { status: 503 },
      );
    }

    let rateLimitResult;

    try {
      rateLimitResult = await appointmentRateLimit.limit(clientIp);
    } catch (error) {
      console.error("Appointment rate limiter unavailable:", error instanceof Error ? error.message : "Unknown error");

      return NextResponse.json(
        {
          success: false,
          error: "Booking is temporarily unavailable. Please try again later.",
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
          error: "Too many booking attempts. Please wait before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
            "X-RateLimit-Limit": String(rateLimitResult.limit),
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
          },
        },
      );
    }

    // Keep your existing request-size, content-type, idempotency,
    // validation, and database logic here unchanged.



    // 1. Check the declared request size.
    const contentLength = request.headers.get("content-length");

    if (contentLength !== null) {
      const size = Number(contentLength);

      if (
        !Number.isSafeInteger(size) ||
        size < 0 ||
        size > MAX_REQUEST_SIZE
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Request is too large or invalid.",
          },
          { status: 413 },
        );
      }
    }

    // 2. Accept JSON requests only.
    
const contentType = request.headers
  .get("content-type")
  ?.split(";")[0]
  .trim()
  .toLowerCase();

if (contentType !== "application/json") {

      return NextResponse.json(
        {
          success: false,
          error: "Content-Type must be application/json.",
        },
        { status: 415 },
      );
    }

    // 3. Require a valid idempotency key.
    const requestKey = request.headers.get("Idempotency-Key");

    if (!requestKey || !IDEMPOTENCY_KEY_PATTERN.test(requestKey)) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid Idempotency-Key header is required.",
        },
        { status: 400 },
      );
    }

    // 4. Read the request and check its actual byte size.
    const rawBody = await request.text();
    const actualSize = new TextEncoder().encode(rawBody).byteLength;

    if (actualSize > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "Request is too large.",
        },
        { status: 413 },
      );
    }

    // 5. Parse JSON safely.
    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request.",
        },
        { status: 400 },
      );
    }

    // 6. Ensure the body key and header key agree, if both are provided.
    if (
      typeof body === "object" &&
      body !== null &&
      "requestKey" in body &&
      body.requestKey !== requestKey
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "The request key does not match.",
        },
        { status: 400 },
      );
    }

    // 7. Validate the appointment fields.
    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the submitted information.",
          fields: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      concern,
      name,
      phone,
      date,
      time,
      message,
      consent,
    } = result.data;

    // Store the date as a date-only value represented at noon UTC.
    const preferredDate = new Date(`${date}T12:00:00.000Z`);

    // 8. Create the appointment with its unique request key.
    try {
      const appointment = await prisma.appointment.create({
        data: {
          requestKey,
          concern,
          patientName: name,
          phone,
          preferredDate,
          preferredTime: time,
          message: message || null,
          consent,
        },
      });

      return NextResponse.json(
        {
          success: true,
          appointmentId: appointment.id,
        },
        { status: 201 },
      );
    } catch (error) {
      // Concurrent requests using the same key may race.
      // The database unique constraint allows only one insert.
      if (!isUniqueConstraintError(error)) {
        throw error;
      }

      
const existing = await prisma.appointment.findUnique({
  where: { requestKey },
  select: {
    id: true,
    concern: true,
    patientName: true,
    phone: true,
    preferredDate: true,
    preferredTime: true,
    message: true,
    consent: true,
  },
});

if (
  existing &&
  (
    existing.concern !== concern ||
    existing.patientName !== name ||
    existing.phone !== phone ||
    existing.preferredDate.getTime() !== preferredDate.getTime() ||
    existing.preferredTime !== time ||
    existing.message !== (message || null) ||
    existing.consent !== consent
  )
) {
  return NextResponse.json(
    {
      success: false,
      error:
        "This request key was already used for different booking details. Please submit again.",
    },
    { status: 409 },
  );
}


      if (!existing) {
        // The uniqueness error concerned a different constraint.
        throw error;
      }

      return NextResponse.json(
        {
          success: true,
          appointmentId: existing.id,
        },
        {
          status: 200,
          headers: {
            "Idempotency-Replayed": "true",
          },
        },
      );
    }
  } catch (error) {
    console.error(
      "Appointment creation failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not submit your request right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
