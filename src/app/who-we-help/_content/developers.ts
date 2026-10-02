// src/app/who-we-help/_content/developers.ts
//
// All copy for /who-we-help/developers.

import type { WhoWeHelpContent } from "../_types";

const developers: WhoWeHelpContent = {
  slug: "developers",

  meta: {
    title: "Real Estate Developers | Onyx Renders LLC",
    description:
      "Launch visuals, films and sales material for developers and construction companies, produced by a studio of architects.",
  },

  hero: {
    eyebrow: "Who we help / Real Estate Developers",
    heading: ["Sell the units before", "the site is cleared."],
    body: "Launch visuals, films and sales material for developers and construction companies, produced by a studio of architects who read your drawing set the way your contractor will.",
    image: {
      src: "/home/who we help/developers.webp",
      alt: "Exterior rendering of a residential development",
    },
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "See relevant work", href: "/gallery" },
    note: "4 quick questions. Scoped proposal within 24 hours.",
  },

  problem: {
    heading: ["What this usually costs", "before we get involved"],
    points: [
      {
        title: "Capital sits idle",
        body: "Every month before first reservation is a month of finance cost with nothing coming back.",
      },
      {
        title: "Investors need to see it",
        body: "A spreadsheet and a site plan will not carry a funding conversation. A convincing view will.",
      },
      {
        title: "Marketing waits on visuals",
        body: "Brochure, billboard and portal deadlines are fixed. Late images push the whole launch.",
      },
    ],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-01.svg",
      alt: "Site plan of the development",
    },
  },

  deliver: {
    heading: ["Built for what you need", "it to achieve"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-02.svg",
      alt: "Night view of the development's residential blocks",
    },
    items: [
      {
        title: "Launch imagery",
        body: "Hero exteriors, lifestyle interiors and amenity views at 4K, formatted for brochure, billboard, portal and social.",
      },
      {
        title: "Launch films",
        body: "60 to 90 second films for investor presentations, sales suites and paid campaigns.",
      },
      {
        title: "Masterplan and aerial views",
        body: "The whole development in context, with phasing shown clearly for staged release.",
      },
      {
        title: "Sales-floor tools",
        body: "360° tours, unit-type configurators and marketing floor plans for the sales suite.",
      },
      {
        title: "Unit-type libraries",
        body: "One model set reused across every type and finish option, so phase two costs a fraction of phase one.",
      },
      {
        title: "Documentation",
        body: "BIM coordination, permit sets and construction documentation when the project moves past marketing.",
      },
    ],
  },

  process: {
    heading: ["Four stages, agreed", "before we start"],
    steps: [
      {
        title: "Launch brief",
        body: "We work back from your launch date and agree the image list, formats and milestones.",
      },
      {
        title: "Clay approval",
        body: "Camera angles and massing signed off before any material is applied.",
      },
      {
        title: "Draft round",
        body: "Full lighting and materials, with one consolidated round of comments.",
      },
      {
        title: "Delivery",
        body: "Print, web and social formats delivered together, with phase assets archived for reuse.",
      },
    ],
    // TEMPORARY placeholders until the real images are supplied.
    comparison: {
      before: {
        src: "/placeholders/step-02.svg",
        alt: "Clay model of the villa, before materials",
      },
      after: {
        src: "/placeholders/step-04.svg",
        alt: "Final render of the villa at dusk",
      },
      caption: "Clay model approved before materials — the stage that prevents most revisions.",
    },
  },

  proof: {
    heading: ["Luxury villa community,", "off-plan launch"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-03.svg",
      alt: "Render of a villa from the off-plan community",
    },
    details: [
      {
        label: "Challenge",
        text: "Launch sales before construction started, with nothing built to show buyers.",
      },
      {
        label: "Delivered",
        text: "12 exterior renders, 6 interiors and a 60-second film in three weeks.",
      },
    ],
    stats: [
      { value: "3 weeks", label: "Launch package" },
      { value: "18", label: "Deliverables" },
      { value: "4K", label: "Print ready" },
    ],
    result: "Result: first phase sold before groundbreaking",
    // TEMPORARY: points at the gallery until a case study page exists.
    cta: { label: "Read the case study", href: "/gallery" },
  },

  faqs: {
    heading: ["Before you send anything"],
    // DRAFT answers, written from facts stated elsewhere on this page.
    // Review before launch.
    items: [
      {
        question: "How quickly can you turn a launch package around?",
        answer:
          "A typical launch package of exterior renders, interiors and a short film takes around three weeks. We work back from your launch date and agree the image list, formats and milestones before we start.",
      },
      {
        question: "Can you work from an incomplete design?",
        answer:
          "Yes. Send drawings, a sketch or just the brief. We model from what you have, and camera angles and massing are signed off at the clay stage before any material is applied.",
      },
      {
        question: "Do you handle phase two at a lower cost?",
        answer:
          "Yes. We build one model set that is reused across every unit type and finish option, so later phases cost a fraction of the first.",
      },
      {
        question: "Can you deliver documentation as well as marketing images?",
        answer:
          "Yes. When the project moves past marketing, we provide BIM coordination, permit sets and construction documentation from the same studio.",
      },
    ],
  },

  cta: {
    heading: ["Have a launch date?", "Send the drawings."],
    body: "Send drawings, a sketch or just the brief. You will have a scoped proposal, with price and timeline, within 24 hours.",
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "Book a Call", href: "/studio/#scheduleCall" },
  },
};

export default developers;
