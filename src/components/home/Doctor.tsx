import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../ui/Container";

const expertise = [
  "Diagnostic ENT evaluation",
  "Endoscopy",
  "Allergy & sinus care",
  "Vertigo & balance disorders",
  "Pediatric ENT",
  "Head & neck conditions",
];

export default function Doctor() {
  return (
    <section
      id="doctor"
      aria-labelledby="doctor-title"
      className="bg-[var(--ivory)] py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          {/* Doctor image */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="relative overflow-hidden bg-[var(--mist)]">
              <Image
                src="/images/doctor/dr-mrudula.jpg"
                alt="Dr. Mrudula Mukiri, ENT and Head & Neck specialist"
                width={380}
                height={490}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>

            {/* Specialist label */}
            <div className="absolute -bottom-5 right-4 border border-[var(--border)] bg-white px-5 py-4 shadow-[var(--shadow-soft)] sm:-right-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Specialist
              </p>

              <p className="mt-1 text-sm text-[var(--midnight)]">
                ENT & Head–Neck
              </p>
            </div>
          </div>

          {/* Doctor information */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Meet your specialist
              </p>
            </div>

            <h2
              id="doctor-title"
              className="text-balance text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--midnight)] sm:text-6xl lg:text-[4.5rem]"
            >
              Dr. Mrudula
              <br />
              Mukiri.
            </h2>

            <p className="mt-6 text-base font-medium text-[var(--deep-teal)] sm:text-lg">
              MBBS · MS (ENT & Head & Neck Surgery)
            </p>

            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              Specialist ENT care across ear, nose, throat, allergy, balance
              and head & neck concerns, with careful evaluation and
              individualized treatment planning.
            </p>

            {/* Areas of expertise */}
            <div className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {expertise.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30"
                  >
                    <Check
                      size={12}
                      strokeWidth={1.8}
                      className="text-[var(--gold)]"
                    />
                  </span>

                  <span className="text-sm text-[var(--midnight)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/doctor"
              className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--midnight)] pb-2 text-sm font-semibold text-[var(--midnight)] transition-colors hover:border-[var(--gold)] hover:text-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Meet Dr. Mrudula

              <ArrowUpRight
                size={16}
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