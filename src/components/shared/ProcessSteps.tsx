// src/components/shared/ProcessSteps.tsx
//
// Four staggered process steps. Columns 1 and 3 put their text below the
// image, columns 2 and 4 above it, so the images sit at alternating heights.
// The stagger applies from lg up, where all four share a row — below that
// every card reads image-then-text.
//
// Shared across Home and the service pages. Images come from the data, so a
// page supplies its own steps without duplicating any layout.

import Image from "next/image";
import { blurDataURL } from "@/constants";
import { HEADING, BODY } from "@/components/shared/typography";
import Highlight from "@/components/shared/Highlight";

export interface ProcessStep {
  title: string;
  body: string;
  image: string;
  alt: string;
}

export default function ProcessSteps({
  steps,
  heading,
  intro,
  aspect = "aspect-[4/5]",
}: {
  steps: readonly ProcessStep[];
  /**
   * Use \n for a line break and [brackets] to highlight words, e.g.
   * "From drawings to final\nimages in [four steps]".
   */
  heading?: string;
  intro?: string;
  /** Per-page override — the service pages and Home use different ratios. */
  aspect?: string;
}) {
  return (
    <section className="px-6 md:px-16 lg:px-20 section-y">
      {(heading || intro) && (
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 md:gap-8 lg:gap-24 xl:gap-32 mb-12 md:mb-20">
          {heading && (
            <h2 className={`${HEADING} lg:w-1/2 flex flex-col gap-2 md:gap-4 tracking-wide leading-[1.15]`}>
              {heading.split("\n").map((line) => (
                <span key={line}>
                  <Highlight text={line} />
                </span>
              ))}
            </h2>
          )}
          {intro && (
            <p className={`${BODY} max-w-md`}>
              {intro}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 items-start">
        {steps.map((step, i) => {
          const textFirst = i % 2 === 0;

          return (
            <figure key={step.title} className="flex flex-col">
              <div
                className={`relative w-full ${aspect} overflow-hidden bg-[#bac3c833] ${
                  textFirst ? "order-1 lg:order-2" : "order-1"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>

              <figcaption
                className={
                  textFirst
                    ? "order-2 lg:order-1 mt-4 lg:mt-0 lg:mb-6"
                    : "order-2 mt-4"
                }
              >
                <h3 className={`${BODY} font-normal text-[#114046]`}>{step.title}</h3>
                <p className={`${BODY} mt-2 `}>{step.body}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}