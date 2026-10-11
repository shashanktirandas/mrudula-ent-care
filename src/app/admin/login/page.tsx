"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data: {
        success?: boolean;
        error?: string;
      } = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Unable to sign in.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(
        "We could not connect to the admin service. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--ivory)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* Brand panel */}
      <section className="relative hidden overflow-hidden bg-[var(--midnight)] lg:flex lg:min-h-screen lg:flex-col lg:justify-between">
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-[var(--gold)]/10" />
          <div className="absolute -left-24 -top-24 h-[20rem] w-[20rem] rounded-full border border-[var(--gold)]/10" />
          <div className="absolute bottom-[-12rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 p-10 xl:p-14">
          <Image
            src="/images/brand/mrudula-ent-care-logo.png"
            alt="Dr. Mrudula ENT Care"
            width={190}
            height={68}
            priority
            className="h-auto w-[165px] object-contain"
          />
        </div>

        <div className="relative z-10 max-w-2xl px-10 pb-16 xl:px-14 xl:pb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[var(--gold-light)]">
            Clinic Administration
          </p>

          <h1 className="max-w-xl text-balance font-serif text-5xl leading-[1.05] tracking-[-0.035em] text-white xl:text-6xl">
            Care begins with a well-run practice.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-white/60">
            Secure access to appointments, patient enquiries and clinic
            operations for authorised team members.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-white/45">
            <ShieldCheck
              size={17}
              strokeWidth={1.5}
              className="text-[var(--gold-light)]"
              aria-hidden="true"
            />
            Protected clinic system
          </div>
        </div>
      </section>

      {/* Login panel */}
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-[440px]">
          {/* Mobile brand */}
          <div className="mb-14 lg:hidden">
            <Image
              src="/images/brand/mrudula-ent-care-logo.png"
              alt="Dr. Mrudula ENT Care"
              width={180}
              height={64}
              priority
              className="h-auto w-[155px] object-contain"
            />
          </div>

          <div className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
              Staff Portal
            </p>

            <h2 className="font-serif text-4xl tracking-[-0.025em] text-[var(--midnight)]">
              Welcome back.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Sign in to securely access clinic administration.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-sm font-medium text-[var(--midnight)]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  aria-invalid={Boolean(error)}
                  className="h-14 w-full border border-[var(--border)] bg-white px-4 text-[var(--midnight)] outline-none transition-all duration-200 placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/15"
                  placeholder="you@clinic.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2.5 block text-sm font-medium text-[var(--midnight)]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    required
                    aria-invalid={Boolean(error)}
                    className="h-14 w-full border border-[var(--border)] bg-white px-4 pr-14 text-[var(--midnight)] outline-none transition-all duration-200 placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/15"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} strokeWidth={1.7} aria-hidden="true" />
                    ) : (
                      <Eye size={19} strokeWidth={1.7} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group flex h-14 w-full items-center justify-center gap-3 bg-[var(--midnight)] px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span aria-live="polite">Signing in…</span>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 flex items-start gap-3 border-t border-[var(--border)] pt-6">
            <ShieldCheck
              size={17}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-[var(--gold)]"
              aria-hidden="true"
            />

            <p className="text-xs leading-5 text-[var(--muted)]">
              This portal is restricted to authorised Dr. Mrudula ENT Care
              staff. Never share your login credentials.
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-[var(--muted)]">
            Dr. Mrudula ENT Care · Jubilee Hills, Hyderabad
          </p>
        </div>
      </section>
    </main>
  );
}