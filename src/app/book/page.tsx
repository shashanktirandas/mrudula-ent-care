"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Check,
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const concerns = [
  "Ear",
  "Nose & Sinus",
  "Throat & Voice",
  "Vertigo & Balance",
  "Children's ENT",
  "Head & Neck",
  "General ENT concern",
];

const times = [
  { value: "16:00", label: "4:00 PM – 5:00 PM" },
  { value: "17:00", label: "5:00 PM – 6:00 PM" },
  { value: "18:00", label: "6:00 PM – 7:00 PM" },
  { value: "19:00", label: "7:00 PM – 8:00 PM" },
  { value: "20:00", label: "8:00 PM – 9:00 PM" },
];

interface FormData {
  concern: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  message: string;
  consent: boolean;
}

const initialForm: FormData = {
  concern: "",
  name: "",
  phone: "",
  date: "",
  time: "",
  message: "",
  consent: false,
};

export default function BookPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState("");
const [fieldErrors, setFieldErrors] = useState<
  Record<string, string | undefined>
>({});
const requestKeyRef = useRef<string | null>(null);
const submittedPayloadRef = useRef<string | null>(null);
function updateField(
  field: keyof FormData,
  value: string | boolean,
) {
  setForm((current) => ({
    ...current,
    [field]: value,
  }));

  setError("");

  setFieldErrors((current) => ({
    ...current,
    [field]: undefined,
  }));
}

  
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (submitting) {
    return;
  }


  if (
    !form.concern ||
    !form.name.trim() ||
    !form.phone.trim() ||
    !form.date ||
    !form.time ||
    !form.consent
  ) {
    setError(
      "Please complete the required fields and accept the privacy acknowledgement.",
    );
    return;
  }

  const phoneDigits = form.phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    setError("Please enter a valid phone number.");
    return;
  }

  setSubmitting(true);
  setError("");
  const payload = {
  concern: form.concern,
  name: form.name.trim(),
  phone: phoneDigits,
  date: form.date,
  time: form.time,
  message: form.message.trim(),
  consent: form.consent,
};

const payloadFingerprint = JSON.stringify(payload);

if (
  submittedPayloadRef.current !== null &&
  submittedPayloadRef.current !== payloadFingerprint
) {
  requestKeyRef.current = null;
}

