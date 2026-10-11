import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "ENT Services",
  description:
    "Explore specialist ENT and head & neck services offered by Dr. Mrudula ENT Care in Hyderabad.",
};

export default function ServicesPage() {
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
    { label: "Services" },
  ]}
  eyebrow="ENT Services"
  title="Specialist care, thoughtfully focused."
  description="Explore focused ENT and head & neck services designed around careful evaluation, clear communication and individualized care."
/>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="py-12 lg:py-16">
        <Container>
          {/* Section introduction */}
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Areas of care"
              title="Focused expertise for your ENT needs."
              description="Select an area below to understand what the service involves and when an evaluation may be appropriate."
            />
          </div>

          {/* Service cards */}
<div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
  {services.map((service, index) => (
    <Link
      key={service.slug}
      href={`/services/${service.slug}`}
      className="group relative bg-[var(--white)] p-7 transition-colors duration-300 hover:bg-[var(--mist)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--gold)] sm:p-8 lg:p-9"
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
        {service.title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
        {service.introduction}
      </p>

      <div className="mt-8 text-sm font-semibold text-[var(--teal)]">
        Explore service
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
            {/* CTA copy */}
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Not sure where to begin?
              </p>

              <h2 className="mt-5 text-4xl leading-tight tracking-[-0.035em] text-[var(--midnight)] sm:text-5xl">
                Start with a conversation.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
                If you are unsure which service is right for your concern, the
                first step is a clinical evaluation.
              </p>
            </div>

            {/* CTA button */}
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