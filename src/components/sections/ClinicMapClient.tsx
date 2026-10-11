"use client";

import dynamic from "next/dynamic";

const ClinicMap = dynamic(
  () => import("./ClinicMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[360px] bg-[var(--mist)] lg:min-h-full"
        aria-label="Loading clinic map"
      />
    ),
  }
);

export default function ClinicMapClient() {
  return <ClinicMap />;
}