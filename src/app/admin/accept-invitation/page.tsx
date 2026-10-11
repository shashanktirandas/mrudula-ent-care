import type { Metadata } from "next";
import AcceptInvitationForm from "./AcceptInvitationForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Accept Team Invitation | Dr. Mrudula ENT Care",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
  referrer: "no-referrer",
};

type PageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function AcceptInvitationPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";

  return <AcceptInvitationForm initialToken={token} />;
}