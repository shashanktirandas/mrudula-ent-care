import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import ClinicMapClient from "@/components/location/ClinicMapClient";

export const metadata = {
  title: "Contact",
  description:
    "Contact Dr. Mrudula ENT Care in Jubilee Hills, Hyderabad for specialist ENT and head & neck care.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="bg-[var(--midnight)] text-white">
        <Container size="wide">
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Contact" },
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
                  Contact the clinic
                </p>
              </div>

              <h1 className="max-w-4xl text-balance text-[3.75rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
                Get in touch.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Find the clinic, speak with the team, or request a
                consultation with Dr. Mrudula.
              </p>
            </div>

            <div className="border-l border-white/10 pl-6 lg:mb-2 lg:pl-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                Clinic
              </p>

              <p className="mt-4 text-lg font-medium text-white">
                Dr. Mrudula ENT Care
              </p>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Jubilee Hills · Hyderabad
              </p>

              <a
                href="tel:+919849835822"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
              >
                <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
                +91 98498 35822
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact information */}
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Visit the clinic
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                A clear route to your next step.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--muted)]">
                Whether you are planning a consultation or simply need to
                reach the clinic, the essential information is here.
              </p>

              <div className="mt-10 space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <MapPin
                    size={20}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[var(--teal)]"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[var(--midnight)]">
                      Clinic address
                    </p>

                    <address className="mt-2 not-italic text-sm leading-6 text-[var(--muted)]">
                      4th Floor, Westend,
                      <br />
                      Road No. 36, Venkatagiri,
                      <br />
                      Jubilee Hills, Hyderabad – 500033
                    </address>

                    <a
                      href="https://maps.app.goo.gl/ugGUHizAvWBS9scE9"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal)] transition-colors hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                    >
                      Get directions
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone
                    size={20}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[var(--teal)]"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[var(--midnight)]">
                      Phone
                    </p>

                    <a
                      href="tel:+919849835822"
                      className="mt-2 inline-block text-sm font-semibold text-[var(--teal)] transition-colors hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                    >
                      +91 98498 35822
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <Clock3
                    size={20}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[var(--teal)]"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[var(--midnight)]">
                      Clinic hours
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      Monday – Saturday
                      <br />
                      4:00 PM – 9:00 PM
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Sunday · Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Ready to arrange a consultation?
                </p>

                <Link
                  href="/book"
                  className="mt-4 inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--midnight)] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                >
                  Request a consultation
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="overflow-hidden border border-[var(--border)] bg-[var(--mist)]">
                <div className="relative min-h-[420px] lg:min-h-[620px]">
                  <ClinicMapClient />

                  <div className="pointer-events-none absolute left-5 top-5 z-[500] border border-white/20 bg-[var(--midnight)]/95 px-5 py-4 text-white shadow-[0_18px_50px_rgba(11,23,32,0.18)]">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                      Dr. Mrudula ENT Care
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      Jubilee Hills · Hyderabad
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[var(--muted)]">
                  Use the map to orient yourself around the clinic location.
                </p>

                <a
                  href="https://maps.app.goo.gl/ugGUHizAvWBS9scE9"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--teal)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                >
                  Open directions
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Important information */}
      <section className="bg-[var(--mist)] py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Before you visit
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                A little preparation can make your visit easier.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-sm font-semibold text-[var(--midnight)]">
                  Plan your route
                </p>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Check the clinic location and allow enough time for your
                  journey before your consultation.
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-sm font-semibold text-[var(--midnight)]">
                  Bring relevant information
                </p>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  If applicable, bring previous reports, prescriptions or
                  diagnostic information relevant to your ENT concern.
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-sm font-semibold text-[var(--midnight)]">
                  Need an appointment?
                </p>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  You can request a consultation online or contact the clinic
                  directly.
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-sm font-semibold text-[var(--midnight)]">
                  Urgent concern?
                </p>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  For life-threatening emergencies, seek immediate emergency
                  medical care rather than waiting for a clinic response.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}