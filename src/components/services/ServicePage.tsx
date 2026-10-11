import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/layout/Container";
import type { ServicePage as ServicePageData } from "@/data/services";
import PageHero from "../layout/PageHero";

interface ServicePageProps {
  service: ServicePageData;
}

export default function ServicePage({ service }: ServicePageProps) {
  return (
    <main className="overflow-hidden">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative bg-[var(--midnight)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full border border-white/[0.04]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-4rem] top-[-2rem] h-[20rem] w-[20rem] rounded-full border border-[var(--gold)]/[0.08]"
        />

        <PageHero
  variant="detail"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ]}
  eyebrow={service.eyebrow}
  title={service.title}
  description={service.introduction}
  actions={[
    {
      label: "Book a consultation",
      href: "/book",
      variant: "primary",
    },
    {
      label: "Contact clinic",
      href: "/contact",
      variant: "secondary",
      icon: Phone,
    },
  ]}
  glanceTitle="Understanding this service starts here."
  glanceItems={service.careAreas.slice(0, 4).map((area) => ({
    label: area.title,
  }))}
  glanceDescription="Care begins with understanding your concern, evaluating what may be contributing to it and discussing the appropriate next step."
/>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}
      <section className="bg-[var(--ivory)] py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-[var(--gold)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                  Overview
                </p>
              </div>

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                {service.overview.title}
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
                {service.overview.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CARE AREAS
      ========================================================= */}
      {service.careAreas.length > 0 && (
        <section className="bg-white py-20 sm:py-28 lg:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <div>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                    Areas of care
                  </p>

                  <h2 className="mt-5 max-w-sm text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                    What this service can address.
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--muted)]">
                    Each concern is considered in the context of your symptoms
                    and clinical history.
                  </p>
                </div>
              </div>

              <div className="border-t border-[var(--border)]">
                {service.careAreas.map((area, index) => (
                  <article
                    key={area.title}
                    className="group grid gap-5 border-b border-[var(--border)] py-7 transition-colors hover:bg-[var(--ivory)] sm:grid-cols-[56px_0.75fr_1.25fr] sm:items-start sm:gap-8 sm:px-5"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--midnight)]">
                      {area.title}
                    </h3>

                    <p className="text-sm leading-6 text-[var(--muted)]">
                      {area.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          EVALUATION
      ========================================================= */}
      {service.evaluation.length > 0 && (
        <section className="bg-[var(--mist)] py-20 sm:py-28 lg:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                  Evaluation
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                  A careful path to understanding.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-[var(--muted)]">
                  The exact evaluation depends on your symptoms, history and
                  clinical findings.
                </p>
              </div>

              <div className="border-t border-[var(--border)]">
                {service.evaluation.map((step, index) => (
                  <div
                    key={step.title}
                    className="grid gap-4 border-b border-[var(--border)] py-7 sm:grid-cols-[56px_0.75fr_1.25fr] sm:gap-8"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--midnight)]">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-6 text-[var(--muted)]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          CLINICAL NOTE
      ========================================================= */}
      <section className="bg-[#eee9df] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center border border-[var(--gold)]/30 text-[var(--gold)]"
            >
              <ShieldCheck size={21} strokeWidth={1.5} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Individualized care
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[var(--midnight)]">
                The right approach starts with understanding your concern.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                Treatment and further evaluation are considered according to
                the clinical findings and your individual needs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      {service.faqs.length > 0 && (
        <section className="bg-[var(--ivory)] py-20 sm:py-28 lg:py-32">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                  Questions
                </p>

                <h2 className="mt-5 text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                  Before your visit
                </h2>

                <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
                  A few common questions to help you understand what to expect.
                </p>
              </div>

              <div className="border-t border-[var(--border)]">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border-b border-[var(--border)] py-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-lg font-medium tracking-[-0.02em] text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] [&::-webkit-details-marker]:hidden">
                      <span>{faq.question}</span>

                      <span
                        aria-hidden="true"
                        className="relative flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--border)] text-[var(--muted)] transition-transform duration-300 group-open:rotate-45"
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span className="absolute h-3 w-px bg-current" />
                      </span>
                    </summary>

                    <p className="mt-5 max-w-2xl pr-10 text-sm leading-7 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[var(--deep-teal)] py-24 text-white sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/[0.05]"
        />

        <Container className="relative">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-light)]">
                Your next step
              </p>

              <h2 className="mt-5 text-balance text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Let&apos;s understand what you need.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/50">
                A consultation allows your symptoms and concerns to be
                evaluated and discussed with you directly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
              >
                Book a consultation
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>

              <a
                href="tel:+919849835822"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-7 py-4 text-sm font-semibold text-white/75 transition-all hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
              >
                <Phone size={16} aria-hidden="true" />
                Call the clinic
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}