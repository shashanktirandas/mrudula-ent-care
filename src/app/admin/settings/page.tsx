
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/SettingsForm";

const DEFAULT_SETTINGS = {
  clinicName: "Mrudula ENT Care",
  address:
    "4th Floor, Westend, Road No. 36, Venkatagiri, Jubilee Hills, Hyderabad - 500033",
  phone: "+91-9849835822",
  email: "mrudula.mukiri09@gmail.com",
  openingHours: "Monday–Saturday, 4:00 PM–9:00 PM; Sunday closed",
  mapsUrl: "https://maps.app.goo.gl/ugGUHizAvWBS9scE9",
};

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();

  if (!admin) redirect("/admin/login");

  if (
    admin.status !== "ACTIVE" ||
    !["SUPER_ADMIN", "CLINIC_ADMIN"].includes(admin.role)
  ) {
    redirect("/admin");
  }

  const rows = await prisma.clinicSetting.findMany();
  const saved = Object.fromEntries(
    rows.map(({ key, value }) => [key, value]),
  );

  const settings = {
    clinicName: saved.clinicName ?? DEFAULT_SETTINGS.clinicName,
    address: saved.address ?? DEFAULT_SETTINGS.address,
    phone: saved.phone ?? DEFAULT_SETTINGS.phone,
    email: saved.email ?? DEFAULT_SETTINGS.email,
    openingHours:
      saved.openingHours ?? DEFAULT_SETTINGS.openingHours,
    mapsUrl: saved.mapsUrl ?? DEFAULT_SETTINGS.mapsUrl,
  };

  const canEdit = admin.role === "SUPER_ADMIN";

  return (
    <AdminShell
      admin={{
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Dashboard
        </Link>

        <header className="mt-7">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
            Clinic administration
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--midnight)]">
            Clinic settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Manage the clinic contact information and opening hours.
            Keep these details accurate for patients.
          </p>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="border border-[var(--border)] bg-white p-5 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[var(--mist)] text-[var(--deep-teal)]">
                <MapPin size={19} aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[var(--midnight)]">
                  Clinic profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  Contact details patients use to reach the clinic.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <SettingsForm
                initialSettings={settings}
                canEdit={canEdit}
              />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="border border-[var(--border)] bg-white p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  className="text-[var(--gold)]"
                  aria-hidden="true"
                />
                <h2 className="font-semibold text-[var(--midnight)]">
                  Access and security
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Signed in as <strong>{admin.name}</strong>.
              </p>
              <p className="mt-1 break-words text-sm text-[var(--muted)]">
                {admin.email}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-[var(--deep-teal)]">
                {admin.role.replaceAll("_", " ")}
              </p>
              <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                {canEdit
                  ? "You can edit and save clinic-wide settings."
                  : "You can view clinic settings, but only a super administrator can change them."}
              </p>
            </div>

            <div className="border border-[var(--border)] bg-[var(--ivory)] p-5">
              <div className="flex items-center gap-2">
                <Clock3
                  size={18}
                  className="text-[var(--deep-teal)]"
                  aria-hidden="true"
                />
                <h2 className="font-semibold text-[var(--midnight)]">
                  Patient information
                </h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Verify the address, phone number, map link and clinic
                hours before saving changes.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--deep-teal)]">
                <Phone size={15} aria-hidden="true" />
                <span>Patient contact details</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </AdminShell>
  );
}
