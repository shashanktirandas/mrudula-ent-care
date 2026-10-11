import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, Users } from "lucide-react";
import { redirect } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import { prisma } from "@/lib/prisma";

const STATUS_LABELS = {
  NEW: "New",
  CONTACTED: "Contacted",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const;

function statusClasses(status: keyof typeof STATUS_LABELS) {
  switch (status) {
    case "NEW":
      return "bg-[var(--mist)] text-[var(--teal)]";
    case "CONTACTED":
      return "bg-[#F2EEE5] text-[#806B3F]";
    case "CONFIRMED":
      return "bg-[#E8F0EA] text-[#41664A]";
    case "COMPLETED":
      return "bg-[#E9ECEC] text-[#536164]";
    case "CANCELLED":
      return "bg-[#F2E8E7] text-[#875A56]";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function getIndiaDayBounds() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const today = formatter.format(new Date());

  return {
    start: new Date(`${today}T00:00:00+05:30`),
    end: new Date(`${today}T23:59:59.999+05:30`),
  };
}

function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
  );

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function AdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const { start, end } = getIndiaDayBounds();

  const [
    totalAppointments,
    newAppointments,
    confirmedAppointments,
    todayAppointments,
    recentAppointments,
  ] = await Promise.all([
    prisma.appointment.count(),

    prisma.appointment.count({
      where: {
        status: "NEW",
      },
    }),

    prisma.appointment.count({
      where: {
        status: "CONFIRMED",
      },
    }),

    prisma.appointment.count({
      where: {
        preferredDate: {
          gte: start,
          lte: end,
        },
        status: {
          not: "CANCELLED",
        },
      },
    }),

    prisma.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        patientName: true,
        phone: true,
        concern: true,
        preferredDate: true,
        preferredTime: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <AdminShell
      admin={{
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }}
    >
      <main className="min-w-0">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <section>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
            Clinic operations
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <h1 className="text-balance text-4xl font-medium leading-[0.95] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                {getGreeting()}, {admin.name.split(" ")[0]}.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                Here&apos;s what needs attention across the clinic today.
              </p>
            </div>

            <Link
              href="/admin/appointments"
              className="inline-flex min-h-11 w-fit items-center gap-2 bg-[var(--midnight)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              View appointments
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* =========================================================
            METRICS
        ========================================================= */}

        <section
          aria-label="Appointment overview"
          className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 xl:grid-cols-4"
        >
          <div className="bg-white p-6 sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              New requests
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em] text-[var(--midnight)]">
              {newAppointments}
            </p>

            <p className="mt-2 text-xs text-[var(--muted)]">
              Awaiting clinic review
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Confirmed
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em] text-[var(--midnight)]">
              {confirmedAppointments}
            </p>

            <p className="mt-2 text-xs text-[var(--muted)]">
              Confirmed consultations
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Today
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em] text-[var(--midnight)]">
              {todayAppointments}
            </p>

            <p className="mt-2 text-xs text-[var(--muted)]">
              Scheduled for today
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Total requests
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em] text-[var(--midnight)]">
              {totalAppointments}
            </p>

            <p className="mt-2 text-xs text-[var(--muted)]">
              All appointment requests
            </p>
          </div>
        </section>

        {/* =========================================================
            MAIN DASHBOARD
        ========================================================= */}

        <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Recent appointments */}

          <div className="min-w-0 border border-[var(--border)] bg-white">
            <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  Recent activity
                </p>

                <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[var(--midnight)]">
                  Latest consultation requests
                </h2>
              </div>

              <Link
                href="/admin/appointments"
                className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[var(--teal)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                View all
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
            </div>

            {recentAppointments.length > 0 ? (
              <div>
                {recentAppointments.map((appointment) => (
                  <Link
                    key={appointment.id}
                    href={`/admin/appointments/${appointment.id}`}
                    className="group flex min-w-0 flex-col gap-5 border-b border-[var(--border)] p-5 transition-colors last:border-b-0 hover:bg-[var(--ivory)] sm:grid sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-6 sm:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-start justify-between gap-4 sm:block">
                        <div>
                          <p className="truncate text-base font-semibold text-[var(--midnight)]">
                            {appointment.patientName}
                          </p>

                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {appointment.concern}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:hidden ${statusClasses(
                            appointment.status,
                          )}`}
                        >
                          {STATUS_LABELS[appointment.status]}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-[var(--muted)]">
                        Request received{" "}
                        {formatDate(appointment.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <CalendarDays
                        size={15}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />

                      <span>
                        {formatDate(appointment.preferredDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        <Clock3
                          size={15}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />

                        <span>{formatTime(appointment.preferredTime)}</span>
                      </div>

                      <span
                        className={`hidden px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:inline-flex ${statusClasses(
                          appointment.status,
                        )}`}
                      >
                        {STATUS_LABELS[appointment.status]}
                      </span>

                      <ChevronRight
                        size={16}
                        className="text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--midnight)]"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center border border-[var(--border)] bg-[var(--ivory)]">
                  <CalendarDays
                    size={19}
                    strokeWidth={1.6}
                    className="text-[var(--muted)]"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[var(--midnight)]">
                  No appointment requests yet
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                  New consultation requests submitted through the public
                  website will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Quick actions */}

          <aside className="space-y-8">
            <div className="border border-[var(--border)] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                Quick actions
              </p>

              <div className="mt-6 space-y-2">
                <Link
                  href="/admin/appointments"
                  className="flex min-h-12 items-center justify-between border border-[var(--border)] px-4 text-sm font-semibold text-[var(--midnight)] transition-colors hover:border-[var(--teal)] hover:bg-[var(--mist)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                >
                  <span className="flex items-center gap-3">
                    <CalendarDays
                      size={16}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    Manage appointments
                  </span>

                  <ChevronRight size={15} aria-hidden="true" />
                </Link>

                
{(admin.role === "SUPER_ADMIN" ||
  admin.role === "CLINIC_ADMIN") && (
  <Link
    href="/admin/staff"
    className="flex min-h-12 items-center justify-between border border-[var(--border)] px-4 text-sm font-semibold text-[var(--midnight)] transition-colors hover:border-[var(--teal)] hover:bg-[var(--mist)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
  >
    <span className="flex items-center gap-3">
      <Users
        size={16}
        strokeWidth={1.6}
        aria-hidden="true"
      />
      Manage staff
    </span>

    <ChevronRight size={15} aria-hidden="true" />
  </Link>
)}

              </div>
            </div>

            {/* Clinic identity */}

            <div className="border border-[var(--border)] bg-[var(--midnight)] p-6 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Clinic
              </p>

              <h2 className="mt-5 text-xl font-medium tracking-[-0.025em]">
                Dr. Mrudula ENT Care
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Jubilee Hills · Hyderabad
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                  Administration
                </p>

                <p className="mt-2 text-sm text-white/70">
                  {admin.role.replace("_", " ")}
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </AdminShell>
  );
}