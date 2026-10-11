
// import Link from "next/link";
// import { notFound, redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import {
//   ArrowLeft,
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   ExternalLink,
//   FileText,
//   Phone,
//   ShieldCheck,
//   UserRound,
// } from "lucide-react";

// import AdminShell from "@/components/admin/AdminShell";
// import { getCurrentAdmin } from "@/lib/auth/session-service";
// import { prisma } from "@/lib/prisma";

// const STATUSES = [
//   "NEW",
//   "CONTACTED",
//   "CONFIRMED",
//   "COMPLETED",
//   "CANCELLED",
// ] as const;

// const ALLOWED_TRANSITIONS: Record<AppointmentStatus, readonly AppointmentStatus[]> = {
//   NEW: ["CONTACTED", "CANCELLED"],
//   CONTACTED: ["CONFIRMED", "CANCELLED"],
//   CONFIRMED: ["COMPLETED", "CANCELLED"],
//   COMPLETED: [],
//   CANCELLED: [],
// };

// type AppointmentStatus = (typeof STATUSES)[number];

// function isAppointmentStatus(
//   value: FormDataEntryValue | null,
// ): value is AppointmentStatus {
//   return (
//     typeof value === "string" &&
//     STATUSES.some((status) => status === value)
//   );
// }

// function formatDate(date: Date) {
//   return new Intl.DateTimeFormat("en-IN", {
//     timeZone: "Asia/Kolkata",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(date);
// }

// function formatDateTime(date: Date) {
//   return new Intl.DateTimeFormat("en-IN", {
//     timeZone: "Asia/Kolkata",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   }).format(date);
// }

// function statusLabel(status: string) {
//   return status.charAt(0) + status.slice(1).toLowerCase();
// }

// function statusClasses(status: string) {
//   switch (status) {
//     case "NEW":
//       return "bg-[var(--mist)] text-[var(--deep-teal)]";
//     case "CONTACTED":
//       return "bg-amber-50 text-amber-800";
//     case "CONFIRMED":
//       return "bg-emerald-50 text-emerald-800";
//     case "COMPLETED":
//       return "bg-slate-100 text-slate-700";
//     case "CANCELLED":
//       return "bg-red-50 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }



// type AppointmentDetailPageProps = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ updated?: string; error?: string }>;
// };

// export default async function AppointmentDetailPage({
//   params,
//   searchParams,
// }: AppointmentDetailPageProps) {
//   const admin = await getCurrentAdmin();

//   if (!admin) {
//     redirect("/admin/login");
//   }

//   const { id } = await params;
// const { updated, error } = await searchParams;

// {error && (
//   <div
//     role="alert"
//     className="mt-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
//   >
//     {error === "transition"
//       ? "This status change is not allowed. Refresh the page and review the current status."
//       : error === "conflict"
//         ? "Another administrator may have updated this appointment. Refresh the page and try again."
//         : "The request could not be validated. Please refresh the page and try again."}
//   </div>
// )}

//   const appointment = await prisma.appointment.findUnique({
//     where: { id },
//   });

//   if (!appointment) {
//     notFound();
//   }

  
// async function updateStatus(formData: FormData) {
//   "use server";

//   const currentAdmin = await getCurrentAdmin();

//   if (!currentAdmin) {
//     redirect("/admin/login");
//   }

//   if (
//     currentAdmin.role !== "SUPER_ADMIN" &&
//     currentAdmin.role !== "CLINIC_ADMIN"
//   ) {
//     redirect("/admin");
//   }

//   const appointmentId = formData.get("appointmentId");
//   const nextStatus = formData.get("status");

//   if (
//     typeof appointmentId !== "string" ||
//     appointmentId !== id ||
//     !isAppointmentStatus(nextStatus)
//   ) {
//     redirect(
//       `/admin/appointments/${encodeURIComponent(id)}?error=invalid`,
//     );
//   }

//   const existing = await prisma.appointment.findUnique({
//     where: { id: appointmentId },
//     select: { id: true, status: true },
//   });

//   if (!existing) {
//     redirect("/admin/appointments");
//   }

