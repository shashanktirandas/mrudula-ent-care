import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function PageBreadcrumb({
  items,
}: PageBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-x-4"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-white/20"
              >
                /
              </span>
            )}

            {isLast || !item.href ? (
              <span className="text-[var(--gold-light)]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-white/40 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)]"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}