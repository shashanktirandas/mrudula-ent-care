"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "../ui/Container";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "Conditions", href: "/conditions" },
  { label: "Doctor", href: "/doctor" },
  { label: "Patient Guides", href: "/patient-guides" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <Container>
        <nav
          aria-label="Primary navigation"
          className="flex h-24 items-center justify-between border-b border-white/15"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-10 flex min-h-12 items-center"
            aria-label="Dr. Mrudula ENT Care home"
          >
            <Image
              src="/images/brand/mrudula-ent-care-logo.png"
              alt="Dr. Mrudula ENT Care"
              width={180}
              height={64}
              priority
              className="h-auto w-[150px] object-contain sm:w-[170px]"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative py-3 text-sm text-white/75 transition-colors duration-300 hover:text-white focus-visible:text-white"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/book"
              className="group flex min-h-12 items-center gap-2 bg-white px-5 text-sm font-medium text-[var(--midnight)] transition-all duration-300 hover:bg-[var(--mist)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Book Consultation

              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="relative z-10 flex min-h-12 min-w-12 items-center justify-center text-white focus-visible:outline-2 focus-visible:outline-[var(--gold)] lg:hidden"
          >
            {open ? (
              <X size={25} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Menu size={26} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        </nav>
      </Container>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-b border-white/10 bg-[var(--midnight)] lg:hidden"
      >
        <Container>
          <div className="flex flex-col py-5">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center border-b border-white/10 py-3 text-base text-white/85 transition-colors hover:text-white focus-visible:text-white"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/book"
              onClick={closeMenu}
              className="mt-5 flex min-h-12 items-center justify-center bg-white px-5 text-sm font-medium text-[var(--midnight)] transition-colors hover:bg-[var(--mist)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Book Consultation
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}