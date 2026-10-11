
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Headphones } from "lucide-react";
import SoundWaveGame from "@/components/home/SoundWaveGame";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F5EF] text-[#0B1720]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-[440px] rounded-full border border-[#123D43]/10 sm:size-[600px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 size-[320px] rounded-full border border-[#123D43]/10 sm:size-[450px]"
      />

      <header className="relative z-10 border-b border-[#123D43]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            aria-label="Dr Mrudula ENT Care home"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123D43]"
          >
            <Image
              src="/images/brand/mrudula-ent-care-logo.png"
              alt="Dr Mrudula ENT Care"
              width={190}
              height={70}
              priority
              className="h-auto w-36 sm:w-44"
            />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#123D43] transition-colors hover:text-[#98783E]"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to the clinic</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#123D43]/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#123D43]">
              <Headphones size={15} />
              A little off track?
            </div>

            <p className="mt-7 font-serif text-[clamp(6rem,17vw,11rem)] leading-[0.8] tracking-[-0.08em] text-[#123D43]">
              404
            </p>

            <h1 className="mt-8 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Lost your way?
              <br />
              <span className="text-[#8A9691]">
                Let&apos;s find your rhythm.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#52616A] sm:text-lg">
              This page seems to have wandered away. No worries —
              the right path back to your care is just a step away.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0B1720] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#123D43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123D43]"
              >
                Return to homepage
                <ArrowUpRight size={16} />
              </Link>

              <a
                href="tel:+919849835822"
                className="inline-flex min-h-12 items-center justify-center border border-[#123D43]/20 px-5 py-3 text-sm font-medium text-[#123D43] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123D43]"
              >
                Call the clinic
              </a>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center"
          >
            <div className="absolute inset-[7%] rounded-full border border-[#123D43]/10" />
            <div className="absolute inset-[19%] rounded-full border border-[#123D43]/15" />
            <div className="absolute inset-[31%] rounded-full border border-[#123D43]/20" />

            <svg
              viewBox="0 0 320 220"
              fill="none"
              className="relative w-[85%] text-[#123D43]"
            >
              <path
                d="M8 110 H55 L69 110 L83 83 L98 142 L116 56 L139 164 L159 90 L175 124 L190 110 H312"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="160"
                cy="110"
                r="48"
                stroke="#B79A61"
                strokeWidth="1.5"
                strokeDasharray="3 7"
              />
              <circle cx="160" cy="110" r="5" fill="#B79A61" />
            </svg>

            <span className="absolute bottom-[10%] right-[7%] rounded-full border border-[#123D43]/10 bg-[#F7F5EF] px-3 py-2 text-xs tracking-wide text-[#52616A]">
              Find your way
            </span>
          </div>
        </section>

        <div className="mt-14 sm:mt-20">
          <SoundWaveGame />
        </div>

        <footer className="mt-8 flex flex-col gap-2 border-t border-[#123D43]/10 pt-5 text-xs text-[#657078] sm:flex-row sm:items-center sm:justify-between">
          <p>Dr Mrudula ENT Care · Jubilee Hills, Hyderabad</p>
          <p>Take a breath. You&apos;re in the right place to find your way.</p>
        </footer>
      </div>
    </main>
  );
}
