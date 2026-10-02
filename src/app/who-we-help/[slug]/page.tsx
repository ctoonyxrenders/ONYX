// src/app/who-we-help/[slug]/page.tsx
//
// The ONLY Who We Help route. One dynamic segment renders every audience.
//
//   slug in navigation.ts + has content  -> full WhoWeHelpPage
//   slug in navigation.ts, no content    -> ServiceBanner "Coming Soon"
//   slug in neither                      -> 404

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { navItems } from "@/components/shared/nav/navigation";
import { getWhoWeHelpContent } from "../_content";
import WhoWeHelpPage from "../_components/WhoWeHelpPage";
import ServiceBanner from "../../services/ServiceBanner";

/** navigation.ts is the source of truth for which audience routes exist. */
const NAV_AUDIENCES = navItems
  .flatMap((item) => (item.menu === "cards" ? item.cards : []))
  .filter((card) => card.href.startsWith("/who-we-help/"))
  .map((card) => ({
    slug: card.href.replace("/who-we-help/", ""),
    label: card.label,
  }));

function getNavAudience(slug: string) {
  return NAV_AUDIENCES.find((audience) => audience.slug === slug) ?? null;
}

export function generateStaticParams() {
  return NAV_AUDIENCES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const content = getWhoWeHelpContent(slug);
  if (content) {
    return {
      title: content.meta.title,
      description: content.meta.description,
    };
  }

  const navAudience = getNavAudience(slug);
  return navAudience ? { title: navAudience.label } : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const navAudience = getNavAudience(slug);
  if (!navAudience) notFound();

  const content = getWhoWeHelpContent(slug);

  // Listed in the nav but not written yet.
  if (!content) {
    return <ServiceBanner lines={[navAudience.label.toUpperCase()]} />;
  }

  return <WhoWeHelpPage content={content} />;
}
