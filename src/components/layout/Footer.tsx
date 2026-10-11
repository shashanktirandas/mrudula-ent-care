import Image from "next/image";
import Link from "next/link";
import Container from "../ui/Container";

const exploreLinks = [
  { label: "Services", href: "/services" },
  { label: "Conditions", href: "/conditions" },
  { label: "Doctor", href: "/doctor" },
  { label: "Patient Guides", href: "/patient-guides" },
  { label: "FAQ", href: "/#faq" },
];

const clinicLinks = [
  { label: "Book Consultation", href: "/book" },
  { label: "Contact Clinic", href: "/contact" },
  { label: "Location & Directions", href: "/#location" },
];

const focusClass =
  "transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]";

export default function Footer() {
  return (
    <footer className="bg-[var(--midnight)] text-white">
      <Container>
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Dr. Mrudula ENT Care home"
              className={`inline-flex min-h-12 items-center ${focusClass}`}
            >
              <Image
                src="/images/brand/mrudula-ent-care-logo.png"
                alt="Dr. Mrudula ENT Care"
                width={180}
                height={64}
                className="h-auto w-[150px] object-contain sm:w-[170px]"
              />
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-6 text-white/45">
              Specialist ENT care focused on clear diagnosis, thoughtful
              treatment and better patient experiences.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-light)]">
              Explore
            </p>

            <nav
              aria-label="Footer navigation"
              className="mt-5 flex flex-col gap-3"
            >
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-fit text-sm text-white/60 ${focusClass}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Clinic */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-light)]">
              Clinic
            </p>

            <nav
              aria-label="Clinic links"
              className="mt-5 flex flex-col gap-3"
            >
              {clinicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-fit text-sm text-white/60 ${focusClass}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs leading-5 text-white/40">
                Jubilee Hills · Hyderabad
              </p>

              <p className="mt-2 text-xs leading-5 text-white/40">
                Monday–Saturday
                <br />
                4:00 PM–9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] text-white/30">
              © {new Date().getFullYear()} Dr. Mrudula ENT Care.
            </p>

            <Link
              href="/developer"
              className={`mt-2 inline-flex text-[10px] text-white/30 ${focusClass}`}
            >
              Digital experience by{" "}
              <span className="ml-1 text-white/40">
                CHAAM Software Solutions
              </span>

              <span aria-hidden="true" className="ml-1">
                ↗
              </span>
            </Link>
          </div>

          <p className="max-w-md text-[10px] leading-5 text-white/25">
            Medical information is provided for general educational purposes
            and does not replace professional medical advice.
          </p>
        </div>
      </Container>
    </footer>
  );
}