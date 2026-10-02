// src/app/who-we-help/_content/interior-designers.ts
//
// All copy for /who-we-help/interior-designers.

import type { WhoWeHelpContent } from "../_types";

const interiorDesigners: WhoWeHelpContent = {
  slug: "interior-designers",

  meta: {
    title: "Interior Designers | Onyx Renders LLC",
    description:
      "Interior visualization and specification support for design studios, so clients approve a scheme before a single sample is ordered.",
  },

  hero: {
    eyebrow: "Who we help / Interior designers",
    heading: ["Sign-off in one", "meeting, not four."],
    body: "Interior visualization and specification support for design studios, so clients approve a scheme before a single sample is ordered.",
    image: {
      src: "/home/who we help/interior.webp",
      alt: "Rendering of a designed interior",
    },
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "See relevant work", href: "/gallery" },
    note: "4 quick questions. Scoped proposal within 24 hours.",
  },

  problem: {
    heading: ["What this usually costs", "before we get involved"],
    points: [
      {
        title: "Mood boards leave room for doubt",
        body: "A client who cannot picture the finished room hesitates, and hesitation becomes another round of revisions.",
      },
      {
        title: "Changes arrive late and cost money",
        body: "Finishes rejected on site are expensive. Rejected in an image, they cost one revision.",
      },
      {
        title: "Your portfolio waits on the build",
        body: "Projects that take two years to photograph leave a gap in the work you can show.",
      },
    ],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-01.svg",
      alt: "Interior scheme shown before the room is built",
    },
  },

  deliver: {
    heading: ["Built for what you need", "it to achieve"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-02.svg",
      alt: "Rendered living room with the proposed finishes",
    },
    items: [
      {
        title: "Concept visuals",
        body: "Key rooms rendered at concept stage, warm enough to sell the idea and accurate enough to trust.",
      },
      {
        title: "Material option studies",
        body: "The same camera rendered with two or three schemes, so a client chooses side by side rather than imagining.",
      },
      {
        title: "Detail and joinery views",
        body: "Close studies of joinery, lighting and finish junctions where the design actually lives.",
      },
      {
        title: "Walkthroughs and tours",
        body: "Room-to-room films and 360° tours for clients who need to feel the flow of a space.",
      },
      {
        title: "Specification support",
        body: "Material and finish specification drawn from real product data, consistent across drawings and visuals.",
      },
      {
        title: "Portfolio imagery",
        body: "Images of completed schemes that never got photographed, produced from your drawings and specification.",
      },
    ],
  },

  process: {
    heading: ["Four stages, agreed", "before we start"],
    steps: [
      {
        title: "Scheme and references",
        body: "Your drawings, finish schedule and references. Sketches and photographs are enough to begin.",
      },
      {
        title: "Camera selection",
        body: "We agree the views that carry the scheme, usually fewer than clients first expect.",
      },
      {
        title: "Draft round",
        body: "Materials and lighting resolved, with alternates rendered from the same camera where you want options.",
      },
      {
        title: "Delivery",
        body: "High-resolution files for presentation, print and portfolio use.",
      },
    ],
    // TEMPORARY placeholders until the real images are supplied.
    comparison: {
      before: {
        src: "/placeholders/step-02.svg",
        alt: "Interior scheme with material option one",
      },
      after: {
        src: "/placeholders/step-04.svg",
        alt: "The same camera with material option two",
      },
      // Not in the supplied copy: kept from the shared layout. Review.
      caption: "Clay model approved before materials — the stage that prevents most revisions.",
    },
  },

  proof: {
    heading: ["Penthouse redesign,", "client sign-off"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-03.svg",
      alt: "Render of the redesigned penthouse living space",
    },
    details: [
      {
        label: "Challenge",
        text: "Help a client choose finishes without ordering samples for every option.",
      },
      {
        label: "Delivered",
        text: "Two material schemes rendered from identical cameras, plus a 3D walkthrough.",
      },
    ],
    stats: [
      { value: "8 days", label: "Concept to sign-off" },
      { value: "2", label: "Material schemes" },
      { value: "1", label: "Approval meeting" },
    ],
    result: "Result: approved with no changes on site",
    // TEMPORARY: points at the gallery until a case study page exists.
    cta: { label: "Read the case study", href: "/gallery" },
  },

  faqs: {
    heading: ["Before you send anything"],
    // DRAFT answers, written from facts stated elsewhere on this page.
    // Review before launch.
    items: [
      {
        question: "Can you work without CAD drawings?",
        answer:
          "Yes. Sketches and photographs are enough to begin. Send whatever drawings, finish schedule and references you have.",
      },
      {
        question: "Can you render specific products?",
        answer:
          "Yes. Materials and finishes are drawn from real product data, so the products in the images match your specification.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Every project includes a draft round where materials and lighting are resolved. The number of revision rounds is set out in your scoped proposal before work begins.",
      },
      {
        question: "Can you visualize a project that is already built but never photographed?",
        answer:
          "Yes. We produce portfolio images of completed schemes from your drawings and specification, so the work can be shown without a photoshoot.",
      },
    ],
  },

  cta: {
    heading: ["Scheme ready for approval?", "Send the drawings."],
    body: "Send drawings, a sketch or just the brief. You will have a scoped proposal, with price and timeline, within 24 hours.",
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "Book a Call", href: "/studio/#scheduleCall" },
  },
};

export default interiorDesigners;
