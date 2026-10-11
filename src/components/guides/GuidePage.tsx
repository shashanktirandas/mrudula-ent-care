import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
} from "lucide-react";
import type { Guide } from "@/data/guides";
import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

interface GuidePageProps {
  guide: Guide;
}

export default function GuidePage({ guide }: GuidePageProps) {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="bg-[var(--midnight)] text-white">
        <Container size="wide">
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Patient Guides", href: "/patient-guides" },
                { label: guide.title },
              ]}
            />
          </div>

          <div className="grid gap-12 pb-20 pt-8 sm:pb-24 lg:grid-cols-[1fr_0.58fr] lg:items-end lg:gap-20 lg:pb-28 lg:pt-14">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 shrink-0 bg-[var(--gold-light)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)] sm:text-[11px]">
                  Patient guide · {guide.category}
                </p>
              </div>

              <h1 className="max-w-4xl text-balance text-[3.75rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6rem]">
                {guide.title}
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                {guide.introduction}
              </p>
            </div>

            <div className="border-l border-white/10 pl-6 lg:mb-2 lg:pl-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                Patient information
              </p>

              <p className="mt-4 text-lg font-medium text-white">
                Understand · Prepare · Discuss
              </p>

              <p className="mt-2 text-sm leading-6 text-white/50">
                General educational information to support a conversation with
                your healthcare professional.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Article */}
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,760px)_280px] lg:gap-20">
            <article>
              <div className="border-b border-[var(--border)] pb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Overview
                </p>

                <p className="mt-5 text-xl leading-9 text-[var(--midnight)] sm:text-2xl sm:leading-10">
                  {guide.overview}
                </p>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {guide.sections.map((section, index) => (
                  <section
                    key={section.title}
                    className="py-10 sm:py-12"
                  >
                    <div className="grid gap-5 sm:grid-cols-[90px_1fr] sm:gap-8">
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-[var(--gold)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h2 className="text-2xl font-medium tracking-[-0.025em] text-[var(--midnight)] sm:text-3xl">
                          {section.title}
                        </h2>

                        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* When to seek care */}
              <section className="mt-4 bg-[var(--mist)] p-7 sm:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  When to consider an evaluation
                </p>

                <h2 className="mt-4 text-2xl font-medium tracking-[-0.025em] text-[var(--midnight)] sm:text-3xl">
                  Persistent or troublesome symptoms deserve attention.
                </h2>

                <ul className="mt-7 space-y-4">
                  {guide.whenToSeekCare.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]"
                    >
                      <Check
                        size={16}
                        strokeWidth={1.8}
                        className="mt-1 shrink-0 text-[var(--teal)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQs */}
              <section className="mt-16 sm:mt-20">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Common questions
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)]">
                  Questions patients often ask.
                </h2>

                <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {guide.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group py-6"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-[var(--midnight)] marker:hidden">
                        <span>{faq.question}</span>

                        <span
                          aria-hidden="true"
                          className="text-2xl font-normal text-[var(--gold)] transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>

                      <p className="max-w-3xl pt-4 text-sm leading-7 text-[var(--muted)]">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:pt-2">
              <div className="sticky top-28">
                <div className="border-t border-[var(--border)] pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                    Next step
                  </p>

                  <h2 className="mt-4 text-xl font-medium tracking-[-0.025em] text-[var(--midnight)]">
                    Want to discuss your concern?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    Patient information can help you prepare, but an individual
                    assessment is needed for personal medical advice.
                  </p>

                  <Link
                    href="/book"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--midnight)] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                  >
                    Request a consultation
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                <Link
                  href="/patient-guides"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                >
                  <ArrowLeft
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  All patient guides
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Disclaimer */}
      <section className="bg-[var(--mist)] py-14 sm:py-16">
        <Container size="wide">
          <div className="border-l-2 border-[var(--gold)] bg-white px-6 py-6 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Medical information
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--muted)]">
              This guide is provided for general educational purposes and does
              not provide a diagnosis or replace an individual medical
              consultation. Symptoms can have different causes, and treatment
              decisions should be based on an appropriate clinical evaluation.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}