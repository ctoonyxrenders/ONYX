// src/components/home/StickyBannerWithCoveringContent.tsx
//
// The banner sticks to the top of the page and the content sections scroll
// up over it, then scrolling continues normally.

"use client";

import React, { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

interface StickyBannerWithCoveringContentProps {
  banner: ReactNode;
  children: ReactNode;
}

export function StickyBannerWithCoveringContent({
  banner,
  children,
}: StickyBannerWithCoveringContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.05 });

  return (
    <div className="relative w-full">
      {/* STICKY BANNER */}
      <div className="sticky top-0 z-10 w-full">
        {banner}
      </div>

      {/* CONTENT - covers the banner as it scrolls up */}
      <div className="relative w-full z-20 bg-white">
        <motion.div
          ref={contentRef}
          className="relative w-full bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0,
          }}
        >
          <div className="bg-white">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StickyBannerWithCoveringContent;
