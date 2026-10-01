// src/components/shared/FooterCTA.tsx
//
// Full-bleed band that sits directly above LowerFooter. Server component.
// Uses standardized typography and button styles.

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";

export default function FooterCTA() {
  return (
    <section className="relative w-full aspect-[21/9] min-h-[420px] flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 text-center text-white px-6 xl:px-20">
        <p className="text-xs md:text-sm lg:text-base uppercase tracking-widest text-white/70 mb-6 md:mb-8">
          Now accepting · 05 projects for 2027
        </p>

        {/* Two spans with a gap rather than a <br />, matching how every other
            heading on the site breaks its lines. */}
        <h2 className="heading flex flex-col items-center gap-2 md:gap-4 mb-10 md:mb-14">
          <span>Have a project, a brief,</span>
          <span>or a quiet ambition?</span>
        </h2>

        <Link href="/studio/#scheduleCall">
          <button className="btn-pill bg-white text-black border border-white hover:bg-transparent hover:text-white transition-colors text-xs lg:text-sm xl:text-base font-semibold min-w-[210px]">
            Book a Call
          </button>
        </Link>
      </div>
    </section>
  );
}