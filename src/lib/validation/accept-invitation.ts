
import { z } from "zod";

export const acceptInvitationSchema = z.object({
  token: z.string().min(32).max(128),
  password: z.string().min(12).max(128),
});
