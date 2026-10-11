"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

type Props = {
  initialToken: string;
};

type AcceptInvitationResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default function AcceptInvitationForm({ initialToken }: Props) {
  const [token] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Remove the token from the visible URL after the page loads.
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname,
    );
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (loading) return;

    if (!token) {
      setError(
        "The invitation link is missing its token. Please request a new invitation.",
      );
      return;
    }

    if (password.length < 12 || password.length > 128) {
      setError("Your password must contain 12 to 128 characters.");
      return;
    }

    if (password !== confirmation) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/invitations/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ token, password }),
      });

      let data: AcceptInvitationResponse;

      try {
        data = (await response.json()) as AcceptInvitationResponse;
      } catch {
        setError("We couldn't process the response. Please try again.");
        return;
      }

      if (!response.ok || data.success !== true) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "We couldn't accept this invitation. Please try again.",
        );
        return;
      }

      setSuccess(true);
      setPassword("");
      setConfirmation("");
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#DCE3E0] bg-white p-6 shadow-xl sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1D5A5D]">
          Dr. Mrudula ENT Care
        </p>

        {success ? (
          <div className="mt-8">
            <div
              aria-hidden="true"
              className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#E8EFED] text-xl text-[#1D5A5D]"
            >
              ✓
            </div>

            <h1 className="text-2xl font-semibold text-[#0B1720]">
              Welcome to the team
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#687579]">
              Your account has been activated. You can now sign in using
              the email address you were invited with and the password
              you just created.
            </p>

            <Link
              href="/admin/login"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#123D43] px-5 py-3 font-medium text-white transition hover:bg-[#1D5A5D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D5A5D]"
            >
              Continue to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-8 text-2xl font-semibold tracking-tight text-[#0B1720]">
              Set up your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#687579]">
              Create a password to activate your clinic team account.
              Your invitation must be valid and unused.
            </p>

            {!token && (
              <p
                role="alert"
                className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-800"
              >
                The invitation token is missing. Please open the complete
                invitation link from your email.
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#0B1720]"
                >
                  Create password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-[#DCE3E0] px-4 outline-none transition focus:border-[#1D5A5D] focus:ring-2 focus:ring-[#1D5A5D]/15"
                  placeholder="At least 12 characters"
                  aria-invalid={Boolean(error)}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmation"
                  className="mb-2 block text-sm font-medium text-[#0B1720]"
                >
                  Confirm password
                </label>

                <input
                  id="confirmation"
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-[#DCE3E0] px-4 outline-none transition focus:border-[#1D5A5D] focus:ring-2 focus:ring-[#1D5A5D]/15"
                  placeholder="Enter your password again"
                  aria-invalid={Boolean(error)}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-800"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !token}
                className="min-h-12 w-full rounded-xl bg-[#123D43] px-5 py-3 font-medium text-white transition hover:bg-[#1D5A5D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D5A5D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Activating account..." : "Activate account"}
              </button>
            </form>
          </>
        )}

        <p className="mt-7 text-center text-xs leading-5 text-[#687579]">
          Secure team access &middot; Dr. Mrudula ENT Care
        </p>
      </section>
    </main>
  );
}