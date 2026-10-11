
import { connection } from "next/server";

import { prisma } from "@/lib/prisma";

export const DEFAULT_CLINIC_SETTINGS = {
  clinicName: "Dr. Mrudula ENT Care",
  address:
    "4th Floor, Westend, Road No. 36, Venkatagiri, Jubilee Hills, Hyderabad - 500033",
  phone: "+91 98498 35822",
  email: "mrudula.mukiri09@gmail.com",
  openingHours: "Monday–Saturday · 4:00 PM–9:00 PM",
  mapsUrl: "https://maps.app.goo.gl/ugGUHizAvWBS9scE9",
};

export type ClinicSettings = typeof DEFAULT_CLINIC_SETTINGS;

export async function getClinicSettings(): Promise<ClinicSettings> {
  // Read the database at request time, not during static generation.
  await connection();

  const rows = await prisma.clinicSetting.findMany();

  const saved = Object.fromEntries(
    rows.map(({ key, value }) => [key, value]),
  );

  return {
    clinicName:
      saved.clinicName ?? DEFAULT_CLINIC_SETTINGS.clinicName,
    address: saved.address ?? DEFAULT_CLINIC_SETTINGS.address,
    phone: saved.phone ?? DEFAULT_CLINIC_SETTINGS.phone,
    email: saved.email ?? DEFAULT_CLINIC_SETTINGS.email,
    openingHours:
      saved.openingHours ?? DEFAULT_CLINIC_SETTINGS.openingHours,
    mapsUrl: saved.mapsUrl ?? DEFAULT_CLINIC_SETTINGS.mapsUrl,
  };
}
