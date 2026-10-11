
import { z } from "zod";

export const createStaffSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email address is too long.")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(12, "Password must contain at least 12 characters.")
    .max(128, "Password must be at most 128 characters."),
  
  role: z.enum(["CLINIC_ADMIN", "STAFF"]),
});

export const updateStaffStatusSchema = z.object({
  userId: z.string().min(1).max(64),
  status: z.enum(["ACTIVE", "DISABLED"]),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffStatusInput = z.infer<
  typeof updateStaffStatusSchema
>;
