import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  type LucideIcon,
} from "lucide-react";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
}

interface GlanceItem {
  label: string;
}

interface PageHeroProps {
  /**
   * simple:
   * Used for overview / hub pages such as /conditions and /services.
   *
   * detail:
   * Used for individual condition and service pages.
   */
  variant?: "simple" | "detail";

  breadcrumbs: BreadcrumbItem[];

  eyebrow: string;

  title: string;

  description: string;

  actions?: HeroAction[];

  glanceTitle?: string;

  glanceItems?: GlanceItem[];

  glanceDescription?: string;

  className?: string;
}

export default function PageHero({
  variant = "simple",
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions = [],
  glanceTitle,
  glanceItems = [],
  glanceDescription,
  className = "",
}: PageHeroProps) {
  const isDetail = variant === "detail";

  return (
    <section
      className={`relative overflow-hidden bg-[var(--midnight)] text-white ${className}`}
    >
      {/* Very subtle architectural background */}
      {isDetail && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-12rem] top-[-10rem] h-[38rem] w-[38rem] rounded-full border border-white/[0.035]"
        >
          <div className="absolute inset-12 rounded-full border border-white/[0.025]" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* =========================================================
            BREADCRUMB
        ========================================================== */}
        <div
          className={
            isDetail
              ? "py-8 sm:py-10"
              : "py-8 sm:py-10"
          }
        >
          <PageBreadcrumb items={breadcrumbs} />
        </div>

        {/* =========================================================
            SIMPLE HERO
            Used by /conditions and /services
        ========================================================== */}
        {!isDetail && (
          <div className="pb-20 sm:pb-24 lg:pb-28">
            <HeroContent
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            {actions.length > 0 && (
              <HeroActions actions={actions} className="mt-9" />
            )}
          </div>
        )}

        {/* =========================================================
            DETAIL HERO
            Used by individual condition/service pages
        ========================================================== */}
        {isDetail && (
          <div className="pb-20 sm:pb-24 lg:pb-28">
            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-20">
              {/* LEFT */}
              <div className="max-w-[780px]">
                <HeroContent
                  eyebrow={eyebrow}
                  title={title}
                  description={description}
                />

                {actions.length > 0 && (
                  <HeroActions
                    actions={actions}
                    className="mt-9"
                  />
                )}
              </div>

              {/* RIGHT */}
              {glanceItems.length > 0 && (
                <GlancePanel
                  title={
                    glanceTitle ||
                    "Understanding your concern starts here."
                  }
                  items={glanceItems}
                  description={glanceDescription}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===============================================================
   HERO CONTENT
================================================================ */

interface HeroContentProps {
  eyebrow: string;
  title: string;
  description: string;
}

function HeroContent({
  eyebrow,
  title,
  description,
}: HeroContentProps) {
  return (
    <>
      {/* Eyebrow */}
      <div className="mb-7 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-px w-10 shrink-0 bg-[var(--gold-light)]"
        />

        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)] sm:text-[11px]">
          {eyebrow}
        </p>
      </div>

      {/* Heading */}
      <h1 className="max-w-[1050px] text-balance text-[3.5rem] font-medium leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem] xl:text-[6rem]">
        {title}
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-[900px] text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
        {description}
      </p>
    </>
  );
}

/* ===============================================================
   ACTIONS
================================================================ */

interface HeroActionsProps {
  actions: HeroAction[];
  className?: string;
}

function HeroActions({
  actions,
  className = "",
}: HeroActionsProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}
    >
      {actions.map((action) => {
        const Icon =
          action.icon ||
          (action.variant === "secondary"
            ? Phone
            : ArrowUpRight);

        const isPrimary =
          action.variant !== "secondary";

        return (
          <Link
            key={`${action.label}-${action.href}`}
            href={action.href}
            className={
              isPrimary
                ? "inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 text-sm font-semibold text-[var(--midnight)] transition-all duration-300 hover:bg-[var(--gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] active:translate-y-px"
                : "inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-7 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] active:translate-y-px"
            }
          >
            {action.label}

            <Icon
              size={16}
              strokeWidth={1.7}
              aria-hidden="true"
              className="shrink-0"
            />
          </Link>
        );
      })}
    </div>
  );
}

/* ===============================================================
   AT A GLANCE
================================================================ */

interface GlancePanelProps {
  title: string;
  items: GlanceItem[];
  description?: string;
}

function GlancePanel({
  title,
  items,
  description,
}: GlancePanelProps) {
  return (
    <aside className="border border-white/10 bg-white/[0.025] p-7 sm:p-8 lg:p-9">
      {/* Label */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)]">
        At a glance
      </p>

      {/* Panel heading */}
      <h2 className="mt-6 max-w-[430px] text-2xl font-medium leading-tight tracking-[-0.025em] text-white sm:text-[1.65rem]">
        {title}
      </h2>

      {/* Items */}
      {items.length > 0 && (
        <ol className="mt-8 border-t border-white/10">
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-5 border-b border-white/10 py-5"
            >
              <span className="min-w-5 text-[10px] font-semibold tracking-[0.12em] text-[var(--gold-light)]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-sm leading-6 text-white/65 sm:text-[15px]">
                {item.label}
              </span>
            </li>
          ))}
        </ol>
      )}

      {/* Supporting note */}
      {description && (
        <p className="mt-8 text-xs leading-6 text-white/35 sm:text-sm">
          {description}
        </p>
      )}
    </aside>
  );
}