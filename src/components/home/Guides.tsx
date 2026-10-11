import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";

const guides = [
  {
    category: "VERTIGO",
    title: "Understanding dizziness and balance problems",
    href: "/patient-guides",
  },
  {
    category: "SINUS & NOSE",
    title: "When persistent nasal blockage needs attention",
    href: "/patient-guides",
  },
  {
    category: "CHILDREN'S ENT",
    title: "What parents should know about childhood snoring",
    href: "/patient-guides",
  },
];

export default function Guides() {
  return (
    <section
      id="patient-guides"
      aria-labelledby="patient-guides-title"
      className="bg-[var(--mist)] py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Patient education
              </p>
            </div>

            <h2
              id="patient-guides-title"
              className="text-balance text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--midnight)] sm:text-6xl lg:text-[4.5rem]"
            >
              Understand your
              <br />
              ENT care better.
            </h2>
          </div>

          <Link
            href="/patient-guides"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--midnight)] transition-colors hover:text-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          >
            View all guides

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Guide cards */}
        <div className="mt-14 grid gap-3 md:grid-cols-3 lg:mt-16">
          {guides.map((guide, index) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group relative min-h-[320px] overflow-hidden border border-[var(--border)] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--midnight)] hover:shadow-[var(--shadow-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] sm:p-8"
            >
              {/* Number */}
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                  {guide.category}
                </span>

                <span className="text-xs font-medium text-[var(--muted)]">
                  0{index + 1}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8">
                <h3 className="max-w-sm text-2xl leading-tight tracking-[-0.025em] text-[var(--midnight)] transition-transform duration-500 group-hover:translate-x-1">
                  {guide.title}
                </h3>

                <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-[var(--midnight)]">
                  Read guide

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>

              {/* Subtle editorial accent */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}