//   if (existing.status === nextStatus) {
//     redirect(
//       `/admin/appointments/${encodeURIComponent(id)}?updated=1`,
//     );
//   }

//   if (!ALLOWED_TRANSITIONS[existing.status].includes(nextStatus)) {
//     redirect(
//       `/admin/appointments/${encodeURIComponent(id)}?error=transition`,
//     );
//   }

//   const result = await prisma.appointment.updateMany({
//     where: {
//       id: appointmentId,
//       status: existing.status,
//     },
//     data: {
//       status: nextStatus,
//     },
//   });

//   if (result.count !== 1) {
//     redirect(
//       `/admin/appointments/${encodeURIComponent(id)}?error=conflict`,
//     );
//   }

//   revalidatePath("/admin");
//   revalidatePath("/admin/appointments");
//   revalidatePath(`/admin/appointments/${appointmentId}`);

//   redirect(
//     `/admin/appointments/${encodeURIComponent(appointmentId)}?updated=1`,
//   );
// }


//   const phoneHref = `tel:${appointment.phone.replace(/[^\d+]/g, "")}`;

//   return (
//     <AdminShell
//       admin={{
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//       }}
//     >
//       <div className="mx-auto max-w-5xl">
//         <Link
//           href="/admin/appointments"
//           className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
//         >
//           <ArrowLeft size={17} aria-hidden="true" />
//           Back to appointments
//         </Link>

//         <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
//           <div className="min-w-0">
//             <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
//               Clinic operations
//             </p>

//             <h1 className="mt-3 break-words font-serif text-3xl tracking-tight text-[var(--midnight)] sm:text-4xl">
//               Appointment details
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
//               Review this consultation request and update its status.
//             </p>
//           </div>

//           <span
//             className={`inline-flex w-fit shrink-0 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] ${statusClasses(appointment.status)}`}
//           >
//             {statusLabel(appointment.status)}
//           </span>
//         </div>

//         {updated === "1" && (
//           <div
//             role="status"
//             className="mt-6 flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
//           >
//             <CheckCircle2
//               size={19}
//               className="mt-0.5 shrink-0"
//               aria-hidden="true"
//             />
//             Appointment status updated successfully.
//           </div>
//         )}

//         <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
//           <div className="min-w-0 space-y-6">
//             <section className="border border-[var(--border)] bg-white">
//               <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-7">
//                 <UserRound
//                   size={19}
//                   className="text-[var(--gold)]"
//                   aria-hidden="true"
//                 />
//                 <h2 className="font-serif text-xl text-[var(--midnight)]">
//                   Patient information
//                 </h2>
//               </div>

//               <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
//                 <div className="min-w-0">
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Patient name
//                   </p>
//                   <p className="mt-2 break-words font-medium text-[var(--midnight)]">
//                     {appointment.patientName}
//                   </p>
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Phone number
//                   </p>
//                   <a
//                     href={phoneHref}
//                     className="mt-2 inline-flex min-h-11 items-center gap-2 break-all font-medium text-[var(--deep-teal)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
//                   >
//                     <Phone size={16} aria-hidden="true" />
//                     {appointment.phone}
//                   </a>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Primary concern
//                   </p>
//                   <p className="mt-2 break-words leading-7 text-[var(--midnight)]">
//                     {appointment.concern}
//                   </p>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Additional message
//                   </p>
//                   <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-[var(--muted)]">
//                     {appointment.message?.trim() ||
//                       "No additional message provided."}
//                   </p>
//                 </div>

//                 <div className="sm:col-span-2 border-t border-[var(--border)] pt-5">
//                   <div className="flex items-start gap-2 text-sm text-[var(--muted)]">
//                     <ShieldCheck
//                       size={17}
//                       className="mt-0.5 shrink-0"
//                       aria-hidden="true"
//                     />
//                     <p>
//                       Consent recorded:{" "}
//                       <span className="font-medium text-[var(--midnight)]">
//                         {appointment.consent ? "Yes" : "No"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <section className="border border-[var(--border)] bg-white">
//               <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-7">
//                 <CalendarDays
//                   size={19}
//                   className="text-[var(--gold)]"
//                   aria-hidden="true"
//                 />
//                 <h2 className="font-serif text-xl text-[var(--midnight)]">
//                   Requested appointment
//                 </h2>
//               </div>

