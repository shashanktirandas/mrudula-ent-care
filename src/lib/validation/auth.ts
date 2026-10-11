import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long.")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(1, "Please enter your password.")
    .max(200, "Password is too long."),
});

export type LoginInput = z.infer<typeof loginSchema>;