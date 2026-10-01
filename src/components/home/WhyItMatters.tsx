// src/components/home/WhyItMatters.tsx
// OPTIMIZED: Universal padding standard applied

import Image from "next/image";
import { blurDataURL } from "@/constants";
import { HEADING, BODY, SMALL } from "@/components/shared/typography";

interface Problem {
  number: string;
  title: string;
  body: string;
  image: string;
  caption: string;
}

const problems: Problem[] = [
  {
    number: "01",
    title: "Buyers delay",
    body: "Off-plan units sit unsold when investors can't picture the finished project.",
    image: "/home/drawing/buyers.webp",
    caption: "Images create confidence",
  },
  {
    number: "02",
    title: "Pitches fall flat",
    body: "Strong designs lose approvals and competitions to ones that are presented better.",
    image: "/home/drawing/pitches.webp",
    caption: "The same design presented better",
  },
  {
    number: "03",
    title: "Changes get expensive",
    body: "Clients spot what they dislike after it's built, when fixing it is costly.",
    image: "/home/drawing/changes.webp",
    caption: "Changes cost more",
  },
];

function columnPadding(i: number) {
  if (i === 0) return "md:pr-6 lg:pr-8";
  if (i === problems.length - 1) return "md:pl-6 lg:pl-8";
  return "md:px-6 lg:px-8";
}

export default function WhyItMatters() {
  return (
    <section className="section">
      {/* HEADING + DESCRIPTION */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 md:gap-12">
        <h2 className={`${HEADING} lg:w-1/2 flex flex-col gap-2 md:gap-4 [word-spacing:0.15em]`}>
          <span>Drawings don&apos;t sell.</span>
          <span>Images do.</span>
        </h2>

        <div className="lg:w-1/2 lg:border-l lg:border-black/15 lg:pl-12 xl:pl-16">
          <p className={`${BODY} text-justify hyphens-auto max-w-md `}>
            Most people can&apos;t read a floor plan. When they can&apos;t picture the result, they hesitate, and hesitation costs you.
          </p>
        </div>
      </div>

      <hr className="border-black/15 mt-12 md:mt-16" />

      {/* PROBLEMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-black/15 mt-12 md:mt-16">
        {problems.map((problem, i) => (
          <div key={problem.title} className={`flex flex-col pb-10 md:pb-0 ${columnPadding(i)}`}>
            <div className="flex items-start gap-5">
              <span aria-hidden="true" className={`${HEADING} text-black/20 shrink-0`}>
                {problem.number}
              </span>

              <div className="border-l border-black/15 pl-5">
                <h3 className={`${BODY} font-bold`}>{problem.title}</h3>
                <p className={`${BODY} mt-2 `}>{problem.body}</p>
              </div>
            </div>

            <figure className="mt-auto pt-8">
              <div className="relative w-full aspect-video overflow-hidden bg-[#bac3c833] rounded-lg">
                <Image
                  src={problem.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <figcaption className={`${SMALL} uppercase tracking-[0.15em] text-center mt-3 `}>
                {problem.caption}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}