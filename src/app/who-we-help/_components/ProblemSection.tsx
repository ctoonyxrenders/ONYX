// src/app/who-we-help/_components/ProblemSection.tsx
//
// Section A: label, heading, three numbered points and one wide image.
// Spacing is the shared .section rhythm; no outer margins.

import Image from "next/image";
import { blurDataURL } from "@/constants";
import { HEADING } from "@/components/shared/typography";
import type { WhoWeHelpContent } from "../_types";
import SectionLabel from "./SectionLabel";
import NumberedList from "./NumberedList";
import Lines from "./Lines";

export default function ProblemSection({
  problem,
}: {
  problem: WhoWeHelpContent["problem"];
}) {
  return (
    <section className="section bg-white">
      <SectionLabel label="The problem" />

      <h2 className={`${HEADING} mt-4 md:mt-6 leading-tight`}>
        <Lines lines={problem.heading} />
      </h2>

      <div className="mt-10 md:mt-14">
        <NumberedList items={problem.points} divided />
      </div>

      {/* Taller on mobile so the image still reads at narrow widths. */}
      <div className="relative mt-10 md:mt-14 w-full aspect-[16/9] md:aspect-[21/8] overflow-hidden rounded-lg bg-subtle">
        <Image
          src={problem.image.src}
          alt={problem.image.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover"
        />
      </div>
    </section>
  );
}
