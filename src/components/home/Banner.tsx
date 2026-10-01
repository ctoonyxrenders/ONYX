// src/components/home/Banner.tsx
// OPTIMIZED: Consistent padding, responsive sizing

import React from "react";

export default function Banner() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src="/home/Banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-gray-200"
      />

      {/* Gradient overlay for readability */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/35 to-black/10" />

      {/* Same gutters and vertical rhythm as every standard section */}
      <div className="relative h-full flex flex-col justify-end section">
        {/* HEADING */}
        <h1 className="heading text-white leading-[1.05] tracking-wide max-w-4xl">
          <span className="block font-light">We make ideas</span>
          <span className="block font-bold">impossible to ignore.</span>
        </h1>

        {/* Caption line */}
        <div className="flex items-center gap-4 md:gap-6 mt-6 md:mt-8">
          <span aria-hidden="true" className="h-px w-10 md:w-16 bg-white/70" />
          <p className="text-x-small md:text-small text-white/80 tracking-[0.25em] uppercase">
            Architecture · Visualization · Digital Experiences
          </p>
        </div>
      </div>
    </div>
  );
}