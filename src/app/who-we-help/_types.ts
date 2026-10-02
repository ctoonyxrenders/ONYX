// src/app/who-we-help/_types.ts
//
// The contract for one Who We Help page. Adding an audience means writing one
// WhoWeHelpContent object — no component changes.

import type { StatItem } from "@/components/home/Statistics";

export interface CtaLink {
  label: string;
  href: string;
}

export interface ContentImage {
  src: string;
  alt: string;
}

/** A title with a short body: numbered points and cards. */
export interface TextItem {
  title: string;
  body: string;
}

export interface WhoWeHelpContent {
  /** Must match the slug of the href in navigation.ts. */
  slug: string;

  meta: {
    title: string;
    description: string;
  };

  hero: {
    /** Small line above the heading, e.g. "Who we help / Developers". */
    eyebrow: string;
    /** Each entry renders on its own line. */
    heading: string[];
    body: string;
    /** Full-bleed background. Text sits over its left side. */
    image: ContentImage;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    /** Short reassurance line under the buttons. */
    note: string;
  };

  /** Section A. */
  problem: {
    /** Each entry renders on its own line. */
    heading: string[];
    /** Three points, shown side by side from md. */
    points: [TextItem, TextItem, TextItem];
    /** Wide image under the points. */
    image: ContentImage;
  };

  /** Section B. */
  deliver: {
    /** Each entry renders on its own line. */
    heading: string[];
    /** Cards in a three-column grid from lg; any count works. */
    items: TextItem[];
  };

  /** Section C. */
  process: {
    /** Each entry renders on its own line. */
    heading: string[];
    steps: [TextItem, TextItem, TextItem, TextItem];
    /** Two images shown as one before/after frame, with a caption. */
    comparison: {
      before: ContentImage;
      after: ContentImage;
      caption: string;
    };
  };

  /** Section D: one case study. */
  proof: {
    /** Each entry renders on its own line. */
    heading: string[];
    image: ContentImage;
    /** Label / text rows, e.g. Challenge, Delivered. */
    details: { label: string; text: string }[];
    /** Shown in a row; three fit at every width. */
    stats: { value: string; label: string }[];
    result: string;
    cta: CtaLink;
  };

  /** Stats band after Proof. Years in practice and countries are shared by
   *  every page and live in WhoWeHelpPage; only these two vary. */
  stats: {
    projects: StatItem;
    clients: StatItem;
  };

  /** Section E. */
  faqs: {
    /** Each entry renders on its own line. */
    heading: string[];
    items: { question: string; answer: string }[];
  };

  /** Closing call to action, directly above the site footer. */
  cta: {
    /** Each entry renders on its own line. */
    heading: string[];
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
}
