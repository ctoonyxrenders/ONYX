// src/components/shared/CompareSlider.tsx
//
// Before/after image comparison: the "before" image is clipped over the
// "after" image up to a draggable divider. Extracted from the Home page
// SplitReveal so other pages reuse the exact same interaction.
//
// Click or drag anywhere on the frame to move the divider; the handle is a
// keyboard-operable slider (arrows, Shift+arrows, Home, End).
// The caller sizes and rounds the frame through `className`.

"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { blurDataURL } from "@/constants";

const DRAG_THRESHOLD = 4;

export interface CompareImage {
  src: string;
  alt: string;
}

export default function CompareSlider({
  before,
  after,
  label,
  sizes,
  className = "",
  start = 25,
}: {
  before: CompareImage;
  after: CompareImage;
  /** Accessible name of the slider handle. */
  label: string;
  /** next/image sizes for both images. */
  sizes: string;
  /** Frame sizing and rounding, e.g. "aspect-[4/3] rounded-xl". */
  className?: string;
  /** Initial divider position, 0–100. */
  start?: number;
}) {
  const [position, setPosition] = useState(start);
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
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`relative w-full overflow-hidden bg-[#bac3c833] select-none touch-pan-y ${
        dragging ? "cursor-grabbing" : "cursor-pointer"
      } ${className}`}
    >
      <Image
        src={after.src}
        alt={after.alt}
        fill
        draggable={false}
        sizes={sizes}
        className="object-cover pointer-events-none"
        placeholder="blur"
        blurDataURL={blurDataURL}
      />

      <div
        className={`absolute inset-0 ${motion}`}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          draggable={false}
          sizes={sizes}
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
        aria-label={label}
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
  );
}
