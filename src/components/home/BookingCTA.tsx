import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";

export default function BookingCTA() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className="relative overflow-hidden bg-[var(--midnight)] py-24 text-white sm:py-32 lg:py-40"
    >
      {/* Restrained ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--deep-teal)]/30 blur-3xl"
      />

      <Container size="wide">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[var(--gold-light)]"
            />

            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)]">
              Your next step
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[var(--gold-light)]"
            />
          </div>

          <h2
            id="booking-title"
            className="text-balance text-5xl leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-[6.5rem]"
          >
            Let&apos;s understand
            <br />
            what you need.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
            Request a consultation and take the next step toward clearer,
            more informed ENT care.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/book"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
            >
              Book a Consultation

              <ArrowUpRight
                size={17}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center px-5 py-4 text-sm font-medium text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
            >
              Prefer to speak with the clinic?
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}