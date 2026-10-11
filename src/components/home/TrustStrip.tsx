import {
  Activity,
  Baby,
  Ear,
  MapPin,
  Stethoscope,
} from "lucide-react";
import Container from "../ui/Container";

const items = [
  {
    label: "ENT & Head–Neck Care",
    icon: Stethoscope,
  },
  {
    label: "Adults & Children",
    icon: Baby,
  },
  {
    label: "Diagnostic Evaluation",
    icon: Activity,
  },
  {
    label: "Personalized Treatment",
    icon: Ear,
  },
  {
    label: "Jubilee Hills · Hyderabad",
    icon: MapPin,
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Dr. Mrudula ENT Care at a glance"
      className="border-b border-[var(--border)] bg-[var(--ivory)]"
    >
      <Container>
        <div className="grid divide-y divide-[var(--border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {items.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="group flex min-h-[104px] items-center gap-4 px-5 py-5 lg:min-h-[116px] lg:justify-center lg:px-6"
            >
              <div
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--gold)] transition-colors duration-300 group-hover:border-[var(--gold)]/50"
              >
                <Icon size={15} strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.13em] text-[var(--midnight)]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}