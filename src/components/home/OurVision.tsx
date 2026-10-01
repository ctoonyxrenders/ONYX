// src/components/home/OurVision.tsx
//
// Full-bleed vision statement. Server component — no state, no client JS.
// Uses standardized typography system with proper 4K scaling.

import Image from "next/image";
import { blurDataURL } from "@/constants";

export default function OurVision() {
  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/home/W.png"
        alt=""
        placeholder="blur"
        blurDataURL={blurDataURL}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Darkens the photograph so the statement stays readable over any crop. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

      {/* Still centred, then shifted up and right from that position.
          The offsets only apply from lg — on smaller screens there isn't
          room to give away. */}
      <div className="relative z-10 text-center text-white px-5 md:px-12 py-20 lg:-translate-y-12 lg:translate-x-32">
        <p className="text-x-small tracking-[0.3em] uppercase text-white/70">
          Our Vision
        </p>

        {/* Width caps scale on 4K */}
        <h2 className="heading mt-6 max-w-4xl mx-auto">
          We don&apos;t just visualize spaces.
          <br />
          We bring ideas to life.
        </h2>

        <p className="text-small text-white/80 mt-8 max-w-2xl mx-auto">
          Our vision is for every project to carry its original purpose through
          every stage of design. We bring architecture, interiors, and
          visualization into one continuous conversation—where how a space
          works, how it feels, and how it is seen are considered together.
        </p>

        <p className="text-x-small text-white/60 mt-10">— OnyxRenders</p>
      </div>
    </section>
  );
}