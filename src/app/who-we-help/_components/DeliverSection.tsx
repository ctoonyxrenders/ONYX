// src/app/who-we-help/_components/DeliverSection.tsx
//
// Section B: label, then heading (bottom-left) beside an image, then a grid of
// cards, on the white page background.

import Image from "next/image";
import { blurDataURL } from "@/constants";
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

      <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20">
        <h2 className={`${HEADING} leading-tight lg:self-end`}>
          <Lines lines={deliver.heading} />
        </h2>

        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-subtle">
          <Image
            src={deliver.image.src}
            alt={deliver.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
        </div>
      </div>

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
