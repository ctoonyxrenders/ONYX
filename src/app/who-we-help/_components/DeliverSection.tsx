// src/app/who-we-help/_components/DeliverSection.tsx
//
// Section B: label, heading, then a grid of cards, on the white page
// background. Same label/heading rhythm as Sections A and C.

import { HEADING, BODY } from "@/components/shared/typography";
import type { WhoWeHelpContent } from "../_types";
import SectionLabel from "./SectionLabel";
import Lines from "./Lines";

export default function DeliverSection({
  deliver,
}: {
  deliver: WhoWeHelpContent["deliver"];
}) {
  return (
    <section className="section bg-white">
      <SectionLabel label="What we deliver" />

      <h2 className={`${HEADING} mt-4 md:mt-6 leading-tight`}>
        <Lines lines={deliver.heading} />
      </h2>

      <ul className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {deliver.items.map((item) => (
          <li
            key={item.title}
            className="bg-white border border-light rounded-lg p-5 md:p-6"
          >
            <h3 className={`${BODY} font-bold`}>{item.title}</h3>
            <p className={`${BODY} mt-2 text-secondary text-justify`}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
