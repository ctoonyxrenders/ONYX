import React from "react";

/**
 * Oversized page banner, matching the Portfolio / Academy banners.
 *
 * The Portfolio heading is hand-tuned: "PORTFOLIO" (9 chars) at 20.8vw.
 * That ratio (9 x 20.8 = 187) is reused here to size the type from the longest
 * line, so any title fills the viewport width without overflowing it.
 *
 * Letter widths vary, so the calculation is an approximation: pass `size` or
 * `tracking` to fine-tune a specific page.
 */
const WIDTH_FACTOR = 187;
const DEFAULT_TRACKING = "-0.03em";

interface ServiceBannerProps {
  lines: string[];
  /** Font-size override, e.g. "18vw". */
  size?: string;
  /** Letter-spacing override, e.g. "-0.05em" to pull a long word in. */
  tracking?: string;
}

export default function ServiceBanner({ lines, size, tracking }: ServiceBannerProps) {
  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = size ?? `${(WIDTH_FACTOR / longest).toFixed(1)}vw`;

  return (
    <section className="overflow-hidden">
      <h1
        className="text-[#B9B9B933] leading-none text-center"
        style={{ fontSize, letterSpacing: tracking ?? DEFAULT_TRACKING }}
      >
        {lines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h1>
      <h3 className="poppins text-4xl font-thin !leading-loose text-center mt-5 heading">
        Coming Soon
      </h3>
    </section>
  );
}