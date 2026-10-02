// src/app/who-we-help/_components/ProcessSection.tsx
//
// Section C: label, heading, four ruled steps, then the before/after pair in
// the Home page's drag-to-compare slider. The frame keeps the size the pair
// had as two side-by-side 4:3 images (8:3 from sm); on phones, where the pair
// used to stack, it is a single 4:3 frame.

import CompareSlider from "@/components/shared/CompareSlider";
import { HEADING, SMALL } from "@/components/shared/typography";
import type { WhoWeHelpContent } from "../_types";
import SectionLabel from "./SectionLabel";
import NumberedList from "./NumberedList";
import Lines from "./Lines";

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
        <CompareSlider
          before={comparison.before}
          after={comparison.after}
          label="Compare before and after"
          sizes="100vw"
          className="aspect-[4/3] sm:aspect-[8/3] rounded-lg"
        />
        <figcaption className={`${SMALL} mt-3 md:mt-4 text-secondary`}>
          {comparison.caption}
        </figcaption>
      </figure>
    </section>
  );
}
