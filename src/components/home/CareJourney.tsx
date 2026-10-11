import Container from "../ui/Container";

const steps = [
  {
    number: "01",
    title: "Listen",
    description:
      "We begin by understanding what you are experiencing, your concerns and what matters to you.",
  },
  {
    number: "02",
    title: "Evaluate",
    description:
      "A focused ENT assessment helps identify what needs closer attention and whether further evaluation is appropriate.",
  },
  {
    number: "03",
    title: "Explain",
    description:
      "Findings are explained clearly so you can understand your condition and the care options available to you.",
  },
  {
    number: "04",
    title: "Plan",
    description:
      "Your care plan is shaped around your condition, individual needs and clinical findings.",
  },
  {
    number: "05",
    title: "Follow through",
    description:
      "When follow-up is appropriate, your care continues beyond the initial consultation.",
  },
];

export default function CareJourney() {
  return (
    <section
      id="care-journey"
      aria-labelledby="care-journey-title"
      className="bg-[var(--mist)] py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        {/* Introduction */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Your care journey
              </p>
            </div>

            <h2
              id="care-journey-title"
              className="text-balance text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--midnight)] sm:text-6xl lg:text-[4.5rem]"
            >
              Clearer care,
              <br />
              step by step.
            </h2>
          </div>

          <p className="max-w-lg text-base leading-7 text-[var(--muted)] lg:justify-self-end lg:text-lg lg:leading-8">
            From your first conversation to understanding the next step,
            each stage is approached with clarity and careful clinical
            evaluation.
          </p>
        </div>

        {/* Journey */}
        <div className="mt-16 border-t border-[var(--border)] sm:mt-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid gap-5 border-b border-[var(--border)] py-8 sm:grid-cols-[72px_0.75fr_1.25fr] sm:items-start sm:gap-8 sm:py-9 lg:grid-cols-[88px_0.75fr_1.25fr] lg:gap-12"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                {step.number}
              </span>

              <h3 className="text-2xl leading-tight tracking-[-0.025em] text-[var(--midnight)] sm:text-3xl">
                {step.title}
              </h3>

              <p className="max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}