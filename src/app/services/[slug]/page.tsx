// src/app/services/[slug]/page.tsx
//
// The ONLY service route. One dynamic segment renders all fifteen services —
// no per-service page file and no duplicated JSX anywhere.
//
//   slug in navigation.ts + has content  -> full ServicePage
//   slug in navigation.ts, no content    -> ServiceBanner "Coming Soon"
//   slug in neither                      -> 404

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchServiceMedia, getLogos } from "@/lib/sanity";
import { services } from "@/components/shared/nav/navigation";
import { getServiceContent } from "../_content";
import ServicePage from "../_components/ServicePage";
import ServiceBanner from "../ServiceBanner";

/** navigation.ts is the source of truth for which service routes exist. */
const NAV_SERVICES = services
  .filter((service) => service.href.startsWith("/services/"))
  .map((service) => ({
    slug: service.href.replace("/services/", ""),
    label: service.label,
  }));

function getNavService(slug: string) {
  return NAV_SERVICES.find((service) => service.slug === slug) ?? null;
}

export function generateStaticParams() {
  return NAV_SERVICES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const content = getServiceContent(slug);
  if (content) {
    return {
      title: content.meta.title,
      description: content.meta.description,
    };
  }

  const navService = getNavService(slug);
  return navService ? { title: navService.label } : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const navService = getNavService(slug);
  if (!navService) notFound();

  const content = getServiceContent(slug);

  // Listed in the nav but not written yet — same banner as before.
  if (!content) {
    return <ServiceBanner lines={[navService.label.toUpperCase()]} />;
  }

  const [media, logos] = await Promise.all([
    fetchServiceMedia(slug),
    getLogos(),
  ]);

  return <ServicePage content={content} media={media} logos={logos} />;
}