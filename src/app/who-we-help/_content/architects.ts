// src/app/who-we-help/_content/architects.ts
//
// All copy for /who-we-help/architects.

import type { WhoWeHelpContent } from "../_types";

const architects: WhoWeHelpContent = {
  slug: "architects",

  meta: {
    title: "Architects & Landscape Architects | Onyx Renders LLC",
    description:
      "Competition imagery, planning visuals and coordination support for architecture and landscape practices, from a studio led by a registered architect.",
  },

  hero: {
    eyebrow: "Who we help / Architects & landscape",
    heading: ["Win the commission.", "Clear the committee."],
    body: "Competition imagery, planning visuals and coordination support for architecture and landscape practices, from a studio led by a registered architect.",
    image: {
      src: "/home/who we help/architects.webp",
      alt: "Rendering of an architectural project in its landscape",
    },
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "See relevant work", href: "/gallery" },
    note: "4 quick questions. Scoped proposal within 24 hours.",
  },

  problem: {
    heading: ["What this usually costs", "before we get involved"],
    points: [
      {
        title: "The better presentation wins",
        body: "Juries and clients compare drawings against images. The scheme that is understood fastest tends to win.",
      },
      {
        title: "Committees cannot read drawings",
        body: "Planners, neighbours and councillors judge a proposal on how it sits in the street, not on a section.",
      },
      {
        title: "Your team is already at capacity",
        body: "Deadlines arrive while the design is still moving, and visualization pulls staff off design work.",
      },
    ],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-01.svg",
      alt: "Proposed scheme shown in its street context",
    },
  },

  deliver: {
    heading: ["Built for what you need", "it to achieve"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-02.svg",
      alt: "Competition board with hero view and site plan",
    },
    items: [
      {
        title: "Competition imagery",
        body: "Hero views, context shots and board-ready layouts delivered to competition deadlines.",
      },
      {
        title: "Planning and verified views",
        body: "Accurate context modeling, street-level and aerial views, with day, dusk and seasonal variants.",
      },
      {
        title: "Coloured site plans",
        body: "Site plans, landscape plans and diagrams that non-technical reviewers understand at a glance.",
      },
      {
        title: "Landscape visualization",
        body: "Planting that reads correctly by species, season and maturity, not generic green.",
      },
      {
        title: "Model and BIM support",
        body: "Accurate models built from your drawings, with clash detection when you need coordination capacity.",
      },
      {
        title: "White-label delivery",
        body: "Work delivered unbranded for presentation under your practice's name, NDA as standard.",
      },
    ],
  },

  process: {
    heading: ["Four stages, agreed", "before we start"],
    steps: [
      {
        title: "Design intent",
        body: "A short call on what the scheme is arguing, so the views support the argument rather than decorate it.",
      },
      {
        title: "Clay and context",
        body: "Massing and context confirmed against your model and site information before materials.",
      },
      {
        title: "Draft round",
        body: "Light, material and atmosphere resolved, with one consolidated round of comments.",
      },
      {
        title: "Submission formats",
        body: "Delivered to competition or planning specification, including boards and print-ready files.",
      },
    ],
    // TEMPORARY placeholders until the real images are supplied.
    comparison: {
      before: {
        src: "/placeholders/step-02.svg",
        alt: "Clay model of the scheme in its context, before materials",
      },
      after: {
        src: "/placeholders/step-04.svg",
        alt: "Final render of the scheme in its context",
      },
      // Not in the supplied copy: kept from the shared layout. Review.
      caption: "Clay model approved before materials — the stage that prevents most revisions.",
    },
  },

  proof: {
    heading: ["Mixed-use tower,", "planning approval"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-03.svg",
      alt: "Render of a 30-storey mixed-use tower within a historic street",
    },
    details: [
      {
        label: "Challenge",
        text: "Show a committee how a 30-storey tower sits within a historic street.",
      },
      {
        label: "Delivered",
        text: "8 exterior views, 2 aerials and a coloured site plan in ten days.",
      },
    ],
    stats: [
      { value: "10 days", label: "Brief to submission" },
      { value: "11", label: "Views and plans" },
      { value: "1st", label: "Submission approved" },
    ],
    result: "Result: approved on first submission",
    // TEMPORARY: points at the gallery until a case study page exists.
    cta: { label: "Read the case study", href: "/gallery" },
  },

  faqs: {
    // Not in the supplied copy: kept from the shared layout.
    heading: ["Before you send anything"],
    // DRAFT answers, written from facts stated elsewhere on this page.
    // Review before launch.
    items: [
      {
        question: "Can you work to a competition deadline?",
        answer:
          "Yes. Competition imagery is delivered to competition deadlines. We agree the views and milestones at the start and work back from your submission date.",
      },
      {
        question: "Will the work carry your name?",
        answer:
          "Yes. Work is delivered unbranded for presentation under your practice's name, with an NDA as standard.",
      },
      {
        question: "How accurate is the context modeling?",
        answer:
          "Context is modeled from your model and site information, and massing and context are confirmed with you at the clay stage, before any material is applied.",
      },
      {
        question: "Can you take on modeling or documentation overflow?",
        answer:
          "Yes. We build accurate models from your drawings and provide BIM support, including clash detection when you need coordination capacity.",
      },
    ],
  },

  cta: {
    heading: ["Submission date in the diary?", "Let's work back from it."],
    body: "Send drawings, a sketch or just the brief. You will have a scoped proposal, with price and timeline, within 24 hours.",
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "Book a Call", href: "/studio/#scheduleCall" },
  },
};

export default architects;
