import Image from "next/image";

export default function Loading() {
  return (
    <main
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[var(--midnight)]"
      aria-label="Loading Dr. Mrudula ENT Care"
    >
      <div className="flex flex-col items-center">
        <Image
          src="/images/brand/mrudula-ent-care-logo.png"
          alt="Dr. Mrudula ENT Care"
          width={220}
          height={80}
          priority
          className="h-auto w-[180px] sm:w-[220px]"
        />

        <div
          className="mt-8 h-px w-16 overflow-hidden bg-white/10"
          aria-hidden="true"
        >
          <div className="h-full w-1/2 animate-pulse bg-[var(--gold-light)]" />
        </div>

        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
          Specialist ENT Care
        </p>
      </div>
    </main>
  );
}