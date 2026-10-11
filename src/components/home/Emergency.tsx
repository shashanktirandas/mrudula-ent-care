import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import Container from "../ui/Container";

export default function Emergency() {
  return (
    <section
      id="urgent-care"
      aria-labelledby="urgent-care-title"
      className="bg-[#eee9df] py-16 sm:py-20 lg:py-24"
    >
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[var(--gold)]"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Urgent ENT concerns
              </p>
            </div>

            <h2
              id="urgent-care-title"
              className="mt-5 text-balance text-3xl leading-tight tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl lg:text-[2.75rem]"
            >
              Need prompt ENT attention?
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
              For urgent ear, nose or throat concerns, contact the clinic to
              understand the appropriate next step.
            </p>

            <div className="mt-5 max-w-2xl border-l border-[var(--gold)]/60 pl-4">
              <p className="text-xs leading-5 text-[var(--muted)]">
                For life-threatening emergencies, seek emergency medical
                services immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[230px] lg:flex-col">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--midnight)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              <Phone
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              Contact Clinic
            </Link>

            <Link
              href="/emergency-ent-care"
              className="group inline-flex min-h-12 items-center justify-center gap-3 border border-[var(--midnight)] px-6 py-3.5 text-sm font-semibold text-[var(--midnight)] transition-colors hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Emergency ENT Care

              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}