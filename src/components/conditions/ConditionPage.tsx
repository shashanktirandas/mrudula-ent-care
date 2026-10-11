import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  ShieldAlert,
} from "lucide-react";

import Container from "../ui/Container";
import type { ConditionPage as ConditionPageData } from "@/data/conditions";
import PageHero from "@/components/layout/PageHero";
interface Props {
  condition: ConditionPageData;
}

export default function ConditionPage({ condition }: Props) {
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
    { label: "Conditions", href: "/conditions" },
    { label: condition.title },
  ]}
  eyebrow={condition.eyebrow}
  title={condition.title}
  description={condition.introduction}
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
  glanceTitle="Understanding your concern starts here."
  glanceItems={condition.concerns.slice(0, 4).map((concern) => ({
    label: concern.title,
  }))}
  glanceDescription="Your symptoms can have different causes. A specialist evaluation helps determine the appropriate next step."
/>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}
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
                  Understanding
                </p>
              </div>

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                {condition.overview.title}
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
                {condition.overview.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          COMMON CONCERNS
      ========================================================= */}
      {condition.concerns.length > 0 && (
        <section className="bg-white py-20 sm:py-28 lg:py-32">
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <div>
                <div className="sticky top-28">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                    Common concerns
                  </p>

                  <h2 className="mt-5 max-w-sm text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                    What may bring you here
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--muted)]">
                    Symptoms can vary from person to person. These are some of
                    the concerns that may lead someone to seek ENT assessment.
                  </p>
                </div>
              </div>

              <div className="border-t border-[var(--border)]">
                {condition.concerns.map((item, index) => (
                  <article
                    key={item.title}
                    className="group grid gap-5 border-b border-[var(--border)] py-7 transition-colors hover:bg-[var(--ivory)] sm:grid-cols-[56px_0.75fr_1.25fr] sm:items-start sm:gap-8 sm:px-5"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--midnight)]">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-[var(--muted)]">
                      {item.description}
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
      {condition.evaluation.length > 0 && (
        <section className="bg-[var(--mist)] py-20 sm:py-28 lg:py-32">
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                  Evaluation
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--midnight)] sm:text-5xl">
                  A clearer understanding starts with evaluation.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-[var(--muted)]">
                  The assessment is guided by your symptoms and clinical
                  findings rather than a one-size-fits-all approach.
                </p>
              </div>

              <div className="border-t border-[var(--border)]">
                {condition.evaluation.map((item, index) => (
                  <div
                    key={item.title}
                    className="grid gap-4 border-b border-[var(--border)] py-7 sm:grid-cols-[56px_0.75fr_1.25fr] sm:gap-8"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--midnight)]">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-[var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          PROMPT CARE
      ========================================================= */}
      {condition.urgentCare && (
        <section className="bg-[#eee9df] py-16 sm:py-20">
          <Container size="wide">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
              <div
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center border border-[var(--gold)]/30 text-[var(--gold)]"
              >
                <ShieldAlert size={21} strokeWidth={1.5} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                  When prompt attention may be needed
                </p>

                <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[var(--midnight)]">
                  {condition.urgentCare.title}
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                  {condition.urgentCare.description}
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--midnight)]/15 px-5 py-3 text-sm font-semibold text-[var(--midnight)] transition-all hover:border-[var(--midnight)]/30 hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                Contact clinic
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          RELATED SERVICES
      ========================================================= */}
      {condition.relatedServices.length > 0 && (
        <section className="bg-[var(--midnight)] py-20 text-white sm:py-28 lg:py-32">
          <Container size="wide">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-light)]">
                  Related ENT care
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                  Explore relevant services
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-white/45">
                  Explore the areas of specialist care that may be relevant to
                  this concern.
                </p>
              </div>

              <div className="border-t border-white/10">
                {condition.relatedServices.map((service, index) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group flex items-center justify-between gap-6 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold-light)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-lg text-white/80 transition-colors group-hover:text-white">
                        {service.title}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--gold-light)]"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          FAQ
      ========================================================= */}
      {condition.faqs.length > 0 && (
        <section className="bg-[var(--ivory)] py-20 sm:py-28 lg:py-32">
          <Container size="narrow">
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
              {condition.faqs.map((faq) => (
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

        <Container size="narrow" className="relative">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-light)]">
              Your next step
            </p>

            <h2 className="mt-5 text-balance text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Ready to understand what&apos;s going on?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/50">
              Request a consultation and discuss your concerns with the
              clinic.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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