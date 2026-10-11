"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

type AdminRole = "SUPER_ADMIN" | "CLINIC_ADMIN" | "STAFF";

type AdminShellProps = {
  children: React.ReactNode;
  admin: {
    name: string;
    email: string;
    role: AdminRole;
  };
};

const navigation: {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: AdminRole[];
}[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "STAFF"],
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
    icon: CalendarDays,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "STAFF"],
  },
  {
    label: "Staff",
    href: "/admin/staff",
    icon: Users,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN"],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN"],
  },
];


function roleLabel(role: AdminRole) {
  const labels: Record<AdminRole, string> = {
    SUPER_ADMIN: "Super Admin",
    CLINIC_ADMIN: "Clinic Administrator",
    STAFF: "Staff Member",
  };

  return labels[role];
}


export default function AdminShell({
  children,
  admin,
}: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(admin.role),
  );

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--midnight)]">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[var(--midnight)]/40 lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/10 bg-[var(--midnight)]",
          "transform transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            aria-label="Admin overview"
          >
            <img
              src="/images/brand/mrudula-ent-care-logo.png"
              alt="Dr. Mrudula ENT Care"
              className="h-auto w-[145px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="flex h-11 w-11 items-center justify-center text-white/60 hover:text-white lg:hidden"
          >
            <X size={20} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-7">
          <p className="px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--gold-light)]">
            Clinic operations
          </p>

          <nav
            aria-label="Admin navigation"
            className="mt-4 space-y-1"
          >
            {visibleNavigation.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex min-h-12 items-center gap-3 px-3 text-sm transition-colors duration-200",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="mb-5 flex items-start gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold-light)]">
              <ShieldCheck
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm text-white">
                {admin.name}
              </p>

              <p className="mt-0.5 truncate text-[11px] uppercase tracking-[0.12em] text-white/40">
                {roleLabel(admin.role)}
              </p>
            </div>
          </div>

          <AdminLogoutButton />
        </div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-[var(--border)] bg-[var(--ivory)]/95 px-5 backdrop-blur-sm sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="mr-4 flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-white lg:hidden"
          >
            <Menu
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </button>

          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <Stethoscope
              size={14}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            Dr. Mrudula ENT Care
          </div>
        </header>

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}