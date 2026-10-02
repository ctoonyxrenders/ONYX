// src/app/services/_components/ServicePage.tsx
//
// THE single service layout. Every service route renders this; only the
// content object and the Sanity media change between them.
export const revalidate = 3600;

import type { ServiceContent, ServiceMedia } from "../_types";
import * as placeholders from "../_placeholders";

import ServiceHero from "./ServiceHero";
import ServiceSlider from "./ServiceSlider";
import Logos from "./Logos";
import ServiceGrid from "./ServiceGrid";
import HowWeWork from "./HowWeWork";
import Faqs from "./Faqs";
import AboutService from "./AboutService";
import ScheduleCall from "@/components/shared/ScheduleCall";
import FooterCTA from "@/components/shared/FooterCTA";

export default function ServicePage({
  content,
  media,
  logos,
}: {
  content: ServiceContent;
  media: ServiceMedia;
  logos: { logo: string }[];
}) {
  // Resolved per field, so a partially filled Sanity document still renders.
  const slider = media.slider.length ? media.slider : placeholders.slider;
  const grid = media.grid.length ? media.grid : placeholders.grid;

  return (
    <>
      <ServiceHero hero={content.hero} exploreHeading={content.exploreHeading} />

      <ServiceSlider slides={slider} />

      <Logos logos={logos} />

      <ServiceGrid images={grid} viewMoreLabel={content.viewMoreLabel} />

      <HowWeWork
        content={content.howWeWork}
        video={media.processVideo}
        images={media.processImages}
        placeholderVideoPoster={placeholders.videoPoster}
        placeholderImages={placeholders.processImages}
      />

      {/* Spacing lives here rather than inside the component, so ScheduleCall
          renders unchanged on the Studio page. section-y follows the shared
          rhythm; outer margins here used to double up with the neighbours'. */}
      <div className="section-y">
        <ScheduleCall />
      </div>

      <Faqs items={content.faqs} />

      <AboutService about={content.about} />

      {/* The site-wide closing band, with this service's CTA copy. An empty
          eyebrow hides the Home page's default line. */}
      <FooterCTA
        eyebrow=""
        heading={[content.cta.heading]}
        actions={[
          { label: content.cta.primaryLabel, href: content.cta.primaryHref },
          ...(content.cta.secondaryLabel && content.cta.secondaryHref
            ? [{ label: content.cta.secondaryLabel, href: content.cta.secondaryHref }]
            : []),
        ]}
      />
    </>
  );
}