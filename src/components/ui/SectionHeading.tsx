interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && (
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-[var(--gold)]"
          />

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
            {eyebrow}
          </p>
        </div>
      )}

      <h2 className="text-balance text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--midnight)] sm:text-5xl lg:text-[4.25rem]">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}