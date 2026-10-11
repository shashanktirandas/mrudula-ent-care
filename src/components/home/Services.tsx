import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";

const services = [
  {
    number: "01",
    title: "Allergy & Immunotherapy",
    description:
      "Evaluation and management of allergic conditions with an individualized approach to care.",
    href: "/services/allergy-immunotherapy",
  },
  {
    number: "02",
    title: "Endoscopy Services",
    description:
      "Detailed examination of the ear, nose and throat when a closer view is needed.",
    href: "/services/endoscopy",
  },
  {
    number: "03",
    title: "Vertigo & Balance",
    description:
      "Evaluation of dizziness, vertigo and balance-related concerns.",
    href: "/services/vertigo-balance",
  },
  {
    number: "04",
    title: "Minor ENT Procedures",
    description:
      "Selected ENT procedures with careful evaluation and appropriate follow-up.",
    href: "/services/minor-ent-procedures",
  },
  {
    number: "05",
    title: "Head & Neck Care",
    description:
      "Evaluation of lumps, lesions and other head and neck concerns.",
    href: "/services/head-neck",
  },
  {
    number: "06",
    title: "Emergency ENT Care",
    description:
      "Assessment of urgent ear, nose and throat concerns requiring prompt attention.",
    href: "/services/emergency-ent-care",
  },
];

export default function Services() {
  return (
    
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-[var(--midnight)] py-24 text-white sm:py-32 lg:py-40"
    >
      
      <Container size="wide">
        {/* Section introduction */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold-light)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                Specialized care
              </p>
            </div>

            <h2
              id="services-title"
              className="max-w-3xl text-balance text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-[5rem]"
            >
              Focused expertise.
              <br />
              Thoughtful care.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base leading-7 text-white/50">
              A focused range of ENT and head & neck services, built around
              careful evaluation and individualized care.
            </p>

            <Link
              href="/services"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
            >
              View all services
              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Service index */}
        <div className="mt-2">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              aria-label={`Explore ${service.title}`}
              className="group grid border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/[0.025] focus-visible:bg-white/[0.04] focus-visible:outline-none sm:grid-cols-[72px_1fr_1fr_40px] sm:items-center sm:gap-8 sm:py-8 lg:grid-cols-[88px_1fr_1fr_48px] lg:gap-12"
            >
              {/* Number */}
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold-light)]">
                {service.number}
              </span>

              {/* Title */}
              <h3 className="mt-3 text-2xl leading-tight tracking-[-0.025em] text-white transition-transform duration-300 group-hover:translate-x-1 sm:mt-0 sm:text-3xl lg:text-[2rem]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-md text-sm leading-6 text-white/45 sm:mt-0">
                {service.description}
              </p>

              {/* Arrow */}
              <span
                aria-hidden="true"
                className="mt-5 flex h-10 w-10 items-center justify-center border border-white/10 text-white/45 transition-all duration-300 group-hover:border-[var(--gold-light)]/40 group-hover:text-white sm:mt-0 sm:justify-self-end"
              >
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}