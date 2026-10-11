import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Mail,
  Sparkles,
} from "lucide-react";

import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export const metadata: Metadata = {
  title: "CHAAM Software Solutions",
  description:
    "Premium websites, web applications and digital experiences by CHAAM Software Solutions.",
};

const capabilities = [
  {
    number: "01",
    title: "Premium websites",
    description:
      "Thoughtful digital identities for businesses, practices and professional brands.",
  },
  {
    number: "02",
    title: "Web applications",
    description:
      "Purpose-built interfaces and applications designed around real workflows.",
  },
  {
    number: "03",
    title: "Digital platforms",
    description:
      "Scalable products combining interface design, engineering, backend systems and data.",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "Understand the business, audience, goals and problem before designing the solution.",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "Plan the information architecture, functionality, technology and long-term structure.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Create a visual and interaction system that gives the product a distinct identity.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Turn the design into responsive, maintainable and functional software.",
  },
  {
    number: "05",
    title: "Refine",
    description:
      "Test responsiveness, accessibility, performance, usability and interaction quality.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Prepare the experience for real users and continued improvement.",
  },
];

const qualityPoints = [
  "Responsive by design",
  "Accessibility-conscious",
  "Performance-focused",
  "Maintainable engineering",
  "Clear information architecture",
  "Built around real users",
];

export default function DeveloperPage() {
  return (
    <main className="overflow-hidden bg-[var(--ivory)] text-[var(--midnight)]">
      {/* HERO */}
      <section className="relative bg-[var(--midnight)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-14rem] top-[-14rem] h-[38rem] w-[38rem] rounded-full border border-white/[0.045]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-16rem] left-[-14rem] h-[34rem] w-[34rem] rounded-full border border-[var(--gold)]/[0.06]"
        />

        <Container size="wide" className="relative">
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "CHAAM Software Solutions" },
              ]}
            />
          </div>

          <div className="grid gap-16 pb-24 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-32 lg:pt-20">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-[var(--gold-light)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)]">
                  CHAAM Software Solutions
                </p>
              </div>

              <h1 className="max-w-5xl text-balance text-5xl leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.5rem]">
                Digital experiences,
                <br />
                built with intention.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                Websites, web applications and digital platforms designed
                for businesses that care about how they are experienced
                online.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:shashanktirandas53@gmail.com?subject=Website%20Project%20Enquiry"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-colors hover:bg-[var(--mist)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
                >
                  Start a conversation
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <Link
                  href="#work"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-7 py-4 text-sm font-semibold text-white/75 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
                >
                  View selected work
                </Link>
              </div>
            </div>

            <div className="border-l border-white/10 pl-7 lg:pl-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Digital philosophy
              </p>

              <p className="mt-5 max-w-md text-2xl leading-[1.2] tracking-[-0.025em] text-white/80 sm:text-3xl">
                Good technology should disappear behind a great experience.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* INTRO */}
      <section className="py-24 sm:py-32 lg:py-40">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                Why CHAAM
              </p>

              <h2 className="mt-5 max-w-md text-4xl leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                Design with purpose.
                <br />
                Engineering with care.
              </h2>
            </div>

            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
                A digital product should do more than look impressive.
                It should make a business easier to understand, easier to
                trust and easier to interact with.
              </p>

              <p className="mt-6 text-base leading-7 text-[var(--muted)]">
                CHAAM combines visual design, frontend engineering and
                product thinking to create digital experiences that are
                purposeful rather than decorative.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="border-y border-[var(--border)] bg-[var(--mist)] py-24 sm:py-32">
        <Container size="wide">
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
              What we build
            </p>

            <h2 className="mt-5 text-4xl leading-[0.98] tracking-[-0.045em] sm:text-5xl">
              From presence to product.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3">
            {capabilities.map((item) => (
              <article
                key={item.number}
                className="bg-[var(--ivory)] p-8 sm:p-10 lg:p-12"
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                  {item.number}
                </p>

                <h3 className="mt-16 text-2xl tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CASE STUDY */}
      <section id="work" className="bg-[var(--midnight)] py-24 text-white sm:py-32 lg:py-40">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-light)]">
                Selected work
              </p>

              <h2 className="mt-5 text-4xl leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                Dr. Mrudula
                <br />
                ENT Care.
              </h2>

              <p className="mt-6 text-sm leading-6 text-white/45">
                Premium healthcare digital experience.
              </p>
            </div>

            <div>
              <p className="max-w-3xl text-2xl leading-[1.3] tracking-[-0.025em] text-white/85 sm:text-3xl">
                A digital experience designed around specialist credibility,
                patient clarity and a calmer way to discover care.
              </p>

              <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                    Challenge
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Create a digital presence that communicates specialist
                    expertise while helping patients understand their
                    concerns and next steps.
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                    Approach
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Patient-first information architecture, premium
                    healthcare design, responsive engineering and
                    accessibility-conscious interaction.
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4">
                {[
                  "Healthcare UX",
                  "Next.js",
                  "Responsive design",
                  "Accessibility",
                  "Performance",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-xs text-white/45"
                  >
                    <Check
                      size={14}
                      strokeWidth={1.7}
                      className="text-[var(--gold-light)]"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-24 sm:py-32 lg:py-40">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                The process
              </p>

              <h2 className="mt-5 max-w-md text-4xl leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                Understand.
                <br />
                Build.
                <br />
                Refine.
              </h2>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {process.map((item) => (
                <div
                  key={item.number}
                  className="grid gap-4 py-7 sm:grid-cols-[80px_0.8fr_1.2fr] sm:items-start"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                    {item.number}
                  </span>

                  <h3 className="text-lg font-medium tracking-[-0.02em]">
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

      {/* QUALITY */}
      <section className="bg-[var(--deep-teal)] py-24 text-white sm:py-32">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles
                  size={15}
                  strokeWidth={1.5}
                  className="text-[var(--gold-light)]"
                  aria-hidden="true"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                  Quality by default
                </p>
              </div>

              <h2 className="mt-5 text-4xl leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                Built to work,
                <br />
                not just impress.
              </h2>
            </div>

            <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {qualityPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-white/10 pb-4"
                >
                  <Check
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-[var(--gold-light)]"
                    aria-hidden="true"
                  />

                  <span className="text-sm text-white/65">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section className="py-24 sm:py-32 lg:py-40">
        <Container size="wide">
          <div className="border-t border-[var(--border)] pt-12 sm:pt-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
              Start a project
            </p>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="max-w-4xl text-5xl leading-[0.92] tracking-[-0.055em] sm:text-7xl">
                  Have a project
                  <br />
                  worth building?
                </h2>

                <p className="mt-7 max-w-xl text-base leading-7 text-[var(--muted)]">
                  Tell us what you're building, what you're trying to solve
                  and where you want to go.
                </p>
              </div>

              <a
                href="mailto:shashanktirandas53@gmail.com?subject=Website%20Project%20Enquiry"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--midnight)] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                <Mail size={16} aria-hidden="true" />
                Start a conversation
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="mt-16 flex flex-col gap-2 border-t border-[var(--border)] pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-[var(--midnight)]">
                  CHAAM Software Solutions
                </p>

                <p className="mt-1 text-[var(--muted)]">
                  Shashank Tirandas
                </p>
              </div>

              <a
                href="mailto:shashanktirandas53@gmail.com"
                className="text-[var(--muted)] underline decoration-[var(--gold)]/50 underline-offset-4 transition-colors hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                shashanktirandas53@gmail.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}