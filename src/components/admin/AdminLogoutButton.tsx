"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loggingOut}
      className="flex min-h-11 items-center gap-2 border border-[var(--border)] px-4 text-sm text-[var(--muted)] transition-colors hover:border-[var(--midnight)] hover:text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut size={16} strokeWidth={1.7} aria-hidden="true" />
      {loggingOut ? "Signing out…" : "Sign out"}
    </button>
  );
}