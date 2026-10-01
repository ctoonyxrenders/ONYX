// src/components/shared/BannerParallax.tsx
//
// Banner Parallax Wrapper Component
//
// Creates a scroll-driven parallax effect for animated banners/hero sections
// Banner moves slower than page scroll, creating premium layered depth effect
//
// Usage: Wrap your animated Banner component
// The entire banner will parallax as user scrolls

"use client";

import React, { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

interface BannerParallaxProps {
  children: ReactNode; // The Banner component to parallax
  offset?: number; // How much to move (default 60px)
  speed?: number; // Parallax speed factor (0.5 = 50% slower, 0.6 = 60% slower)
}

/**
 * Banner Parallax Component
 *
 * Wraps animated banner/hero components and applies scroll-driven parallax.
 * Banner moves slower than page scroll, creating premium depth effect.
 *
 * Example:
 * <BannerParallax offset={60} speed={0.5}>
 *   <Banner />
 * </BannerParallax>
 *
 * The Banner stays in its fixed position visually, but as user scrolls,
 * it moves slower than the page, creating the parallax "receding" effect.
 */
export function BannerParallax({
  children,
  offset = 60,
  speed = 0.5,
}: BannerParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Reduced motion check
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Track scroll progress - banner parallax is most noticeable near the top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 30%"], // Parallax active during first 30% of viewport
  });

  // Banner moves slower than page scroll (parallax effect)
  // Creates the "banner receding" effect as user scrolls
  const bannerY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, offset * speed] // Positive offset = moves down slightly
  );

  if (reducedMotion) {
    return <div ref={containerRef}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ y: bannerY }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default BannerParallax;