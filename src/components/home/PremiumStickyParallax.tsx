// src/components/home/PremiumStickyParallax.tsx
//
// Premium sticky parallax transition inspired by Heed scrolling behavior
//
// Behavior:
// 1. Hero visible with subtle animations as user scrolls
// 2. Existing content layer rises from below (sticky transition)
// 3. Content feels like a new page/layer coming forward
// 4. Hero subtly recedes (scale down, translate up, slight opacity fade)
// 5. Once transition completes, normal scrolling continues
// 6. All existing sections remain in natural document flow

"use client";

import React, { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

interface PremiumStickyParallaxProps {
  hero: ReactNode;
  children: ReactNode;
}

/**
 * Premium Sticky Parallax Component
 *
 * Creates a cinematic scrolling experience similar to premium agency sites.
 *
 * Hero Behavior:
 * - Subtly translates upward as user scrolls
 * - Gradually scales down (not too aggressively)
 * - Slight opacity reduction to feel like receding
 *
 * Content Layer Behavior:
 * - Rises from below viewport
 * - Sticky positioning during transition
 * - Subtle shadow/depth effect
 * - Once fully entered, normal scrolling continues
 *
 * All existing sections remain in natural document flow with their original heights.
 */
export function PremiumStickyParallax({
  hero,
  children,
}: PremiumStickyParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll progress: tracks transition from Hero to Content
  // 0 = Hero fully visible, 1 = Transition complete
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 50%"],
  });

  // Check for reduced motion accessibility preference
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ═══════════════════════════════════════════════════════════
  // HERO ANIMATIONS - Subtle receding effect
  // ═══════════════════════════════════════════════════════════

  // Hero moves up slightly
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Hero scales down slightly (remains mostly at normal size)
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Hero fades slightly (becomes more translucent)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.7]);

  // ═══════════════════════════════════════════════════════════
  // CONTENT LAYER ANIMATIONS - Rising from below
  // ═══════════════════════════════════════════════════════════

  // Content layer rises from below viewport
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Content layer fades in smoothly
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.6, 1]);

  // Shadow depth effect - layer appears to have elevation
  const contentShadow = useTransform(scrollYProgress, [0, 0.4, 1], [
    "0px 0px 0px rgba(0,0,0,0)",
    "0px -40px 80px rgba(0,0,0,0.15)",
    "0px -15px 40px rgba(0,0,0,0.08)",
  ]);

  // Optional subtle scale on content layer for depth
  const contentScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  // ═══════════════════════════════════════════════════════════
  // ACCESSIBILITY - No animations if prefers-reduced-motion
  // ═══════════════════════════════════════════════════════════

  if (reducedMotion) {
    return (
      <div ref={containerRef} className="relative w-full">
        {hero}
        <div className="relative w-full bg-white">{children}</div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER - Sticky parallax transition
  // ═══════════════════════════════════════════════════════════

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
          Recedes as user scrolls (moves up, scales down, fades)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        ref={heroRef}
        style={{
          y: heroY,
          scale: heroScale,
          opacity: heroOpacity,
          transformOrigin: "center center",
        }}
        className="relative w-full will-change-transform"
      >
        {hero}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          STICKY CONTENT LAYER
          Rises from below, feels like new page entering
          All sections inside maintain natural heights
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          boxShadow: contentShadow,
          scale: contentScale,
        }}
        className="sticky top-0 w-full bg-white will-change-transform z-20"
      >
        {/* Subtle gradient overlay for premium depth effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.5) 0%, transparent 60%)",
          }}
        />

        {/* ─────────────────────────────────────────────────────────────
            ALL EXISTING CONTENT
            Maintains natural document flow and heights
            No artificial constraints or animations
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full">{children}</div>
      </motion.div>
    </div>
  );
}

export default PremiumStickyParallax;