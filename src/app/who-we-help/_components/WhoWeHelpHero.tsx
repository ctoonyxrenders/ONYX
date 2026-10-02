// src/app/who-we-help/_components/WhoWeHelpHero.tsx
//
// Full-viewport image hero. AppWrapper offsets every page by --header-h; the
// negative margin pulls the image back up behind the transparent header, as
// on the home hero, and the matching padding keeps the text clear of it.
// Text sits on the left: at the bottom on mobile, vertically centred from lg.

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import { HEADING, BODY, SMALL } from "@/components/shared/typography";
import type { WhoWeHelpContent } from "../_types";
import Lines from "./Lines";

export default function WhoWeHelpHero({
  hero,
}: {
  hero: WhoWeHelpContent["hero"];
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] -mt-[var(--header-h)] pt-[var(--header-h)] items-end lg:items-center overflow-hidden">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="-z-10 object-cover"
      />

      {/* Flat black tint over the whole image, plus the home hero's gradient
          to darken the bottom-left further, where the text sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/40 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"
      />

      <div className="section w-full">
        <div className="max-w-xl xl:max-w-2xl text-white">
          <p className={`${SMALL} uppercase tracking-wider underline underline-offset-4 text-white/80`}>
            {hero.eyebrow}
          </p>

          <h1 className={`${HEADING} mt-4 md:mt-6 leading-tight`}>
            <Lines lines={hero.heading} />
          </h1>

          <p className={`${BODY} mt-6 text-white/85 text-justify`}>{hero.body}</p>

          <div className="mt-10 md:mt-12 flex flex-wrap gap-4">
            <Link
              href={hero.primaryCta.href}
              className="btn-pill btn-theme inline-flex justify-center hover:bg-[#0e3035]"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="btn-pill inline-flex justify-center border border-white text-white hover:bg-white hover:text-[#114046]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <p className={`${SMALL} mt-4 text-white/70`}>{hero.note}</p>
        </div>
      </div>
    </section>
  );
}
