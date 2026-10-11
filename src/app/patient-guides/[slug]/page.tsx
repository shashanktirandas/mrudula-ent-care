import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import GuidePage from "@/components/guides/GuidePage";

interface GuideRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuideRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.introduction,
  };
}

export default async function GuideRoute({
  params,
}: GuideRouteProps) {
  const { slug } = await params;

  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  return <GuidePage guide={guide} />;
}