
"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  UserPlus,
  X,
  LoaderCircle,
  ShieldCheck,
  UserRoundX,
  CheckCircle2,
  Mail,
  Clock3,
  Ban,
  RefreshCw,
} from "lucide-react";

type Role = "SUPER_ADMIN" | "CLINIC_ADMIN" | "STAFF";
type Status = "ACTIVE" | "DISABLED";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastLoginAt: string | null;
  createdAt: string;
};

type PendingInvitation = {
  id: string;
  name: string;
  email: string;
  role: "STAFF" | "CLINIC_ADMIN";
  expiresAt: string;
  createdAt: string;
  invitedByName: string;
};

type Props = {
  members: StaffMember[];
  invitations: PendingInvitation[];
  currentAdminId: string;
  currentAdminRole: Role;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function roleLabel(role: string) {
  return role.replaceAll("_", " ");
}

export default function StaffManager({
  members,
  invitations,
  currentAdminId,
  currentAdminRole,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changingId, setChangingId] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "STAFF" as "STAFF" | "CLINIC_ADMIN",
  });

  const canInviteClinicAdmins = currentAdminRole === "SUPER_ADMIN";

  async function createInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Unable to send the invitation.");
        return;
      }

      setSuccess(
        `Invitation sent to ${form.email.trim().toLowerCase()}.`,
      );

      setForm({
        name: "",
        email: "",
        role: "STAFF",
      });

      setOpen(false);
      router.refresh();
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(member: StaffMember) {
    const nextStatus: Status =
      member.status === "ACTIVE" ? "DISABLED" : "ACTIVE";

    if (member.id === currentAdminId) {
      setError("You cannot change your own account status.");
      return;
    }

    const isProtectedRole = member.role !== "STAFF";

    if (isProtectedRole && !canInviteClinicAdmins) {
      setError("You do not have permission to manage this account.");
      return;
    }

    const confirmed = window.confirm(
      nextStatus === "DISABLED"
        ? `Disable ${member.name}'s account? Their existing sessions should be revoked.`
        : `Reactivate ${member.name}'s account?`,
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setChangingId(member.id);

    try {
      const response = await fetch("/api/admin/staff", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          userId: member.id,
          status: nextStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Unable to update this account.");
        return;
      }

      setSuccess(
        `${member.name}'s account is now ${nextStatus.toLowerCase()}.`,
      );

      router.refresh();
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setChangingId(null);
    }
  }

  async function revokeInvitation(invitation: PendingInvitation) {
    const confirmed = window.confirm(
      `Revoke the invitation for ${invitation.email}? They will no longer be able to use this invitation link.`,
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setRevokingId(invitation.id);

    try {
      const response = await fetch("/api/admin/invitations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          invitationId: invitation.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Unable to revoke the invitation.");
        return;
      }

      setSuccess(`Invitation for ${invitation.email} revoked.`);
      router.refresh();
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
          Invite team members securely and manage access to clinic
          administration.
        </p>

        <button
          type="button"
          onClick={() => {
            setOpen(!open);
            setError("");
            setSuccess("");
          }}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--midnight)] px-5 text-sm font-medium text-white transition hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
        >
          {open ? <X size={17} /> : <UserPlus size={17} />}
          {open ? "Close form" : "Invite employee"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-start gap-2 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {open && (
        <form
          onSubmit={createInvitation}
          className="border border-[var(--border)] bg-white p-5 sm:p-7"
        >
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center bg-[var(--mist)] text-[var(--deep-teal)]">
              <Mail size={20} />
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--midnight)]">
                Invite a team member
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                The employee will receive a secure email invitation
                and create their own password. No temporary password
                is needed.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[var(--midnight)]">
                Full name
              </span>
              <input
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className="mt-2 h-12 w-full border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                placeholder="Employee's full name"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[var(--midnight)]">
                Email address
              </span>
              <input
                required
                type="email"
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                className="mt-2 h-12 w-full border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                placeholder="employee@example.com"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-[var(--midnight)]">
                Assigned role
              </span>
              <select
                value={form.role}
                onChange={(event) =>
                  setForm({
                    ...form,
                    role: event.target.value as "STAFF" | "CLINIC_ADMIN",
                  })
                }
                className="mt-2 h-12 w-full border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
              >
                <option value="STAFF">Staff — limited clinic access</option>
                {canInviteClinicAdmins && (
                  <option value="CLINIC_ADMIN">
                    Clinic administrator — operational management
                  </option>
                )}
              </select>
              <span className="mt-2 block text-xs leading-5 text-[var(--muted)]">
                Super-administrator access cannot be granted through
                ordinary invitations.
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--midnight)] px-6 text-sm font-medium text-white hover:bg-[var(--deep-teal)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <LoaderCircle size={17} className="animate-spin" />
              )}
              {loading ? "Sending invitation..." : "Send invitation"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="min-h-12 border border-[var(--border)] px-6 text-sm text-[var(--midnight)] hover:bg-[var(--ivory)]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-serif text-xl text-[var(--midnight)]">
              Pending invitations
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Invitations expire after 48 hours. Accepted and revoked
              invitations are not shown here.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 bg-[var(--mist)] px-3 py-2 text-xs font-medium text-[var(--deep-teal)]">
            <Clock3 size={15} />
            {invitations.length} pending
          </span>
        </div>

        {invitations.length === 0 ? (
          <div className="mt-5 border border-dashed border-[var(--border)] px-5 py-9 text-center">
            <Mail size={24} className="mx-auto text-[var(--muted)]" />
            <p className="mt-3 text-sm font-medium text-[var(--midnight)]">
              No pending invitations
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Invitations you send will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex flex-col gap-4 border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-[var(--mist)] text-[var(--deep-teal)]">
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="break-words font-medium text-[var(--midnight)]">
                      {invitation.name}
                    </p>
                    <p className="mt-1 break-all text-sm text-[var(--muted)]">
                      {invitation.email}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {roleLabel(invitation.role)}
                      {" · "}Invited by {invitation.invitedByName}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Expires {formatDate(invitation.expiresAt)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={revokingId === invitation.id}
                  onClick={() => revokeInvitation(invitation)}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-red-200 px-4 text-sm text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {revokingId === invitation.id ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Ban size={16} />
                  )}
                  Revoke invitation
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
        <h3 className="font-serif text-xl text-[var(--midnight)]">
          Existing team accounts
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Disabling an account should revoke its active sessions.
          Reactivating an account allows it to sign in again.
        </p>

        <div className="mt-5 space-y-3">
          {members.map((member) => {
            const isSelf = member.id === currentAdminId;
            const isProtectedRole = member.role !== "STAFF";
            const cannotManage =
              isSelf ||
              (isProtectedRole && !canInviteClinicAdmins);

            return (
              <div
                key={member.id}
                className="flex flex-col gap-4 border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-[var(--mist)] text-[var(--deep-teal)]">
                    <ShieldCheck size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="break-words font-medium text-[var(--midnight)]">
                      {member.name}
                      {isSelf && (
                        <span className="ml-2 text-xs text-[var(--muted)]">
                          (You)
                        </span>
                      )}
                    </p>
                    <p className="mt-1 break-all text-sm text-[var(--muted)]">
                      {member.email}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {roleLabel(member.role)} · {member.status}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Last login:{" "}
                      {member.lastLoginAt
                        ? formatDate(member.lastLoginAt)
                        : "Never"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={cannotManage || changingId === member.id}
                  onClick={() => changeStatus(member)}
                  title={
                    cannotManage
                      ? "You do not have permission to change this account."
                      : undefined
                  }
                  className={[
                    "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border px-4 text-sm transition disabled:cursor-not-allowed disabled:opacity-40",
                    member.status === "ACTIVE"
                      ? "border-red-200 text-red-700 hover:bg-red-50"
                      : "border-emerald-200 text-emerald-800 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  {changingId === member.id ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : member.status === "ACTIVE" ? (
                    <UserRoundX size={16} />
                  ) : (
                    <RefreshCw size={16} />
                  )}
                  {member.status === "ACTIVE" ? "Disable" : "Reactivate"}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