//               <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
//                 <div>
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Preferred date
//                   </p>
//                   <p className="mt-2 font-medium text-[var(--midnight)]">
//                     {formatDate(appointment.preferredDate)}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Preferred time
//                   </p>
//                   <p className="mt-2 font-medium text-[var(--midnight)]">
//                     {appointment.preferredTime}
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </div>

//           <aside className="min-w-0 space-y-6">
//             {(admin.role === "SUPER_ADMIN" ||
//   admin.role === "CLINIC_ADMIN") && (
//             <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
//               <div className="flex items-center gap-3">
//                 <CheckCircle2
//                   size={19}
//                   className="text-[var(--gold)]"
//                   aria-hidden="true"
//                 />
//                 <h2 className="font-serif text-xl text-[var(--midnight)]">
//                   Manage status
//                 </h2>
//               </div>

//               <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
//                 Update the request as the clinic follows up with the patient.
//                 Changing the status does not notify the patient.
//               </p>

//               <form action={updateStatus} className="mt-6 space-y-4">
//                 <input
//                   type="hidden"
//                   name="appointmentId"
//                   value={appointment.id}
//                 />

//                 <label
//                   htmlFor="appointment-status"
//                   className="block text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]"
//                 >
//                   Appointment status
//                 </label>

//                 <select
//                   id="appointment-status"
//                   name="status"
//                   defaultValue={appointment.status}
//                   className="h-12 w-full border border-[var(--border)] bg-[var(--ivory)] px-3 text-sm text-[var(--midnight)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
//                 >
//                   {STATUSES.map((status) => (
//                     <option key={status} value={status}>
//                       {statusLabel(status)}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   type="submit"
//                   className="flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--midnight)] px-4 text-sm font-medium text-white transition hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
//                 >
//                   <CheckCircle2 size={17} aria-hidden="true" />
//                   Save status
//                 </button>
//               </form>
//             </section>
//             )}
//             <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
//               <div className="flex items-center gap-3">
//                 <Clock3
//                   size={19}
//                   className="text-[var(--gold)]"
//                   aria-hidden="true"
//                 />
//                 <h2 className="font-serif text-xl text-[var(--midnight)]">
//                   Request timeline
//                 </h2>
//               </div>

//               <div className="mt-5 space-y-5">
//                 <div>
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Submitted
//                   </p>
//                   <p className="mt-2 text-sm leading-6 text-[var(--midnight)]">
//                     {formatDateTime(appointment.createdAt)}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
//                     Last updated
//                   </p>
//                   <p className="mt-2 text-sm leading-6 text-[var(--midnight)]">
//                     {formatDateTime(appointment.updatedAt)}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <Link
//               href="/admin/appointments"
//               className="flex min-h-12 items-center justify-center gap-2 border border-[var(--border)] bg-transparent px-4 text-sm text-[var(--midnight)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
//             >
//               <FileText size={17} aria-hidden="true" />
//               All appointments
//               <ExternalLink size={14} aria-hidden="true" />
//             </Link>
//           </aside>
//         </div>
//       </div>
//     </AdminShell>
//   );
// }


import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Phone,
  ShieldCheck,
  UserRound,
  History,
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

type AppointmentStatus = (typeof STATUSES)[number];

const ALLOWED_TRANSITIONS: Record<
  AppointmentStatus,
  readonly AppointmentStatus[]
