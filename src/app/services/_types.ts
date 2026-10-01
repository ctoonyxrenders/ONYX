// src/app/services/_types.ts
//
// The contract between service copy (in code) and service media (in Sanity).
// Adding a service means writing one ServiceContent object — no component
// changes, ever.

import type { ImageItem } from "@/lib/sanity";

export interface FaqItem {
  question: string;
  answer: string;
}

/** One of the four How We Work steps. Text here; image from Sanity. */
export interface ProcessStep {
  title: string;
  body: string;
}

/** A row in the scrollable panel of the About section. */
export interface AboutEntry {
  heading: string;
  body: string;
}

export interface ServiceContent {
  /** Must match the slug in navigation.ts and the Sanity document. */
  slug: string;

  meta: {
    title: string;
    description: string;
  };

  hero: {
    headingLead: string;
    headingAccent: string;
    headingTail: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };

  exploreHeading: string;

  /** Label under the work grid. Always navigates to /gallery. */
  viewMoreLabel: string;

  howWeWork: {
    heading: string;
    body: string;
    /** Exactly four — paired by index with media.processImages. */
    steps: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
  };

  cta: {
    heading: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };

  faqs: FaqItem[];

  about: {
    heading: string;
    body: string;
    ctaLabel?: string;
    ctaHref?: string;
    panelTitle: string;
    entries: AboutEntry[];
  };
}

/** Images and video for one service page. Media only — never copy. */
export interface ServiceMedia {
  slider: ImageItem[];
  grid: ImageItem[];
  processVideo: string | null;
  processImages: ImageItem[];
}