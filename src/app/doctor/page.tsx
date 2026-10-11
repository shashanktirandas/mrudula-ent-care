import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Phone,
} from "lucide-react";

import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const expertise = [
  "Ear conditions and hearing concerns",
  "Nasal and sinus disorders",
  "Allergy-related ENT concerns",
  "Vertigo and balance disorders",
  "Throat and voice conditions",
  "Pediatric ENT",
  "Head and neck conditions",
];

const specialInterests = [
  "Diagnostic ENT endoscopy",
  "Functional endoscopic sinus surgery (FESS)",
  "Nasal polyps",
  "Allergy",
  "Skull base conditions",
  "Advanced ENT surgery",
];

const procedures = [
  "Septoplasty",
  "Tympanoplasty",
  "Mastoidectomy",
  "Tonsillectomy",
  "Adenoidectomy",
  "Endoscopic DCR",
  "Tracheostomy",
  "Rigid Bronchoscopy",
  "Oesophagoscopy",
];

const careSteps = [
  {
    number: "01",
    title: "Listen",
    text: "Understand your symptoms, concerns and relevant history.",
  },
  {
    number: "02",
    title: "Evaluate",
    text: "Examine the relevant ENT structures and consider appropriate diagnostic assessment.",
  },
  {
    number: "03",
    title: "Explain",
    text: "Discuss the clinical findings and help you understand the possible next steps.",
  },
  {
    number: "04",
    title: "Plan",
    text: "Consider an appropriate treatment or further evaluation plan based on your individual needs.",
  },
];

export const metadata: Metadata = {
  title: "Dr. Mrudula Mukiri",
  description:
    "Meet Dr. Mrudula Mukiri, MBBS, MS (ENT & Head & Neck Surgery), and explore her areas of ENT and head & neck expertise.",
};

