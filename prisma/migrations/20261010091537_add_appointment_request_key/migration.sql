
-- Step 1: Add the column as nullable so existing appointments remain valid.
ALTER TABLE "Appointment"
ADD COLUMN "requestKey" TEXT;

-- Step 2: Give every existing appointment a distinct key.
UPDATE "Appointment"
SET "requestKey" = 'legacy_' || "id"
WHERE "requestKey" IS NULL;

-- Step 3: Make the column mandatory after every existing row has a key.
ALTER TABLE "Appointment"
ALTER COLUMN "requestKey" SET NOT NULL;

-- Step 4: Enforce uniqueness in PostgreSQL.
CREATE UNIQUE INDEX "Appointment_requestKey_key"
ON "Appointment"("requestKey");
