// src/components/home/SplitReveal.tsx
// OPTIMIZED: Consistent universal padding, responsive sizing

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { blurDataURL } from "@/constants";

const BEFORE_IMAGE = "/home/before.webp";
const AFTER_IMAGE = "/home/after.webp";

const points = [
  "Quote within 24 hours",
  "[1100+] projects delivered",
  "Clients in [30+] countries",
  "NDA on request",
];

const START = 25;
const DRAG_THRESHOLD = 4;

function Point({ text }: { text: string }) {
  const parts = text.split(/\[(.+?)\]/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-bold text-[#114046]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function SplitReveal() {
  const [position, setPosition] = useState(START);
  const [dragging, setDragging] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const pressed = useRef(false);
  const startX = useRef(0);

  const moveTo = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const { left, width } = frame.getBoundingClientRect();
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pressed.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pressed.current) return;
    if (!dragging && Math.abs(e.clientX - startX.current) > DRAG_THRESHOLD) {
      setDragging(true);
    }
    if (dragging) moveTo(e.clientX);
  };

  const endDrag = () => {
    pressed.current = false;
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    const moves: Record<string, (p: number) => number> = {
      ArrowLeft: (p) => p - step,
      ArrowRight: (p) => p + step,
      Home: () => 0,
      End: () => 100,
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    setPosition((p) => Math.min(100, Math.max(0, move(p))));
  };

  const motion = dragging
    ? "transition-none"
    : "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <section className="section">
      <div className="flex flex-col lg:flex-row lg:items-center gap-12 md:gap-16 lg:gap-20">
        {/* COPY */}
        <div className="w-full lg:w-[45%]">
          <h2 className="heading flex flex-col gap-3 md:gap-5 [word-spacing:0.025em] tracking-wide max-w-2xl">
            <span>
              From first <span className="font-bold text-[#4a5f66]">Sketch</span> to
            </span>
            <span>
              final <span className="font-bold text-[#4a5f66]">Sale.</span>
            </span>
          </h2>

          <p className="text-x-small text-[#4a5f66] tracking-[0.25em] uppercase mt-4 md:mt-6">
            Designed. Modeled. Rendered. Sold.
          </p>

          <p className="text-small text-justify hyphens-auto mt-6 md:mt-8 max-w-md">
            Photorealistic renders, animations, and immersive experiences that win approvals, impress clients, and sell projects off-plan, backed by a design and BIM team that knows how buildings are made.
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-10">
            <Link href="/studio/#scheduleCall">
              <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
                Request a proposal
              </button>
            </Link>
            <Link href="/gallery">
              <button className="btn-pill border border-[#114046]  hover:bg-[#114046] hover:text-white">
                Explore our Work
              </button>
            </Link>
          </div>

          {/* STATS */}
          <ul className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-6 mt-10 md:mt-12">
            {points.map((point) => (
              <li key={point} className="text-small">
                <span aria-hidden="true" className="text-[#114046] mr-2">
                  ✓
                </span>
                <Point text={point} />
              </li>
            ))}
          </ul>
        </div>

        {/* COMPARISON */}
        <div className="relative w-full lg:w-[55%]">
          <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-[#bac3c833] select-none touch-pan-y ${
 dragging ? "cursor-grabbing" : "cursor-pointer"
 }`}
          >
            <Image
              src={AFTER_IMAGE}
              alt="Final render"
              fill
              draggable={false}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover pointer-events-none"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />

            <div
              className={`absolute inset-0 ${motion}`}
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={BEFORE_IMAGE}
                alt="Clay model"
                fill
                draggable={false}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover pointer-events-none"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>

            {/* DIVIDER */}
            <div
              aria-hidden="true"
              className={`absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white pointer-events-none ${motion}`}
              style={{ left: `${position}%` }}
            />

            {/* HANDLE */}
            <button
              type="button"
              role="slider"
              aria-label="Compare clay model with final render"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              onKeyDown={onKeyDown}
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#114046] text-lg leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#114046] focus-visible:ring-offset-2 hover:scale-110 ${
 dragging ? "scale-110 cursor-grabbing" : "cursor-grab"
 } ${motion}`}
              style={{ left: `${position}%` }}
            >
              ⇄
            </button>
          </div>

          <p className="text-x-small font-light mt-4 md:mt-6">
            Click or drag to see how a model becomes a selling image.
          </p>
        </div>
      </div>
    </section>
  );
}