export default function DoctorPage() {
  return (
    <main className="overflow-hidden">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative bg-[var(--midnight)] text-white">
        {/* Decorative geometry */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full border border-white/[0.04]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full border border-[var(--gold)]/[0.06]"
        />

        <Container size="wide" className="relative">
          {/* Breadcrumb */}
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Doctor" },
              ]}
            />
          </div>

          {/* Hero content */}
          <div className="grid items-end gap-12 pb-20 pt-2 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pb-28 lg:pt-6">
            {/* =====================================================
                DOCTOR INTRO
            ====================================================== */}

            <div className="order-2 lg:order-1">
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 shrink-0 bg-[var(--gold-light)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)] sm:text-[11px]">
                  ENT &amp; Head · Neck Specialist
                </p>
              </div>

              <h1 className="text-balance text-[3.75rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
                Dr. Mrudula
                <br />
                Mukiri.
              </h1>

              <p className="mt-7 text-base font-medium text-[var(--gold-light)] sm:text-lg">
                MBBS · MS (ENT &amp; Head &amp; Neck Surgery)
              </p>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Specialist ENT care across ear, nose, throat, allergy,
                balance and head &amp; neck concerns, with careful evaluation
                and individualized treatment planning.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] active:translate-y-px"
                >
                  Book a consultation

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </Link>

                <a
                  href="tel:+919849835822"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-7 py-4 text-sm font-semibold text-white/75 transition-all duration-300 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] active:translate-y-px"
                >
                  <Phone
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  Contact clinic
                </a>
              </div>
            </div>

            {/* =====================================================
                DOCTOR IMAGE
            ====================================================== */}

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto w-full max-w-[520px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 border border-[var(--gold)]/20"
                />

                <div className="relative overflow-hidden bg-[var(--mist)]">
                  <Image
                    src="/images/doctor/dr-mrudula.jpg"
                    alt="Dr. Mrudula Mukiri"
                    width={380}
                    height={490}
                    priority
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                </div>

                <div className="absolute bottom-4 left-4 border border-white/15 bg-[var(--midnight)]/90 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-light)]">
                    ENT · Head &amp; Neck
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================== */}

      <section className="bg-[var(--ivory)] py-20 sm:py-28 lg:py-32">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-[var(--gold)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                  About Dr. Mrudula
                </p>
              </div>

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                Specialist care,
                <br />
                clearly explained.
              </h2>
            </div>

            <div className="flex items-end">
              <div className="max-w-3xl">
                <p className="text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
                  Dr. Mrudula Mukiri is an ENT and Head &amp; Neck specialist
                  providing care across a broad range of ear, nose, throat,
                  allergy, balance and head &amp; neck concerns.
                </p>

                <p className="mt-6 text-base leading-7 text-[var(--muted)]">
                  Her clinical areas include diagnostic evaluation,
                  endoscopy, sinus and allergy concerns, vertigo and balance
                  disorders, pediatric ENT and selected head &amp; neck
                  conditions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          EXPERTISE
      ========================================================== */}

      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <div>
              <div className="lg:sticky lg:top-28">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                  Areas of expertise
                </p>

                <h2 className="mt-5 max-w-sm text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                  Focused ENT expertise.
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--muted)]">
                  Specialist care across the major areas of ear, nose,
                  throat and head &amp; neck medicine.
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--border)]">
              {expertise.map((item, index) => (
                <div
                  key={item}
                  className="group grid gap-5 border-b border-[var(--border)] py-7 transition-colors hover:bg-[var(--ivory)] sm:grid-cols-[56px_1fr] sm:items-center sm:gap-8 sm:px-5"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30"
                    >
                      <Check
                        size={13}
                        strokeWidth={1.7}
                        className="text-[var(--gold)]"
                      />
                    </span>

                    <span className="text-lg tracking-[-0.02em] text-[var(--midnight)]">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          SPECIAL INTERESTS
      ========================================================== */}

      <section className="bg-[var(--deep-teal)] py-20 text-white sm:py-28 lg:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-light)]">
                Special interests
              </p>

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                Areas of particular
                <br />
                clinical interest.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/50">
                Selected areas of clinical interest within ENT and
                head &amp; neck care.
              </p>
            </div>

            <div className="border-t border-white/10">
              {specialInterests.map((item, index) => (
                <div
                  key={item}
                  className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[56px_1fr] sm:gap-8"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold-light)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-lg text-white/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          PROCEDURES
      ========================================================== */}

      <section className="bg-[var(--mist)] py-20 sm:py-28 lg:py-32">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                Selected procedures
              </p>

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                Specialist procedures.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-[var(--muted)]">
                Procedures are considered based on clinical evaluation,
                individual needs and suitability.
              </p>
            </div>

            <div className="border-t border-[var(--border)]">
              {procedures.map((procedure, index) => (
                <div
                  key={procedure}
                  className="grid grid-cols-[56px_1fr] items-center gap-5 border-b border-[var(--border)] py-6"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30"
                    >
                      <Check
                        size={12}
                        strokeWidth={1.7}
                        className="text-[var(--gold)]"
                      />
                    </span>

                    <span className="text-sm text-[var(--midnight)]">
                      {procedure}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CARE APPROACH
      ========================================================== */}

      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                Approach to care
              </p>

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                Listen carefully.
                <br />
                Explain clearly.
              </h2>
            </div>

            <div className="border-t border-[var(--border)]">
              {careSteps.map((step) => (
                <div
                  key={step.number}
                  className="grid gap-4 border-b border-[var(--border)] py-7 sm:grid-cols-[56px_0.65fr_1.35fr] sm:gap-8"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                    {step.number}
                  </span>

                  <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--midnight)]">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-6 text-[var(--muted)]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="relative overflow-hidden bg-[var(--deep-teal)] py-20 text-white sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/[0.05]"
        />

        <Container size="wide" className="relative">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-light)]">
                Your next step
              </p>

              <h2 className="mt-5 text-balance text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Let&apos;s understand what you need.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/50">
                Discuss your ENT concerns and understand the appropriate
                next step with the clinic.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] active:translate-y-px"
              >
                Book a consultation

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </Link>

              <a
                href="tel:+919849835822"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-7 py-4 text-sm font-semibold text-white/75 transition-all duration-300 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] active:translate-y-px"
              >
                <Phone
                  size={16}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                Call the clinic
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}