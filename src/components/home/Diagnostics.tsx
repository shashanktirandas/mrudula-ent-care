import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../ui/Container";

const procedures = [
  "Diagnostic ENT endoscopy",
  "Septoplasty",
  "Tympanoplasty",
  "Tonsillectomy",
  "Adenoidectomy",
  "Endoscopic DCR",
];

export default function Diagnostics() {
  return (
    <section
      id="diagnostics"
      aria-labelledby="diagnostics-title"
      className="overflow-hidden bg-[var(--deep-teal)] py-24 text-white sm:py-32 lg:py-40"
    >
      <Container size="wide">
        {/* Diagnostic introduction */}
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold-light)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                Diagnostic evaluation
              </p>
            </div>

            <h2
              id="diagnostics-title"
              className="text-balance text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-[4.5rem]"
            >
              A closer look.
              <br />
              A clearer plan.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              When a closer examination is needed, ENT endoscopy can provide
              a more detailed view to support clinical evaluation and
              treatment planning.
            </p>

            <Link
              href="/endoscopy-services"
              className="group mt-9 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-sm font-semibold text-white transition-colors hover:border-[var(--gold-light)] hover:text-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
            >
              Explore Endoscopy

              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Diagnostic visual */}
          <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[500px]">
            <div
              aria-hidden="true"
              className="absolute h-[290px] w-[290px] rounded-full border border-white/10 sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px]"
            />

            <div
              aria-hidden="true"
              className="absolute h-[205px] w-[205px] rounded-full border border-[var(--gold-light)]/20 sm:h-[285px] sm:w-[285px] lg:h-[340px] lg:w-[340px]"
            />

            <div className="relative z-10 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                ENT
              </span>

              <p className="mt-3 text-4xl tracking-[-0.035em] text-white sm:text-5xl">
                Endoscopy
              </p>

              <p className="mt-3 text-xs tracking-[0.08em] text-white/40">
                Ear · Nose · Throat
              </p>

              <div
                aria-hidden="true"
                className="mx-auto mt-8 h-px w-10 bg-[var(--gold-light)]/60"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold-light)] shadow-[0_0_35px_rgba(214,189,139,0.7)]"
            />
          </div>
        </div>

        {/* Procedures */}
        <div className="mt-20 border-t border-white/10 pt-12 sm:mt-28 sm:pt-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                Selected procedures
              </p>

              <h3 className="mt-3 text-2xl tracking-[-0.025em] sm:text-3xl">
                Specialist procedures
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/40">
              Procedures are considered based on clinical evaluation,
              individual needs and suitability.
            </p>
          </div>

          <div className="mt-8 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {procedures.map((procedure) => (
              <div
                key={procedure}
                className="flex items-center gap-3 border-b border-white/10 py-5 sm:px-5 first:sm:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--gold-light)]/30"
                >
                  <Check
                    size={12}
                    strokeWidth={1.7}
                    className="text-[var(--gold-light)]"
                  />
                </span>

                <span className="text-sm text-white/75">{procedure}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}