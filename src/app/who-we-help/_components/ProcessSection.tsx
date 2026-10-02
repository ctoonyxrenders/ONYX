// src/app/who-we-help/_components/ProcessSection.tsx
//
// Section C: label, heading, four ruled steps, then a before/after pair shown
// as one frame. The pair stacks on mobile and sits side by side from sm.

import Image from "next/image";
import { blurDataURL } from "@/constants";
import { HEADING, SMALL } from "@/components/shared/typography";
import type { ContentImage, WhoWeHelpContent } from "../_types";
import SectionLabel from "./SectionLabel";
import NumberedList from "./NumberedList";
import Lines from "./Lines";

function ComparisonImage({ image }: { image: ContentImage }) {
  return (
    <div className="relative aspect-[4/3]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  );
}

export default function ProcessSection({
  process,
}: {
  process: WhoWeHelpContent["process"];
}) {
  const { comparison } = process;

  return (
    <section className="section bg-white">
      <SectionLabel label="How it works" />

      <h2 className={`${HEADING} mt-4 md:mt-6 leading-tight`}>
        <Lines lines={process.heading} />
      </h2>

      <div className="mt-10 md:mt-14">
        <NumberedList items={process.steps} columns={4} ruled />
      </div>

      <figure className="mt-10 md:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-lg bg-subtle">
          <ComparisonImage image={comparison.before} />
          <ComparisonImage image={comparison.after} />
        </div>
        <figcaption className={`${SMALL} mt-3 md:mt-4 text-secondary`}>
          {comparison.caption}
        </figcaption>
      </figure>
    </section>
  );
}
