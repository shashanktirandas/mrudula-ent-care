import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Dr. Mrudula ENT Care | Specialist ENT Care in Hyderabad",
    template: "%s | Dr. Mrudula ENT Care",
  },

  description:
    "Specialist ENT care for adults and children across ear, nose, throat, allergy, vertigo, balance and head & neck concerns in Hyderabad.",

  applicationName: "Dr. Mrudula ENT Care",

  alternates: {
    canonical: "/",
  },
  
  openGraph: {
    type: "website",
    siteName: "Dr. Mrudula ENT Care",
    title: "Dr. Mrudula ENT Care | Specialist ENT Care in Hyderabad",
    description:
      "Specialist ENT care for adults and children across ear, nose, throat, allergy, vertigo, balance and head & neck concerns in Hyderabad.",
    url: "/",
    images: [
      {
        url: "/images/brand/mrudula-ent-care-logo.png",
        width: 1200,
        height: 630,
        alt: "Dr. Mrudula ENT Care",
      },
    ],
  },
  twitter: {
  card: "summary_large_image",
  title: "Dr. Mrudula ENT Care | Specialist ENT Care in Hyderabad",
  description:
    "Specialist ENT care for adults and children across ear, nose, throat, allergy, vertigo, balance and head & neck concerns in Hyderabad.",
  images: ["/images/brand/mrudula-ent-care-logo.png"],
},

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}