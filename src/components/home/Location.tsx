import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import Container from "../ui/Container";
import ClinicMapClient from "../sections/ClinicMapClient";
const clinic = {
  name: "Dr. Mrudula ENT Care",
  address: [
    "4th Floor, Westend, Road No. 36",
    "Venkatagiri, Jubilee Hills",
    "Hyderabad – 500033",
  ],
  phone: "+91 98498 35822",
  hours: "Monday – Saturday · 4:00 PM – 9:00 PM",
};

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Dr+Mrudula+ENT+Care+Westend+Road+No+36+Jubilee+Hills+Hyderabad";

export default function Location() {
  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="bg-[var(--ivory)] py-20 sm:py-28 lg:py-32"
    >
      <Container size="wide">
        <div className="grid overflow-hidden border border-[var(--border)] bg-white lg:grid-cols-[0.85fr_1.15fr]">
          {/* Clinic information */}
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Visit the clinic
              </p>
            </div>

            <h2
              id="location-title"
              className="mt-5 text-balance text-4xl leading-[0.98] tracking-[-0.04em] text-[var(--midnight)] sm:text-5xl"
            >
              Jubilee Hills,
              <br />
              Hyderabad.
            </h2>

            <div className="mt-9 space-y-7">
              {/* Address */}
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] text-[var(--gold)]"
                >
                  <MapPin size={17} strokeWidth={1.5} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-[var(--midnight)]">
                    Clinic
                  </p>

                  <address className="mt-1 not-italic text-sm leading-6 text-[var(--muted)]">
                    {clinic.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] text-[var(--gold)]"
                >
                  <Clock size={17} strokeWidth={1.5} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-[var(--midnight)]">
                    Clinic hours
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    {clinic.hours}
                    <br />
                    Sunday · Closed
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] text-[var(--gold)]"
                >
                  <Phone size={17} strokeWidth={1.5} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-[var(--midnight)]">
                    Clinic contact
                  </p>

                  <a
                    href="tel:+919849835822"
                    className="mt-1 inline-block text-sm text-[var(--muted)] transition-colors hover:text-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                  >
                    {clinic.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--midnight)] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                <Navigation
                  size={16}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                Get directions
              </a>

              <Link
                href="/book"
                className="group inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--border)] px-5 py-3.5 text-sm font-semibold text-[var(--midnight)] transition-colors hover:border-[var(--gold)] hover:text-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                Book a consultation

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Map area
          <div className="relative min-h-[360px] overflow-hidden bg-[var(--mist)] lg:min-h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[var(--deep-teal)]/10 sm:h-80 sm:w-80">
                <div className="flex h-44 w-44 items-center justify-center rounded-full border border-[var(--gold)]/20 sm:h-56 sm:w-56">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--deep-teal)] text-white shadow-[var(--shadow-soft)]">
                    <MapPin size={23} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="bg-white/90 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Jubilee Hills
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Hyderabad · 500033
                </p>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Dr. Mrudula ENT Care location in Google Maps"
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-[var(--midnight)] shadow-[var(--shadow-soft)] transition-colors hover:bg-[var(--midnight)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div> */}
          {/* RIGHT — REAL MAP */}
  <ClinicMapClient />
        </div>
      </Container>
    </section>
  );
}