submittedPayloadRef.current = payloadFingerprint;
  try {
  

const requestKey =
  requestKeyRef.current ?? crypto.randomUUID();

requestKeyRef.current = requestKey;

const response = await fetch("/api/appointments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Idempotency-Key": requestKey,
  },
  body: JSON.stringify({
    requestKey,
    concern: form.concern,
    name: form.name.trim(),
    phone: phoneDigits,
    date: form.date,
    time: form.time,
    message: form.message.trim(),
    consent: form.consent,
  }),
});


    const data: {
    success?: boolean;
    appointmentId?: string;
    error?: string;
    fields?: Record<string, string[] | undefined>;
    } = await response.json();

    if (!response.ok || !data.success) {
  const errors: Record<string, string | undefined> = {};

  if (data.fields) {
    for (const [field, messages] of Object.entries(data.fields)) {
      if (messages?.[0]) {
        errors[field] = messages[0];
      }
    }
  }

  setFieldErrors(errors);

  const firstFieldError = Object.values(errors).find(Boolean);

  setError(
    firstFieldError ||
      data.error ||
      "We could not submit your request. Please try again.",
  );

  return;
}
requestKeyRef.current = null;
submittedPayloadRef.current = null;
    setSubmitted(true);
    
  } catch {
    setError(
      "We could not connect to the clinic booking service. Please try again.",
    );
  } finally {
    setSubmitting(false);
  }
}

  if (submitted) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <section className="bg-[var(--midnight)] text-white">
          <Container size="wide">
            <div className="py-8 sm:py-10">
              <PageBreadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Book" },
                ]}
              />
            </div>

            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="mx-auto max-w-3xl pb-24 pt-12 text-center sm:pt-16 lg:pb-32 lg:pt-20"
                >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10">
                <Check
                  size={28}
                  strokeWidth={1.5}
                  className="text-[var(--gold-light)]"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                Request received
              </p>

              <h1 className="mx-auto mt-5 max-w-3xl text-balance text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
                Thank you.
              </h1>

              <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Your consultation request has been recorded. The clinic can
                review your preferred date and time and contact you regarding
                the next step.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="tel:+919849835822"
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
                >
                  <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
                  Call the clinic
                </a>

                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-7 py-4 text-sm font-semibold text-white/75 transition-colors duration-300 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
                >
                  Return home
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="bg-[var(--midnight)] text-white">
        <Container size="wide">
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Book" },
              ]}
            />
          </div>

          <div className="grid gap-12 pb-20 pt-8 sm:pb-24 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20 lg:pb-28 lg:pt-14">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 shrink-0 bg-[var(--gold-light)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)] sm:text-[11px]">
                  Consultation
                </p>
              </div>

              <h1 className="max-w-4xl text-balance text-[3.75rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
                Let&apos;s understand
                <br />
                what you need.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Share a few details about your concern and your preferred
                consultation time. The clinic can review your request and
                contact you about the next step.
              </p>
            </div>

            <div className="border-l border-white/10 pl-6 lg:mb-2 lg:pl-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                Clinic
              </p>

              <p className="mt-4 text-lg font-medium text-white">
                Dr. Mrudula ENT Care
              </p>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Jubilee Hills · Hyderabad
              </p>

              <a
                href="tel:+919849835822"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
              >
                <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
                +91 98498 35822
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking area */}
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20">
            {/* Form */}
            <div>
              <div className="mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Consultation request
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                  Tell us a little about your visit.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  The information below helps the clinic understand your
                  request. Please avoid sharing sensitive medical information
                  that is not necessary for arranging your consultation.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-8"
              >
                {/* Concern */}
                <fieldset
                    aria-invalid={Boolean(fieldErrors.concern)}
                    aria-describedby={
                        fieldErrors.concern ? "concern-error" : undefined
                    }
                    >
                  <legend className="text-sm font-semibold text-[var(--midnight)]">
                    What would you like help with?
                    <span
                      className="ml-1 text-[var(--gold)]"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </legend>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {concerns.map((concern) => {
                      const selected = form.concern === concern;

                      return (
                        <label
                          key={concern}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-all duration-200 ${
                            selected
                              ? "border-[var(--teal)] bg-[var(--mist)] text-[var(--midnight)]"
                              : "border-[var(--border)] bg-white text-[var(--muted)] hover:border-[var(--teal)]/50 hover:text-[var(--midnight)]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="concern"
                            value={concern}
                            checked={selected}
                            required
                            aria-invalid={Boolean(fieldErrors.concern)}
                            aria-describedby={fieldErrors.concern ? "concern-error" : undefined}
                            onChange={() =>
                              updateField("concern", concern)
                            }
                            className="sr-only"
                          />
                           

                          <span
                            aria-hidden="true"
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                              selected
                                ? "border-[var(--teal)]"
                                : "border-[var(--border)]"
                            }`}
                          >
                            {selected && (
                              <span className="h-2 w-2 rounded-full bg-[var(--teal)]" />
                            )}
                          </span>

                          <span>{concern}</span>
                        </label>
                      );
                    })}
                  </div>

                    {fieldErrors.concern && (
                    <p
                        id="concern-error"
                        className="mt-3 text-xs leading-5 text-red-700"
                    >
                        {fieldErrors.concern}
                    </p>
                    )}
                    </fieldset>

                {/* Patient details */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-[var(--midnight)]"
                    >
                      Your name
                      <span
                        className="ml-1 text-[var(--gold)]"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      required
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Enter your name"
                      className="mt-3 min-h-13 w-full border border-[var(--border)] bg-white px-4 text-sm text-[var(--midnight)] outline-none transition-colors placeholder:text-[var(--muted)]/60 focus:border-[var(--teal)]"
                    />
                    {fieldErrors.name && (
                    <p
                        id="name-error"
                        className="mt-2 text-xs leading-5 text-red-700"
                    >
                        {fieldErrors.name}
                    </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-[var(--midnight)]"
                    >
                      Phone number
                      <span
                        className="ml-1 text-[var(--gold)]"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      required
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="Enter your phone number"
                      className="mt-3 min-h-13 w-full border border-[var(--border)] bg-white px-4 text-sm text-[var(--midnight)] outline-none transition-colors placeholder:text-[var(--muted)]/60 focus:border-[var(--teal)]"
                    />
                    {fieldErrors.phone && (
                    <p
                        id="phone-error"
                        className="mt-2 text-xs leading-5 text-red-700"
                    >
                        {fieldErrors.phone}
                    </p>
                    )}
                  </div>
                </div>

                {/* Date and time */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="text-sm font-semibold text-[var(--midnight)]"
                    >
                      Preferred date
                      <span
                        className="ml-1 text-[var(--gold)]"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      required
                      aria-invalid={Boolean(fieldErrors.date)}
                      aria-describedby={fieldErrors.date ? "date-error" : undefined}
                      onChange={(event) =>
                        updateField("date", event.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-3 min-h-13 w-full border border-[var(--border)] bg-white px-4 text-sm text-[var(--midnight)] outline-none transition-colors focus:border-[var(--teal)]"
                    />
                    {fieldErrors.date && (
                    <p
                        id="date-error"
                        className="mt-2 text-xs leading-5 text-red-700"
                    >
                        {fieldErrors.date}
                    </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="text-sm font-semibold text-[var(--midnight)]"
                    >
                      Preferred time
                      <span
                        className="ml-1 text-[var(--gold)]"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>

                    <select
                        id="time"
                        name="time"
                        value={form.time}
                        required
                        aria-invalid={Boolean(fieldErrors.time)}
                        aria-describedby={
                            fieldErrors.time ? "time-error" : undefined
                        }
                        onChange={(event) =>
                            updateField("time", event.target.value)
                        }
                        className="mt-3 min-h-13 w-full appearance-none border border-[var(--border)] bg-white px-4 text-sm text-[var(--midnight)] outline-none transition-colors focus:border-[var(--teal)]"
                        >
                      <option value="">Select a preferred time</option>

                      {times.map((time) => (
                        <option key={time.value} value={time.value}>
                            {time.label}
                        </option>
                        ))}
                    </select>
                    {fieldErrors.time && (
                        <p
                            id="time-error"
                            className="mt-2 text-xs leading-5 text-red-700"
                        >
                            {fieldErrors.time}
                        </p>
                        )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-[var(--midnight)]"
                  >
                    Anything else you&apos;d like us to know?
                    <span className="ml-2 font-normal text-[var(--muted)]">
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder="Keep this brief. Please do not include sensitive medical information."
                    className="mt-3 w-full resize-y border border-[var(--border)] bg-white px-4 py-4 text-sm leading-6 text-[var(--midnight)] outline-none transition-colors placeholder:text-[var(--muted)]/60 focus:border-[var(--teal)]"
                  />
                </div>

                {/* Consent */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    required
                    aria-invalid={Boolean(fieldErrors.consent)}
                    aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
                    onChange={(event) =>
                      updateField("consent", event.target.checked)
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--teal)]"
                  />
                  {fieldErrors.consent && (
                    <p
                        id="consent-error"
                        className="mt-2 text-xs leading-5 text-red-700"
                    >
                        {fieldErrors.consent}
                    </p>
                    )}

                  <span className="text-xs leading-5 text-[var(--muted)]">
                    I understand that this is a consultation request and not
                    an emergency service or a confirmed appointment. I agree
                    that the clinic may contact me regarding this request.
                    <span
                      className="ml-1 text-[var(--gold)]"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </span>
                </label>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                {/* Submit */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div
                    aria-live="polite"
                    className="sr-only"
                >
                    {submitting ? "Sending your consultation request." : ""}
                </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-13 items-center justify-center gap-3 bg-[var(--midnight)] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] disabled:translate-y-0 disabled:opacity-60"
                  >
                    {submitting ? "Sending request..." : "Request consultation"}

                    {!submitting && (
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <p className="text-xs leading-5 text-[var(--muted)]">
                    The clinic will review your request before confirming the
                    consultation.
                  </p>
                </div>
              </form>
            </div>

            {/* Clinic information */}
            <aside className="lg:pt-16">
              <div className="border-t border-[var(--border)] pt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                  Clinic information
                </p>

                <div className="mt-8 space-y-8">
                  <div className="flex gap-4">
                    <MapPin
                      size={19}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-[var(--teal)]"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[var(--midnight)]">
                        Jubilee Hills, Hyderabad
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        4th Floor, Westend,
                        <br />
                        Road No. 36, Venkatagiri,
                        <br />
                        Jubilee Hills, Hyderabad – 500033
                      </p>

                      <a
                        href="https://maps.app.goo.gl/ugGUHizAvWBS9scE9"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                      >
                        Get directions
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock3
                      size={19}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-[var(--teal)]"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[var(--midnight)]">
                        Clinic hours
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Monday – Saturday
                        <br />
                        4:00 PM – 9:00 PM
                      </p>

                      <p className="mt-1 text-xs text-[var(--muted)]">
                        Sunday · Closed
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone
                      size={19}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-[var(--teal)]"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[var(--midnight)]">
                        Prefer to speak directly?
                      </p>

                      <a
                        href="tel:+919849835822"
                        className="mt-2 inline-block text-sm font-semibold text-[var(--teal)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                      >
                        +91 98498 35822
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border border-[var(--border)] bg-[var(--mist)] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  Important
                </p>

                <p className="mt-4 text-sm leading-6 text-[var(--midnight)]">
                  If you are experiencing a life-threatening emergency, seek
                  immediate emergency medical care rather than waiting for a
                  clinic response.
                </p>

                <Link
                  href="/services/emergency-ent-care"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                >
                  Urgent ENT information
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}