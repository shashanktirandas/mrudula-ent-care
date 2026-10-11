import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { conditions } from "@/data/conditions";
import PageHero from "@/components/layout/PageHero";
export const metadata = {
  title: "ENT Conditions",
  description:
    "Explore common ear, nose, sinus, throat, voice, balance, pediatric ENT and head & neck concerns.",
};

export default function ConditionsPage() {
  return (
    <main className="bg-[var(--ivory)] text-[var(--foreground)]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="bg-[var(--midnight)] pb-20 pt-24 text-white lg:pb-24 lg:pt-28">
        <PageHero
  variant="simple"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Conditions" },
  ]}
  eyebrow="ENT Conditions"
  title="Understand your concern clearly."
  description="Explore common ear, nose, throat, balance, pediatric and head & neck concerns and learn when an ENT evaluation may be appropriate."
/>
      </section>

      {/* =========================================================
          CONDITIONS
      ========================================================= */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Areas of concern"
              title="Find the area that best matches your concern."
              description="Choose an area below to understand common concerns, evaluation and related ENT care."
            />
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition, index) => (
              <Link
                key={condition.slug}
                href={`/conditions/${condition.slug}`}
                className="group bg-white p-7 transition-colors duration-300 hover:bg-[var(--mist)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--gold)] sm:p-8 lg:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-xs font-medium tracking-[0.15em] text-[var(--gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--teal)]"
                  />
                </div>

                <h2 className="mt-12 text-2xl tracking-[-0.025em] text-[var(--midnight)]">
                  {condition.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {condition.introduction}
                </p>

                <div className="mt-8 text-sm font-semibold text-[var(--teal)]">
                  Explore conditions
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="border-t border-[var(--border)] bg-[var(--mist)] py-16 lg:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Not sure what&apos;s causing your symptoms?
              </p>

              <h2 className="mt-5 text-4xl leading-tight tracking-[-0.035em] text-[var(--midnight)] sm:text-5xl">
                Start with an evaluation.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
                A clinical consultation can help understand your symptoms and
                determine the appropriate next step.
              </p>
            </div>

            <Link
              href="/book"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[var(--midnight)] px-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Book a consultation

              <ArrowRight
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