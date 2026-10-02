"use client";
import Link from "next/link";
import React from "react";
import type { MenuCard } from "./navigation";

/**
 * Bordered card grid used by Who we help, Work and Company. Same shape for all
 * three — only the cards differ. Updated with Phase 14 semantic classes.
 */
export default function CardsMenu({
  cards,
  onNavigate,
}: {
  cards: MenuCard[];
  onNavigate: () => void;
}) {
  return (
    <div className="absolute left-0 top-full w-full bg-white text-black shadow-lg border-t border-brand">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            onClick={onNavigate}
            className="border-2 border-brand hover:bg-subtle transition-colors p-5 md:p-6 group"
          >
            {/* Same style as the Services mega menu group titles. */}
            <h3 className="body-small-bold text-[#114046] uppercase tracking-wider group-hover:text-[#0e3035] transition-colors">
              {card.label}
            </h3>
            <p className="tile-text text-secondary text-xs md:text-sm mt-2 md:mt-3">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
