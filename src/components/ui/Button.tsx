import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-[var(--midnight)] text-white hover:bg-[var(--deep-teal)] active:translate-y-px focus-visible:outline-[var(--gold)]",

    secondary:
      "border border-[var(--midnight)] text-[var(--midnight)] hover:bg-[var(--midnight)] hover:text-white active:translate-y-px focus-visible:outline-[var(--gold)]",

    light:
      "bg-white text-[var(--midnight)] hover:bg-[var(--mist)] active:translate-y-px focus-visible:outline-[var(--gold-light)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (disabled) {
      return (
        <span
          aria-disabled="true"
          className={`${classes} cursor-not-allowed`}
        >
          {children}
        </span>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}