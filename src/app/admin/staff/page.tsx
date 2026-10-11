
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";

import StaffManager from "@/components/admin/StaffManager";
import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth/session-service";
import { prisma } from "@/lib/prisma";

function isInvitableRole(
  role: string,
): role is "STAFF" | "CLINIC_ADMIN" {
  return role === "STAFF" || role === "CLINIC_ADMIN";
}

export default async function StaffPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  if (admin.role !== "SUPER_ADMIN" && admin.role !== "CLINIC_ADMIN") {
    redirect("/admin");
  }

  const staff = await prisma.adminUser.findMany({
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  const invitations = await prisma.adminInvitation.findMany({
    where: {
      role: {
        in: ["STAFF", "CLINIC_ADMIN"],
      },
      acceptedAt: null,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      expiresAt: true,
      createdAt: true,
      invitedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  const activeCount = staff.filter(
    (member) => member.status === "ACTIVE",
  ).length;

  const disabledCount = staff.length - activeCount;

  // Runtime filtering also narrows the role type for StaffManager.
  
type PendingInvitationRole = "STAFF" | "CLINIC_ADMIN";

const pendingInvitations = invitations.flatMap((invitation) => {
  if (
    invitation.role !== "STAFF" &&
    invitation.role !== "CLINIC_ADMIN"
  ) {
    return [];
  }

  const role: PendingInvitationRole = invitation.role;

  return [
    {
      id: invitation.id,
      name: invitation.name,
      email: invitation.email,
      role,
      expiresAt: invitation.expiresAt.toISOString(),
      createdAt: invitation.createdAt.toISOString(),
      invitedByName: invitation.invitedBy.name,
    },
  ];
});


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

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-4xl tracking-tight text-[var(--midnight)]">
                Staff directory
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Review clinic administrator accounts, assigned roles,
                and account activity.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Users size={17} aria-hidden="true" />
              {staff.length} {staff.length === 1 ? "account" : "accounts"}
            </div>
          </div>
        </header>

        <section
          aria-label="Staff account summary"
          className="mt-8 grid gap-3 sm:grid-cols-3"
        >
          <div className="border border-[var(--border)] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Total accounts
              </p>
              <Users
                size={18}
                className="text-[var(--gold)]"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 text-3xl font-medium text-[var(--midnight)]">
              {staff.length}
            </p>
          </div>

          <div className="border border-[var(--border)] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Active
              </p>
              <ShieldCheck
                size={18}
                className="text-emerald-700"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 text-3xl font-medium text-[var(--midnight)]">
              {activeCount}
            </p>
          </div>

          <div className="border border-[var(--border)] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Disabled
              </p>
              <UserRound
                size={18}
                className="text-slate-500"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 text-3xl font-medium text-[var(--midnight)]">
              {disabledCount}
            </p>
          </div>
        </section>

        <section className="mt-8 border border-[var(--border)] bg-white p-5 sm:p-6">
          <h2 className="font-serif text-2xl text-[var(--midnight)]">
            Team accounts
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Invite team members and manage access to clinic administration.
            Passwords and session tokens are never displayed here.
          </p>

          <div className="mt-6">
            <StaffManager
              currentAdminId={admin.id}
              currentAdminRole={admin.role}
              members={staff.map((member) => ({
                ...member,
                lastLoginAt:
                  member.lastLoginAt?.toISOString() ?? null,
                createdAt: member.createdAt.toISOString(),
              }))}
              invitations={pendingInvitations}
            />
          </div>
        </section>

        <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
          Team access is enforced by protected server-side APIs.
          Invitation acceptance and role changes must be verified
          independently of the dashboard interface.
        </p>
      </div>
    </AdminShell>
  );
}
