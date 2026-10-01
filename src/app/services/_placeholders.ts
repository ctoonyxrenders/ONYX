// src/app/services/_placeholders.ts
//
// TEMPORARY local stand-ins, shared by every service page. Images only —
// copy always comes from _content and is permanent.
//
// Sanity wins per field: a half-populated document shows its real media and
// falls back here for the rest, so the layout is always judgeable.
//
// TO REMOVE once every service document is populated:
//   1. delete this file
//   2. delete /public/placeholders
//   3. remove the fallbacks in ServicePage.tsx and the placeholder* props
//      passed to HowWeWork

import type { ImageItem } from "@/lib/sanity";

/** 16:9 — the slider frame is fixed, so these match it exactly. */
export const slider: ImageItem[] = [
  { url: "/placeholders/slider-01.svg", width: 1920, height: 1080 },
  { url: "/placeholders/slider-02.svg", width: 1920, height: 1080 },
  { url: "/placeholders/slider-03.svg", width: 1920, height: 1080 },
];

/** Mixed ratios on purpose — the grid is masonry and must be judged uneven. */
export const grid: ImageItem[] = [
  { url: "/placeholders/grid-01.svg", width: 1600, height: 1067 },
  { url: "/placeholders/grid-02.svg", width: 1200, height: 1200 },
  { url: "/placeholders/grid-03.svg", width: 1000, height: 1500 },
  { url: "/placeholders/grid-04.svg", width: 1600, height: 900 },
  { url: "/placeholders/grid-05.svg", width: 1400, height: 1050 },
  { url: "/placeholders/grid-06.svg", width: 1000, height: 1400 },
  { url: "/placeholders/grid-07.svg", width: 1600, height: 1067 },
  { url: "/placeholders/grid-08.svg", width: 1200, height: 1200 },
  { url: "/placeholders/grid-09.svg", width: 1600, height: 900 },
];

/** Shown inside the 16:9 video frame until a Sanity URL exists. */
export const videoPoster = "/placeholders/video.svg";

/** 4:3 — the step row is fixed, so these match it exactly. */
export const processImages: ImageItem[] = [
  { url: "/placeholders/step-01.svg", width: 1200, height: 900 },
  { url: "/placeholders/step-02.svg", width: 1200, height: 900 },
  { url: "/placeholders/step-03.svg", width: 1200, height: 900 },
  { url: "/placeholders/step-04.svg", width: 1200, height: 900 },
];