// src/hooks/useParallax.ts
//
// Reusable scroll-based parallax animations using Framer Motion.
// Provides hooks for different parallax effects with mobile optimization.

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Base parallax hook - track scroll position of an element
 */
export function useParallaxScroll(offset = 0.5) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * offset, -100 * offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { ref, y, opacity, scrollYProgress };
}

/**
 * Parallax for background/hero - slower movement
 */
export function useHeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });

  // Subtle movement - only moves 20% of scroll distance
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return { ref, y, scrollYProgress };
}

/**
 * Parallax for section entrance - fade in + subtle movement
 */
export function useSectionReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return { ref, opacity, y, scrollYProgress };
}

/**
 * Parallax for layered depth effect - different speeds per layer
 */
export function useLayeredParallax(speedFactor = 0.8) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slower movement = depth effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * speedFactor, -100 * speedFactor]
  );

  return { ref, y, scrollYProgress };
}

/**
 * Utility: Check if user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Mobile-optimized parallax - reduces effect intensity on small screens
 */
export function useResponsiveParallax(
  desktopIntensity = 100,
  mobileIntensity = 20
) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // On mobile, use reduced intensity
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const intensity = isMobile ? mobileIntensity : desktopIntensity;

  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);

  return { ref, y, scrollYProgress };
}