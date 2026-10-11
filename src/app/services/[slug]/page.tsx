import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import ServicePage from "@/components/services/ServicePage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.introduction,
  };
}

export default async function ServiceRoute({
  params,
}: Props) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return <ServicePage service={service} />;
}