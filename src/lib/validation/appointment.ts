
import { z } from "zod";

const CONCERNS = [
  "Ear",
  "Nose & Sinus",
  "Throat & Voice",
  "Vertigo & Balance",
  "Children's ENT",
  "Head & Neck",
  "General ENT concern",
] as const;

const CONSULTATION_TIMES = [
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
] as const;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function getIndiaDateString(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function isValidCalendarDate(date: string): boolean {
  if (!DATE_PATTERN.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);

  if (year < 1 || month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(
    Date.UTC(year, month, 0),
  ).getUTCDate();

  return day >= 1 && day <= daysInMonth;
}

function getIndiaWeekday(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  const selectedDate = new Date(
    Date.UTC(year, month - 1, day, 12),
  );

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(selectedDate);
}

export const appointmentSchema = z
  .object({
    concern: z.enum(CONCERNS),

    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Name is too long."),

    phone: z
      .string()
      .trim()
      .regex(
        /^[6-9]\d{9}$/,
        "Please enter a valid Indian mobile number.",
      ),

    date: z
      .string()
      .regex(DATE_PATTERN, "Please select a valid date.")
      .refine(
        isValidCalendarDate,
        "Please select a valid calendar date.",
      ),

    time: z.enum(CONSULTATION_TIMES),

    message: z
      .string()
      .trim()
      .max(1000, "Message is too long.")
      .optional()
      .default(""),

    consent: z.literal(true, {
      error:
        "Please confirm that you agree to be contacted by the clinic.",
    }),
  })
  .superRefine((data, ctx) => {
    const today = getIndiaDateString();

    if (data.date < today) {
      ctx.addIssue({
        code: "custom",
        path: ["date"],
        message: "Please select today or a future date.",
      });
    }

    if (isValidCalendarDate(data.date)) {
      const weekday = getIndiaWeekday(data.date);

      if (weekday === "Sun") {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: "The clinic is closed on Sundays.",
        });
      }
    }
  });

export type AppointmentInput = z.infer<
  typeof appointmentSchema
>;
