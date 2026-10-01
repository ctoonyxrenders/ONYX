// src/app/services/_components/HowWeWorkGallery.tsx
import Image from "next/image";
import { blurDataURL } from "@/constants";
import type { ImageItem } from "@/lib/sanity";
import type { ProcessStep } from "../_types";

/**
 * Four 4:3 images in one row on desktop, 2x2 on tablet, stacked on mobile.
 *
 * The row is staggered: columns 1 and 3 put their text above the image,
 * columns 2 and 4 below it, so the images sit at alternating heights. The
 * stagger only applies from `lg` up, where all four share a row — below that
 * every card reads image-then-text.
 */
export default function HowWeWorkGallery({
  steps,
  images,
  placeholders,
}: {
  steps: readonly ProcessStep[];
  images: ImageItem[];
  placeholders: ImageItem[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 items-start">
      {steps.map((step, i) => {
        // Steps drive the length — a missing image falls back rather than
        // dropping the step.
        const image = images[i] ?? placeholders[i];
        const textFirst = i % 2 === 0;

        return (
          <figure key={step.title} className="flex flex-col">
            <div
             className={`relative w-full aspect-[4/5] overflow-hidden bg-[#bac3c833]  ${
                textFirst ? "order-1 lg:order-2" : "order-1"
              }`}
            >
              {image && (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              )}
            </div>

            <figcaption
              className={
                textFirst
                  ? "order-2 lg:order-1 mt-4 lg:mt-0 lg:mb-6"
                  : "order-2 mt-4"
              }
            >
              <h3 className="text-small text-[#114046] font-normal">
                {step.title}
              </h3>
              <p className="text-x-small text-[#7D7D7D] mt-2">
                {step.body}
              </p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}