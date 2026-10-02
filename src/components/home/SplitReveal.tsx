// src/components/home/SplitReveal.tsx
// OPTIMIZED: Consistent universal padding, responsive sizing

import Link from "next/link";
import CompareSlider from "@/components/shared/CompareSlider";

const BEFORE_IMAGE = "/home/before.webp";
const AFTER_IMAGE = "/home/after.webp";

const points = [
  "Quote within 24 hours",
  "[1100+] projects delivered",
  "Clients in [30+] countries",
  "NDA on request",
];

const START = 25;

function Point({ text }: { text: string }) {
  const parts = text.split(/\[(.+?)\]/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-bold text-[#114046]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function SplitReveal() {
  return (
    <section className="section">
      <div className="flex flex-col lg:flex-row lg:items-center gap-12 md:gap-16 lg:gap-20">
        {/* COPY */}
        <div className="w-full lg:w-[45%]">
          <h2 className="heading flex flex-col gap-3 md:gap-5 [word-spacing:0.025em] tracking-wide max-w-2xl">
            <span>
              From first <span className="font-bold text-[#4a5f66]">Sketch</span> to
            </span>
            <span>
              final <span className="font-bold text-[#4a5f66]">Sale.</span>
            </span>
          </h2>

          <p className="text-x-small text-[#4a5f66] tracking-[0.25em] uppercase mt-4 md:mt-6">
            Designed. Modeled. Rendered. Sold.
          </p>

          <p className="text-small text-justify hyphens-auto mt-6 md:mt-8 max-w-md">
            Photorealistic renders, animations, and immersive experiences that win approvals, impress clients, and sell projects off-plan, backed by a design and BIM team that knows how buildings are made.
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-10">
            <Link href="/studio/#scheduleCall">
              <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
                Request a proposal
              </button>
            </Link>
            <Link href="/gallery">
              <button className="btn-pill border border-[#114046]  hover:bg-[#114046] hover:text-white">
                Explore our Work
              </button>
            </Link>
          </div>

          {/* STATS */}
          <ul className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-6 mt-10 md:mt-12">
            {points.map((point) => (
              <li key={point} className="text-small">
                <span aria-hidden="true" className="text-[#114046] mr-2">
                  ✓
                </span>
                <Point text={point} />
              </li>
            ))}
          </ul>
        </div>

        {/* COMPARISON */}
        <div className="relative w-full lg:w-[55%]">
          <CompareSlider
            before={{ src: BEFORE_IMAGE, alt: "Clay model" }}
            after={{ src: AFTER_IMAGE, alt: "Final render" }}
            label="Compare clay model with final render"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="aspect-[4/3] rounded-xl"
            start={START}
          />

          <p className="text-x-small font-light mt-4 md:mt-6">
            Click or drag to see how a model becomes a selling image.
          </p>
        </div>
      </div>
    </section>
  );
}