// src/components/shared/FooterCTA.tsx
//
// Full-bleed band that sits directly above LowerFooter. Server component.
// Uses standardized typography and button styles.
//
// Every page ends with this band; only the copy changes. Called with no props
// it renders the Home page copy. The first action is the solid white button,
// any further actions are white outlines.
//
// No overflow-hidden: the photograph is absolutely positioned, and leaving
// overflow visible lets the aspect-ratio box grow when a page's copy is
// longer than the band, instead of clipping it on narrow phones.

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";

export interface FooterCTAAction {
  label: string;
  href: string;
}

const BUTTON =
  "btn-pill inline-flex justify-center border border-white transition-colors text-xs lg:text-sm xl:text-base font-semibold min-w-[210px]";
const PRIMARY = "bg-white text-black hover:bg-transparent hover:text-white";
const SECONDARY = "bg-transparent text-white hover:bg-white hover:text-black";

export default function FooterCTA({
  eyebrow = "Now accepting · 05 projects for 2027",
  heading = ["Have a project, a brief,", "or a quiet ambition?"],
  body,
  actions = [{ label: "Book a Call", href: "/studio/#scheduleCall" }],
  note,
}: {
  /** Small uppercase line above the heading. */
  eyebrow?: string;
  /** Each entry renders on its own line. */
  heading?: string[];
  body?: string;
  actions?: FooterCTAAction[];
  /** Small line under the buttons. */
  note?: string;
}) {
  return (
    <section className="relative w-full aspect-[21/9] min-h-[420px] flex items-center justify-center">
      <Image
        src="/home/M.png"
        alt=""
        placeholder="blur"
        blurDataURL={blurDataURL}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Keeps the heading readable over any crop of the photograph. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

      {/* Fades the lower edge into LowerFooter's black background so the two
          sections read as one. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black"
      />

      <div className="relative z-10 text-center text-white px-6 xl:px-20 py-[var(--section-y)]">
        {eyebrow && (
          <p className="text-xs md:text-sm lg:text-base uppercase tracking-widest text-white/70 mb-6 md:mb-8">
            {eyebrow}
          </p>
        )}

        {/* Two spans with a gap rather than a <br />, matching how every other
            heading on the site breaks its lines. */}
        <h2
          className={`heading flex flex-col items-center gap-2 md:gap-4 ${
            body ? "mb-6 md:mb-8" : "mb-10 md:mb-14"
          }`}
        >
          {heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        {body && (
          <p className="text-small text-white/70 max-w-2xl mx-auto mb-10 md:mb-14">
            {body}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {actions.map((action, index) => (
            <Link
              key={action.label}
              href={action.href}
              className={`${BUTTON} ${index === 0 ? PRIMARY : SECONDARY}`}
            >
              {action.label}
            </Link>
          ))}
        </div>

        {note && (
          <p className="text-x-small text-white/70 mt-4 md:mt-6">{note}</p>
        )}
      </div>
    </section>
  );
}
