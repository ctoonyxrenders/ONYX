"use client";
// src/app/services/_components/ServiceSlider.tsx
import { blurDataURL } from "@/constants";
import type { ImageItem } from "@/lib/sanity";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 6000;

export default function ServiceSlider({ slides }: { slides: ImageItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const timer = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index, paused, reduceMotion, slides.length, go]);

  if (!slides.length) return null;

  const active = slides[index];

  return (
    <section
      className="px-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fixed 16:9 at every breakpoint. */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#bac3c833]">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.url}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
          >
            <Image
              src={active.url}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#114046] transition-colors"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#114046] transition-colors"
            >
              &rsaquo;
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((slide, i) => (
            <button
              key={slide.url}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              className={`h-[2px] transition-all duration-300 ${
 i === index
 ? "w-10 bg-[#114046]"
 : "w-4 bg-[#7D7D7D]/40 hover:bg-[#7D7D7D]"
 }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}