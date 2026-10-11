import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Ear,
  Headphones,
  HeartPulse,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

interface GuideCategory {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  href: string;
}

const guideCategories: GuideCategory[] = [
  {
    icon: Ear,
    category: "Ear",
    title: "Understanding ear concerns",
    description:
      "Clear information about common ear symptoms, hearing concerns and when an ENT evaluation may be appropriate.",
    href: "/patient-guides/ear",
  },
  {
    icon: Wind,
    category: "Nose & Sinus",
    title: "Nasal and sinus health",
    description:
      "Practical information about nasal blockage, allergies, sinus concerns and related symptoms.",
    href: "/patient-guides/nose-sinus",
  },
  {
    icon: Headphones,
    category: "Balance",
    title: "Understanding vertigo",
    description:
      "Learn more about dizziness, positional symptoms, balance concerns and the importance of appropriate evaluation.",
    href: "/patient-guides/vertigo",
  },
  {
    icon: HeartPulse,
    category: "Throat & Voice",
    title: "Throat and voice concerns",
    description:
      "Helpful information about common throat and voice symptoms and when specialist assessment can help.",
    href: "/patient-guides/throat-voice",
  },
];

export const metadata = {
  title: "Patient Guides",
  description:
    "Patient-friendly ENT information covering ear, nose, sinus, throat, voice, balance and related concerns.",
};

export default function PatientGuidesPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="bg-[var(--midnight)] text-white">
        <Container size="wide">
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Patient Guides" },
              ]}
            />
          </div>

          <div className="grid gap-12 pb-20 pt-8 sm:pb-24 lg:grid-cols-[1fr_0.62fr] lg:items-end lg:gap-20 lg:pb-28 lg:pt-14">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 shrink-0 bg-[var(--gold-light)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)] sm:text-[11px]">
                  Patient information
                </p>
              </div>

              <h1 className="max-w-4xl text-balance text-[3.75rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
                Understand your
                <br />
                ENT health clearly.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Straightforward information to help you understand common ENT
                concerns, prepare for a consultation and know when specialist
                evaluation may be appropriate.
              </p>
            </div>

            <div className="border-l border-white/10 pl-6 lg:mb-2 lg:pl-8">
              <BookOpen
                size={24}
                strokeWidth={1.4}
                className="text-[var(--gold-light)]"
                aria-hidden="true"
              />

              <p className="mt-5 text-lg font-medium text-white">
                Information for patients.
              </p>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Designed to make medical information easier to approach and
                discuss with your ENT specialist.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Guides */}
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="flex flex-col gap-8 border-b border-[var(--border)] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Explore by concern
              </p>

              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1] tracking-[-0.04em] text-[var(--midnight)] sm:text-5xl">
                Start with what you&apos;re experiencing.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              These guides are designed to support understanding, not replace
              an individual medical evaluation.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
            {guideCategories.map((guide) => {
              const Icon = guide.icon;

              return (
                <Link
                  key={guide.category}
                  href={guide.href}
                  className="group flex min-h-[300px] flex-col justify-between bg-white p-7 transition-colors duration-300 hover:bg-[var(--mist)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--gold)] sm:p-9 lg:min-h-[340px] lg:p-10"
                >
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--background)] text-[var(--teal)] transition-colors duration-300 group-hover:border-[var(--gold)]/40">
                        <Icon
                          size={20}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                      </div>

                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.5}
                        className="text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--teal)]"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-9 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                      {guide.category}
                    </p>

                    <h3 className="mt-3 max-w-sm text-2xl font-medium tracking-[-0.03em] text-[var(--midnight)] sm:text-3xl">
                      {guide.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
                      {guide.description}
                    </p>
                  </div>

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal)]">
                    Explore guide
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How to use the guides */}
      <section className="bg-[var(--mist)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                A better starting point
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                Information should help you make the next decision.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--muted)]">
                Use these resources to understand terminology and common
                concerns before discussing your individual situation with a
                healthcare professional.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="border-t border-[var(--border)] pt-5">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--gold)]">
                  01
                </span>

                <h3 className="mt-4 text-base font-semibold text-[var(--midnight)]">
                  Understand
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Learn the basic language around your concern.
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--gold)]">
                  02
                </span>

                <h3 className="mt-4 text-base font-semibold text-[var(--midnight)]">
                  Prepare
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Know what information may be useful during a consultation.
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--gold)]">
                  03
                </span>

                <h3 className="mt-4 text-base font-semibold text-[var(--midnight)]">
                  Discuss
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Use what you learn as a starting point for a clinical
                  conversation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Medical disclaimer */}
      <section className="bg-[var(--background)] py-14 sm:py-16">
        <Container size="wide">
          <div className="border-l-2 border-[var(--gold)] bg-white px-6 py-6 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Important information
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--muted)]">
              Patient guides are intended for general educational purposes.
              They do not provide a diagnosis or replace a consultation with
              a qualified healthcare professional. Individual symptoms and
              treatment decisions should be discussed with an appropriate
              clinician.
            </p>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--midnight)] py-16 text-white sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                Need individual advice?
              </p>

              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Let&apos;s understand what you need.
              </h2>
            </div>

            <Link
              href="/book"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
            >
              Request a consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}