
-- Add the email column without requiring values for existing appointments.
ALTER TABLE "Appointment"
ADD COLUMN "email" TEXT;
