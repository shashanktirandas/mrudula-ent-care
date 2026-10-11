import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { conditions } from "@/data/conditions";
import ConditionPage from "@/components/conditions/ConditionPage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const condition = conditions.find(
    (item) => item.slug === slug
  );

  if (!condition) {
    return {};
  }

  return {
    title: condition.title,
    description: condition.introduction,
  };
}

export default async function ConditionRoute({
  params,
}: Props) {
  const { slug } = await params;

  const condition = conditions.find(
    (item) => item.slug === slug
  );

  if (!condition) {
    notFound();
  }

  return <ConditionPage condition={condition} />;
}