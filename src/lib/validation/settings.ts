
import { z } from "zod";

export const clinicSettingsSchema = z.object({
  clinicName: z
    .string()
    .trim()
    .min(1, "Clinic name is required.")
    .max(120, "Clinic name must be at most 120 characters."),

  address: z
    .string()
    .trim()
    .min(1, "Clinic address is required.")
    .max(300, "Clinic address must be at most 300 characters."),

  phone: z
    .string()
    .trim()
    .min(5, "Enter a valid phone number.")
    .max(30, "Phone number is too long."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email address is too long.")
    .transform((value) => value.toLowerCase()),

  openingHours: z
    .string()
    .trim()
    .min(1, "Opening hours are required.")
    .max(200, "Opening hours must be at most 200 characters."),

  mapsUrl: z
    .string()
    .trim()
    .url("Enter a valid map URL.")
    .max(2048, "Map URL is too long."),
});

export type ClinicSettingsInput = z.infer<
  typeof clinicSettingsSchema
>;
