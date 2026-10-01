"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "@/icons";
import { blurDataURL } from "@/constants";
import { BODY, SMALL } from "@/components/shared/typography";

export interface TestimonialCard {
  name: string;
  designation: string;
  review: string;
  imgUrl: string;
  logoUrl: string;
}

const VISIBLE = 5;

/** Five stars, built once rather than on every render. */
const STARS = [0, 1, 2, 3, 4];

/** Prev / next page buttons share every class. */
const NAV_BUTTON =
  "w-10 h-10 rounded-full border border-[#114046] text-[#114046] hover:bg-[#114046] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#114046]";

/** Splits reviews into pages; the last page may be shorter. */
function paginate<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export default function TestimonialAccordion({
  items,
}: {
  items: TestimonialCard[];
}) {
  const [page, setPage] = useState(0);
  // Kept per page so returning to a page restores what was open there, and so
  // nothing collapses mid-slide.
  const [activeByPage, setActiveByPage] = useState<Record<number, number>>({});

  if (!items.length) return null;

  const pages = paginate(items, VISIBLE);
  const canPage = pages.length > 1;

  return (
    <div className="relative">
      {/* Viewport clips the track; the track holds every page side by side and
          slides horizontally. */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageItems, pageIdx) => {
            const active = activeByPage[pageIdx] ?? 0;

            return (
              <div
                key={pageIdx}
                aria-hidden={pageIdx !== page}
                // Height stays in vh at every desktop size. A fixed 3xl height
                // let width outgrow it, turning panels landscape at 4K and
                // cropping the tops of the portraits.
                className="w-full shrink-0 flex flex-col lg:flex-row gap-2 h-[700px] lg:h-[75vh]"
              >
                {pageItems.map((item, i) => {
                  const isActive = i === active;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      tabIndex={pageIdx === page ? 0 : -1}
                      onClick={() =>
                        setActiveByPage((prev) => ({ ...prev, [pageIdx]: i }))
                      }
                      aria-label={`Read ${item.name}'s review`}
                      aria-expanded={isActive}
                      className={`relative overflow-hidden text-left transition-[flex-grow] duration-700 ease-in-out ${
                        isActive ? "grow-[3]" : "grow hover:grow-[1.4]"
                      }`}
                      style={{ flexBasis: 0 }}
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        className={`object-cover object-[50%_40%] transition-[filter] duration-700 ${
                          isActive ? "grayscale-0" : "grayscale"
                        }`}
                      />

                      {/* Two layers: a constant dim, plus a gradient that fades
                          in when open. A single layer swapping backgrounds
                          can't animate, so the change used to snap. */}
                      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/20 transition-opacity duration-700 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 flex flex-col justify-between p-5 text-white transition-opacity duration-500 ${
 isActive ? "opacity-100 delay-200" : "opacity-0"
 }`}
                      >
                        {/* Name and logo share one row, so their top edges
                            align rather than being positioned separately. */}
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <h3 className={`${SMALL} uppercase tracking-wider`}>
                              {item.name}
                            </h3>
                            <p className={`${SMALL} text-white/60 mt-1 `}>
                              {item.designation}
                            </p>
                          </div>

                          <div className="relative w-32 md:w-44 aspect-[3/1] shrink-0">
                            <Image
                              src={item.logoUrl}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 128px, 12vw"
                              className="object-contain object-right-top brightness-0 invert"
                            />
                          </div>
                        </div>

                        <div>
                          {/* Star takes a fixed pixel size, so each sits in a
                              sized box that scales at 4K instead. */}
                          <div className="flex gap-1 mb-3">
                            {STARS.map((k) => (
                              <span
                                key={k}
                                className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full"
                              >
                                <Star size={16} />
                              </span>
                            ))}
                          </div>

                          <div className="border-t border-white/30 pt-4">
                            {/* Reviews run to 500 chars, so this scrolls rather
                                than overflowing the panel. */}
                            <p className={`${BODY} max-h-32 overflow-y-auto pr-2`}>
                              &ldquo;{item.review}&rdquo;
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {canPage && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous reviews"
            className={NAV_BUTTON}
          >
            &lsaquo;
          </button>

          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page}
                className={`h-[2px] transition-all duration-300 ${
 i === page
 ? "w-10 bg-[#114046]"
 : "w-4 bg-[#7D7D7D]/40 hover:bg-[#7D7D7D]"
 }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            aria-label="More reviews"
            className={NAV_BUTTON}
          >
            &rsaquo;
          </button>
        </div>
      )}
    </div>
  );
}