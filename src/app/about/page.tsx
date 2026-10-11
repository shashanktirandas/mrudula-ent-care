import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Stethoscope,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const carePrinciples = [
  {
    number: "01",
    title: "Listen",
    description:
      "Understand the concern, symptoms and relevant history before deciding what needs to happen next.",
  },
  {
    number: "02",
    title: "Evaluate",
    description:
      "Use appropriate ENT examination and diagnostic assessment to understand the concern more clearly.",
  },
  {
    number: "03",
    title: "Explain",
    description:
      "Make the findings and possible next steps easier to understand, so patients can participate in their care.",
  },
  {
    number: "04",
    title: "Plan",
    description:
      "Consider an appropriate treatment or further evaluation plan based on the individual situation.",
  },
];

const careExpectations = [
  "A focused approach to ear, nose, throat, balance and head & neck concerns",
  "Care for both adults and children",
  "Careful clinical evaluation before treatment decisions",
  "Appropriate diagnostic assessment when needed",
  "Clear communication about findings and next steps",
  "Individualized treatment planning",
];

export const metadata = {
  title: "About the Clinic",
  description:
    "Learn about Dr. Mrudula ENT Care in Jubilee Hills, Hyderabad and its approach to specialist ENT and head & neck care.",
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="bg-[var(--midnight)] text-white">
        <Container size="wide">
          <div className="py-8 sm:py-10">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About" },
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
                  About the clinic
                </p>
              </div>

              <h1 className="max-w-4xl text-balance text-[3.75rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
                Care built around
                <br />
                understanding first.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Dr. Mrudula ENT Care provides specialist ENT and head & neck
                care with an emphasis on careful evaluation, clear
                communication and individualized treatment planning.
              </p>
            </div>

            <div className="border-l border-white/10 pl-6 lg:mb-2 lg:pl-8">
              <Stethoscope
                size={24}
                strokeWidth={1.4}
                className="text-[var(--gold-light)]"
                aria-hidden="true"
              />

              <p className="mt-5 text-lg font-medium text-white">
                Specialist ENT care.
              </p>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Ear · Nose · Throat · Allergy · Balance · Head & Neck
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                The clinic
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                A focused approach to ENT care.
              </h2>
            </div>

            <div className="max-w-3xl">
              <p className="text-xl leading-9 tracking-[-0.015em] text-[var(--midnight)] sm:text-2xl sm:leading-10">
                ENT concerns can affect everyday experiences such as hearing,
                breathing, balance, communication and swallowing. Understanding
                the concern clearly is an important part of deciding what
                should happen next.
              </p>

              <p className="mt-7 text-base leading-8 text-[var(--muted)]">
                The clinic&apos;s approach is centered around understanding
                symptoms, performing an appropriate clinical evaluation,
                explaining relevant findings and developing an individualized
                plan where appropriate.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Care philosophy */}
      <section className="bg-[var(--mist)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="flex flex-col gap-8 border-b border-[var(--border)] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                The care approach
              </p>

              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1] tracking-[-0.04em] text-[var(--midnight)] sm:text-5xl">
                From concern to a clearer next step.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              Every patient and every concern is different. The process begins
              with understanding the individual situation.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {carePrinciples.map((principle) => (
              <div
                key={principle.number}
                className="bg-white p-7 sm:p-8 lg:min-h-[310px] lg:p-9"
              >
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                  {principle.number}
                </span>

                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-[var(--midnight)]">
                  {principle.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What patients can expect */}
      <section className="bg-[var(--midnight)] py-16 text-white sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                What to expect
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-4xl">
                Thoughtful care, clearly communicated.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/50">
                The goal is not to make healthcare complicated. It is to help
                patients understand their concern and the reasoning behind
                their next step.
              </p>
            </div>

            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {careExpectations.map((item) => (
                <div
                  key={item}
                  className="flex gap-4 border-t border-white/10 pt-5"
                >
                  <Check
                    size={17}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[var(--gold-light)]"
                    aria-hidden="true"
                  />

                  <p className="text-sm leading-6 text-white/65">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Doctor connection */}
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid overflow-hidden border border-[var(--border)] bg-white lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative min-h-[420px] bg-[var(--mist)] lg:min-h-full">
              <Image
                src="/images/doctor/dr-mrudula.jpg"
                alt="Dr. Mrudula Mukiri"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14 xl:p-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                The specialist behind the practice
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                Dr. Mrudula Mukiri
              </h2>

              <p className="mt-3 text-sm font-medium text-[var(--teal)]">
                MBBS · MS (ENT &amp; Head &amp; Neck Surgery)
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
                Dr. Mrudula&apos;s clinical scope includes ear conditions,
                hearing concerns, nasal and sinus disorders, allergy, vertigo
                and balance concerns, throat and voice conditions, pediatric
                ENT and head &amp; neck conditions.
              </p>

              <Link
                href="/doctor"
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--teal)] transition-colors hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                Meet Dr. Mrudula
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="bg-[var(--mist)] py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Find the clinic
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-[var(--midnight)] sm:text-4xl">
                Jubilee Hills · Hyderabad
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                Dr. Mrudula ENT Care is located at 4th Floor, Westend, Road
                No. 36, Venkatagiri, Jubilee Hills, Hyderabad – 500033.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-12 w-fit items-center justify-center gap-3 bg-[var(--midnight)] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Clinic &amp; directions
              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--midnight)] py-16 text-white sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                Your next step
              </p>

              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Let&apos;s understand what you need.
              </h2>
            </div>

            <Link
              href="/book"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
            >
              Request a consultation
              <ArrowUpRight
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