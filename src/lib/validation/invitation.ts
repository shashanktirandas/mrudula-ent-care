
import { z } from "zod";

export const createInvitationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform(
    (value) => value.toLowerCase()
  ),
  role: z.enum(["STAFF", "CLINIC_ADMIN"]),
});

export const revokeInvitationSchema = z.object({
  invitationId: z.string().min(1).max(64),
});

export type CreateInvitationInput = z.infer<
  typeof createInvitationSchema
>;
