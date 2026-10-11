import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  Search,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import { prisma } from "@/lib/prisma";

const STATUSES = [
  "NEW",
  "CONTACTED",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
] as const;

type StatusFilter = (typeof STATUSES)[number];

function isStatus(value: string | undefined): value is StatusFilter {
  return Boolean(value && STATUSES.includes(value as StatusFilter));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}


function getIndiaTodayDateKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}


function statusLabel(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function statusClasses(status: string) {
  switch (status) {
    case "NEW":
      return "bg-[var(--mist)] text-[var(--deep-teal)]";
    case "CONTACTED":
      return "bg-amber-50 text-amber-800";
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-800";
    case "COMPLETED":
      return "bg-slate-100 text-slate-700";
    case "CANCELLED":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

type AppointmentsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

export default async function AppointmentsPage({
  searchParams,
}: AppointmentsPageProps) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const params = await searchParams;

  const search = params.q?.trim() ?? "";
  const status = isStatus(params.status)
    ? params.status
    : undefined;
  
const todayKey = getIndiaTodayDateKey();

// Appointment dates are stored as calendar dates at UTC midnight.
const todayStart = new Date(`${todayKey}T00:00:00.000Z`);
const tomorrowStart = new Date(todayStart);
tomorrowStart.setUTCDate(tomorrowStart.getUTCDate() + 1);

const [
  newRequests,
  contactedRequests,
  confirmedAppointments,
  todaysAppointments,
] = await Promise.all([
  prisma.appointment.count({
    where: { status: "NEW" },
  }),
  prisma.appointment.count({
    where: { status: "CONTACTED" },
  }),
  prisma.appointment.count({
    where: { status: "CONFIRMED" },
  }),
  prisma.appointment.findMany({
    where: {
      preferredDate: {
        gte: todayStart,
        lt: tomorrowStart,
      },
      status: {
        not: "CANCELLED",
      },
    },
    orderBy: [
      { preferredTime: "asc" },
      { createdAt: "asc" },
    ],
    take: 6,
    select: {
      id: true,
      patientName: true,
      concern: true,
      preferredTime: true,
      status: true,
    },
  }),
]);

  const appointments = await prisma.appointment.findMany({
    where: {
      ...(status
        ? {
            status,
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                patientName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: search,
                },
              },
              {
                concern: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    orderBy: [
      {
        preferredDate: "asc",
      },
      {
        preferredTime: "asc",
      },
    ],
  });

  const totalAppointments = await prisma.appointment.count();

  return (
    <AdminShell
      admin={{
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }}
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
          Clinic operations
        </p>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl tracking-[-0.025em] text-[var(--midnight)]">
              Appointments
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Review consultation requests and keep patient contact
              information organised.
            </p>
          </div>

          <div className="shrink-0 text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--midnight)]">
              {totalAppointments}
            </span>{" "}
            total
          </div>
        </div>
      </div>
      
<section
  aria-label="Appointment overview"
  className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
>
  {[
    {
      label: "New requests",
      value: newRequests,
      hint: "Awaiting first contact",
      href: "/admin/appointments?status=NEW",
      accent: "border-l-[var(--gold)]",
    },
    {
      label: "Contacted",
      value: contactedRequests,
      hint: "Follow-up in progress",
      href: "/admin/appointments?status=CONTACTED",
      accent: "border-l-amber-500",
    },
    {
      label: "Confirmed",
      value: confirmedAppointments,
      hint: "Appointments confirmed",
      href: "/admin/appointments?status=CONFIRMED",
      accent: "border-l-emerald-600",
    },
    {
      label: "Today's schedule",
      value: todaysAppointments.length,
      hint: "Non-cancelled appointments",
      href: "#todays-schedule",
      accent: "border-l-[var(--deep-teal)]",
    },
  ].map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className={`block border border-[var(--border)] border-l-4 ${item.accent} bg-white p-5 transition hover:border-t-[var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {item.label}
      </p>
      <p className="mt-3 font-serif text-3xl text-[var(--midnight)]">
        {item.value}
      </p>
      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
        {item.hint}
      </p>
    </Link>
  ))}
</section>

<section
  id="todays-schedule"
  className="mt-6 border border-[var(--border)] bg-white"
  aria-labelledby="todays-schedule-heading"
>
  <div className="flex flex-col gap-2 border-b border-[var(--border)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--gold)]">
        Clinic schedule
      </p>
      <h2
        id="todays-schedule-heading"
        className="mt-2 font-serif text-2xl text-[var(--midnight)]"
      >
        Today&apos;s appointments
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {formatDate(new Date(`${todayKey}T00:00:00.000Z`))}
      </p>
    </div>

    <span className="text-sm text-[var(--muted)]">
      {todaysAppointments.length} shown
    </span>
  </div>

  {todaysAppointments.length === 0 ? (
    <div className="px-5 py-8 sm:px-6">
      <p className="text-sm font-medium text-[var(--midnight)]">
        No appointments scheduled for today.
      </p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
        New bookings will appear here when they match today&apos;s date.
      </p>
    </div>
  ) : (
    <ul className="divide-y divide-[var(--border)]">
      {todaysAppointments.map((appointment) => (
        <li key={appointment.id}>
          <Link
            href={`/admin/appointments/${appointment.id}`}
            className="flex flex-col gap-3 px-5 py-4 transition hover:bg-[var(--ivory)] sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div className="min-w-0">
              <p className="font-medium text-[var(--midnight)]">
                {appointment.patientName}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {appointment.concern}
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
              <span className="text-sm font-medium text-[var(--midnight)]">
                {appointment.preferredTime}
              </span>
              <span
                className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] ${statusClasses(appointment.status)}`}
              >
                {statusLabel(appointment.status)}
              </span>
              <ChevronRight
                size={17}
                aria-hidden="true"
                className="text-[var(--muted)]"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )}
</section>

      {/* Filters */}
      <form
        method="GET"
        className="mt-8 flex flex-col gap-3 border border-[var(--border)] bg-white p-4 sm:flex-row"
      >
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search appointments</span>

          <Search
            size={17}
            strokeWidth={1.7}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Search patient, phone or concern"
            className="h-12 w-full border border-[var(--border)] bg-[var(--ivory)] pl-11 pr-4 text-sm text-[var(--midnight)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/15"
          />
        </label>

        <label className="sm:w-52">
          <span className="sr-only">Filter by status</span>

          <select
            name="status"
            defaultValue={status ?? ""}
            className="h-12 w-full border border-[var(--border)] bg-[var(--ivory)] px-4 text-sm text-[var(--midnight)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/15"
          >
            <option value="">All statuses</option>

            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {statusLabel(item)}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="h-12 bg-[var(--midnight)] px-6 text-sm font-medium text-white transition hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
        >
          Filter
        </button>
      </form>

      {/* Empty state */}
      {appointments.length === 0 ? (
        <section className="mt-6 border border-[var(--border)] bg-white px-6 py-16 text-center">
          <CalendarDays
            size={28}
            strokeWidth={1.4}
            className="mx-auto text-[var(--gold)]"
            aria-hidden="true"
          />

          <h2 className="mt-5 font-serif text-2xl text-[var(--midnight)]">
            No appointments found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            {search || status
              ? "Try changing your search or status filter."
              : "New patient consultation requests will appear here."}
          </p>
        </section>
      ) : (
        <>
          {/* Mobile cards */}
          <section
            aria-label="Appointments"
            className="mt-6 space-y-3 md:hidden"
          >
            {appointments.map((appointment) => (
              <Link
                key={appointment.id}
                href={`/admin/appointments/${appointment.id}`}
                className="block border border-[var(--border)] bg-white p-5 transition hover:border-[var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-medium text-[var(--midnight)]">
                      {appointment.patientName}
                    </h2>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {appointment.concern}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusClasses(
                      appointment.status,
                    )}`}
                  >
                    {statusLabel(appointment.status)}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <div>
                    <p className="text-sm text-[var(--midnight)]">
                      {formatDate(appointment.preferredDate)}
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {appointment.preferredTime}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    strokeWidth={1.6}
                    className="text-[var(--muted)]"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </section>

          {/* Desktop/tablet table */}
          <section className="mt-6 hidden overflow-hidden border border-[var(--border)] bg-white md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--mist)]/40">
                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      Patient
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      Concern
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      Time
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="px-5 py-5">
                        <p className="font-medium text-[var(--midnight)]">
                          {appointment.patientName}
                        </p>

                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {appointment.phone}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-[var(--muted)]">
                        {appointment.concern}
                      </td>

                      <td className="px-5 py-5 text-sm text-[var(--midnight)]">
                        {formatDate(appointment.preferredDate)}
                      </td>

                      <td className="px-5 py-5 text-sm text-[var(--muted)]">
                        {appointment.preferredTime}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusClasses(
                            appointment.status,
                          )}`}
                        >
                          {statusLabel(appointment.status)}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <Link
                          href={`/admin/appointments/${appointment.id}`}
                          aria-label={`Open appointment for ${appointment.patientName}`}
                          className="inline-flex h-10 w-10 items-center justify-center text-[var(--muted)] transition hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
                        >
                          <ChevronRight
                            size={18}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminShell>
  );
}