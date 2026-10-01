// src/components/home/LogoMarquee.tsx
//
// Animated logo carousel with heading. Server component — data fetched from Sanity.
// Displays "Trusted by 225+ clients" heading and rotating logos in 3 rows, alternating direction.

import React from "react";
import Image from "next/image";
import styles from "./home.module.css";
import { getLogos } from "@/lib/sanity";

type Logo = { logo: string };

const ROW_COUNT = 3;
const CLIENT_COUNT = 225;

/**
 * Distributes items across rows, spreading remainder evenly.
 * 35 logos across 3 rows: 12 / 12 / 11 (not stranded singles).
 */
function distribute<T>(items: T[], rowCount: number): T[][] {
  const rows: T[][] = [];
  const base = Math.floor(items.length / rowCount);
  const remainder = items.length % rowCount;

  let cursor = 0;
  for (let i = 0; i < rowCount; i++) {
    const size = base + (i < remainder ? 1 : 0);
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows.filter((row) => row.length > 0);
}

const LogoMarquee = async () => {
  const logos: Logo[] = await getLogos();
  const rows = distribute(logos, ROW_COUNT);

  return (
    <section className="pt-4 md:pt-3 lg:pt-4">
      {/* Section heading */}
      <div className="w-9/12 mx-auto px-6 md:px-0">
        <h2 className="heading text-center max-w-4xl mx-auto">
          Trusted by{" "}
          <span className="font-bold text-[#114046]">{CLIENT_COUNT}+</span>{" "}
          clients, developers, and project teams
        </h2>
      </div>

      {/* Animated logo carousel — 3 rows, alternating direction.
          Each row is tripled so the -33.333% translate wraps seamlessly.
          From 3xl, sizes in vw keep desktop proportions at 4K. */}
      <div className="my-10 md:my-16 lg:my-20 flex flex-col gap-3 md:gap-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="overflow-x-hidden">
            <div
              style={{
                animationDuration: "80s",
                animationDirection: rowIdx % 2 === 1 ? "reverse" : "normal",
              }}
              className={`flex w-fit items-center gap-6 md:gap-8 ${styles.slider}`}
            >
              {[...row, ...row, ...row].map((item, idx) => (
                <div
                  key={idx}
                  className="relative h-16 md:h-28 aspect-square shrink-0"
                >
                  <Image
                    src={item.logo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 64px, (max-width: 2048px) 110px, 8vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;