// src/app/who-we-help/_components/FaqSection.tsx
//
// Section E: label and heading on the left, questions on the right from lg.
// Each question is the Home page accordion item, unchanged, with the Home
// page's spacing between items, so both FAQ lists look identical.

import FAQ from "@/components/home/FAQ";
import { HEADING } from "@/components/shared/typography";
import type { WhoWeHelpContent } from "../_types";
import SectionLabel from "./SectionLabel";
import Lines from "./Lines";

export default function FaqSection({
  faqs,
}: {
  faqs: WhoWeHelpContent["faqs"];
}) {
  return (
    <section className="section bg-white grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20">
      <div className="lg:col-span-5">
        <SectionLabel label="Questions" />
        <h2 className={`${HEADING} mt-4 md:mt-6 leading-tight`}>
          <Lines lines={faqs.heading} />
        </h2>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
        {faqs.items.map((item) => (
          <FAQ key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