> = {
  NEW: ["CONTACTED", "CANCELLED"],
  CONTACTED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

function isAppointmentStatus(
  value: FormDataEntryValue | null,
): value is AppointmentStatus {
  return (
    typeof value === "string" &&
    STATUSES.some((status) => status === value)
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
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

type AppointmentDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ updated?: string; error?: string }>;
};

export default async function AppointmentDetailPage({
  params,
  searchParams,
}: AppointmentDetailPageProps) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const { updated, error } = await searchParams;

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: {
          changedBy: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!appointment) {
    notFound();
  }

  async function updateStatus(formData: FormData) {
    "use server";

    const currentAdmin = await getCurrentAdmin();

    if (!currentAdmin) {
      redirect("/admin/login");
    }

    if (
      currentAdmin.role !== "SUPER_ADMIN" &&
      currentAdmin.role !== "CLINIC_ADMIN"
    ) {
      redirect("/admin");
    }

    const appointmentId = formData.get("appointmentId");
    const nextStatus = formData.get("status");

    if (
      typeof appointmentId !== "string" ||
      appointmentId !== id ||
      !isAppointmentStatus(nextStatus)
    ) {
      redirect(
        `/admin/appointments/${encodeURIComponent(id)}?error=invalid`,
      );
    }

    const existing = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: { id: true, status: true },
    });

    if (!existing) {
      redirect("/admin/appointments");
    }

    if (existing.status === nextStatus) {
      redirect(
        `/admin/appointments/${encodeURIComponent(id)}?updated=1`,
      );
    }

    if (!ALLOWED_TRANSITIONS[existing.status].includes(nextStatus)) {
      redirect(
        `/admin/appointments/${encodeURIComponent(id)}?error=transition`,
      );
    }

    // Update the appointment and create its audit entry atomically.
    // A concurrent status change causes the transaction to make no
    // audit entry and no stale status update.
    const result = await prisma.$transaction(async (tx) => {
      const updateResult = await tx.appointment.updateMany({
        where: {
          id: appointmentId,
          status: existing.status,
        },
        data: {
          status: nextStatus,
        },
      });

      if (updateResult.count !== 1) {
        return false;
      }

      await tx.appointmentStatusHistory.create({
        data: {
          appointmentId,
          changedByAdminId: currentAdmin.id,
          previousStatus: existing.status,
          newStatus: nextStatus,
        },
      });

      return true;
    });

    if (!result) {
      redirect(
        `/admin/appointments/${encodeURIComponent(id)}?error=conflict`,
      );
    }

    revalidatePath("/admin");
    revalidatePath("/admin/appointments");
    revalidatePath(`/admin/appointments/${appointmentId}`);

    redirect(
      `/admin/appointments/${encodeURIComponent(appointmentId)}?updated=1`,
    );
  }

  const phoneHref = `tel:${appointment.phone.replace(/[^\d+]/g, "")}`;
  const canManageStatus =
    admin.role === "SUPER_ADMIN" || admin.role === "CLINIC_ADMIN";

  const availableStatuses = [
    appointment.status,
    ...ALLOWED_TRANSITIONS[appointment.status],
  ];

  return (
    <AdminShell
      admin={{
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }}
    >
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/appointments"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to appointments
        </Link>

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
              Clinic operations
            </p>

            <h1 className="mt-3 break-words font-serif text-3xl tracking-tight text-[var(--midnight)] sm:text-4xl">
              Appointment details
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Review this consultation request and update its status.
            </p>
          </div>

          <span
            className={`inline-flex w-fit shrink-0 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] ${statusClasses(appointment.status)}`}
          >
            {statusLabel(appointment.status)}
          </span>
        </div>

        {updated === "1" && (
          <div
            role="status"
            className="mt-6 flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
          >
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            Appointment status updated successfully.
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
          >
            {error === "transition"
              ? "This status change is not allowed. Refresh the page and review the current status."
              : error === "conflict"
                ? "Another administrator may have updated this appointment. Refresh the page and try again."
                : "The request could not be validated. Please refresh the page and try again."}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-6">
            <section className="border border-[var(--border)] bg-white">
              <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-7">
                <UserRound
                  size={19}
                  className="text-[var(--gold)]"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-xl text-[var(--midnight)]">
                  Patient information
                </h2>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Patient name
                  </p>
                  <p className="mt-2 break-words font-medium text-[var(--midnight)]">
                    {appointment.patientName}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Phone number
                  </p>
                  <a
                    href={phoneHref}
                    className="mt-2 inline-flex min-h-11 items-center gap-2 break-all font-medium text-[var(--deep-teal)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
                  >
                    <Phone size={16} aria-hidden="true" />
                    {appointment.phone}
                  </a>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Primary concern
                  </p>
                  <p className="mt-2 break-words leading-7 text-[var(--midnight)]">
                    {appointment.concern}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Additional message
                  </p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-[var(--muted)]">
                    {appointment.message?.trim() ||
                      "No additional message provided."}
                  </p>
                </div>

                <div className="sm:col-span-2 border-t border-[var(--border)] pt-5">
                  <div className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <ShieldCheck
                      size={17}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p>
                      Consent recorded:{" "}
                      <span className="font-medium text-[var(--midnight)]">
                        {appointment.consent ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border border-[var(--border)] bg-white">
              <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-7">
                <CalendarDays
                  size={19}
                  className="text-[var(--gold)]"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-xl text-[var(--midnight)]">
                  Requested appointment
                </h2>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Preferred date
                  </p>
                  <p className="mt-2 font-medium text-[var(--midnight)]">
                    {formatDate(appointment.preferredDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Preferred time
                  </p>
                  <p className="mt-2 font-medium text-[var(--midnight)]">
                    {appointment.preferredTime}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="min-w-0 space-y-6">
            {canManageStatus && (
              <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="text-[var(--gold)]"
                    aria-hidden="true"
                  />
                  <h2 className="font-serif text-xl text-[var(--midnight)]">
                    Manage status
                  </h2>
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Update the request as the clinic follows up with the patient.
                  Changing the status does not notify the patient.
                </p>

                <form action={updateStatus} className="mt-6 space-y-4">
                  <input
                    type="hidden"
                    name="appointmentId"
                    value={appointment.id}
                  />

                  <label
                    htmlFor="appointment-status"
                    className="block text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]"
                  >
                    Appointment status
                  </label>

                  <select
                    id="appointment-status"
                    name="status"
                    defaultValue={appointment.status}
                    className="h-12 w-full border border-[var(--border)] bg-[var(--ivory)] px-3 text-sm text-[var(--midnight)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                  >
                    {availableStatuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabel(status)}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--midnight)] px-4 text-sm font-medium text-white transition hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                  >
                    <CheckCircle2 size={17} aria-hidden="true" />
                    Save status
                  </button>
                </form>
              </section>
            )}

            <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Clock3
                  size={19}
                  className="text-[var(--gold)]"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-xl text-[var(--midnight)]">
                  Request timeline
                </h2>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Submitted
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--midnight)]">
                    {formatDateTime(appointment.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    Last updated
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--midnight)]">
                    {formatDateTime(appointment.updatedAt)}
                  </p>
                </div>
              </div>
            </section>

            <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <History
                  size={19}
                  className="text-[var(--gold)]"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-xl text-[var(--midnight)]">
                  Status history
                </h2>
              </div>

              {appointment.statusHistory.length === 0 ? (
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  No status changes have been recorded yet. Future changes
                  will appear here with the administrator and timestamp.
                </p>
              ) : (
                <ol className="mt-5 space-y-5">
                  {appointment.statusHistory.map((entry) => (
                    <li
                      key={entry.id}
                      className="border-l-2 border-[var(--border)] pl-4"
                    >
                      <p className="text-sm font-medium text-[var(--midnight)]">
                        {statusLabel(entry.previousStatus)}{" "}
                        <span aria-hidden="true">→</span>{" "}
                        {statusLabel(entry.newStatus)}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                        {formatDateTime(entry.createdAt)}
                      </p>

                      <p className="mt-1 break-words text-xs leading-5 text-[var(--muted)]">
                        Changed by {entry.changedBy.name}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <Link
              href="/admin/appointments"
              className="flex min-h-12 items-center justify-center gap-2 border border-[var(--border)] bg-transparent px-4 text-sm text-[var(--midnight)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
            >
              <FileText size={17} aria-hidden="true" />
              All appointments
              <ExternalLink size={14} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}
