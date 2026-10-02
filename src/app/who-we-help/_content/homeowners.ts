// src/app/who-we-help/_content/homeowners.ts
//
// All copy for /who-we-help/homeowners.

import type { WhoWeHelpContent } from "../_types";

const homeowners: WhoWeHelpContent = {
  slug: "homeowners",

  meta: {
    title: "Homeowners | Onyx Renders LLC",
    description:
      "Visualization for private clients building, extending or renovating, so decisions are made on an image rather than an imagined plan.",
  },

  hero: {
    eyebrow: "Who we help / Homeowners",
    heading: ["See the house before", "you commit to", "building it."],
    body: "Visualization for private clients building, extending or renovating, so decisions are made on an image rather than an imagined plan.",
    image: {
      src: "/home/who we help/homeowner.webp",
      alt: "Rendering of a family home",
    },
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "See relevant work", href: "/gallery" },
    note: "4 quick questions. Scoped proposal within 24 hours.",
  },

  problem: {
    heading: ["What this usually costs", "before we get involved"],
    points: [
      {
        title: "Plans are hard to read",
        body: "Most people cannot picture a room from a floor plan, and nobody should have to commit their savings to a drawing.",
      },
      {
        title: "Choices are expensive to reverse",
        body: "Brick, cladding, kitchen and flooring decisions are difficult and costly to undo once work begins.",
      },
      {
        title: "Everyone pictures something different",
        body: "You, your partner, your architect and your builder can all read the same drawing and expect different results.",
      },
    ],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-01.svg",
      alt: "Floor plan of a family home",
    },
  },

  deliver: {
    heading: ["Built for what you need", "it to achieve"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-02.svg",
      alt: "Rendered exterior of a family home at dusk",
    },
    items: [
      {
        title: "Exterior views",
        body: "Your house in its real setting, with the materials you are considering, in daylight and evening light.",
      },
      {
        title: "Interior views",
        body: "Kitchens, living spaces and bathrooms shown with the finishes, lighting and furniture you plan to use.",
      },
      {
        title: "Option comparisons",
        body: "Two facade or finish options rendered from the same camera, so the choice is obvious.",
      },
      {
        title: "3D floor plans",
        body: "A doll's-house view of the layout that family members can understand without any drawing training.",
      },
      {
        title: "Walkthroughs",
        body: "A short film moving through the house, useful when a decision involves people who cannot meet in person.",
      },
      {
        title: "Contractor clarity",
        body: "A clear visual reference that keeps architect, builder and client building the same thing.",
      },
    ],
  },

  process: {
    // Not in the supplied copy: kept from the shared layout.
    heading: ["Four stages, agreed", "before we start"],
    steps: [
      {
        title: "Send what you have",
        body: "Architect's drawings, a sketch, or photographs of the existing house with a description of the plan.",
      },
      {
        title: "Confirm the design",
        body: "We check dimensions and flag anything unclear before modeling, so the images are accurate.",
      },
      {
        title: "Review the draft",
        body: "See materials and lighting, then tell us what to change. Options are rendered from the same viewpoint.",
      },
      {
        title: "Final images",
        body: "High-resolution files you can share with family, your contractor or your lender.",
      },
    ],
    // TEMPORARY placeholders until the real images are supplied.
    comparison: {
      before: {
        src: "/placeholders/step-02.svg",
        alt: "The house with facade option one",
      },
      after: {
        src: "/placeholders/step-04.svg",
        alt: "The same viewpoint with facade option two",
      },
      // Not in the supplied copy: kept from the shared layout. Review.
      caption: "Clay model approved before materials — the stage that prevents most revisions.",
    },
  },

  proof: {
    heading: ["Family home,", "new build"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-03.svg",
      alt: "Render of the new-build family home",
    },
    details: [
      {
        label: "Challenge",
        text: "Choose between two facade designs before construction began.",
      },
      {
        label: "Delivered",
        text: "4 exterior views, 3 interiors and a 3D floor plan in six days.",
      },
    ],
    stats: [
      { value: "6 days", label: "Start to delivery" },
      { value: "8", label: "Images and plans" },
      { value: "2", label: "Facade options" },
    ],
    result: "Result: facade chosen in one week, no changes on site",
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
        question: "I don't have an architect yet. Can you still help?",
        answer:
          "Yes. A sketch, or photographs of the existing house with a description of the plan, is enough to begin. We check dimensions and flag anything unclear before modeling.",
      },
      {
        question: "How much does it cost?",
        answer:
          "It depends on how many images and plans you need. Send drawings, a sketch or just the brief, and you will have a scoped proposal, with price and timeline, within 24 hours.",
      },
      {
        question: "How long does it take?",
        answer:
          "It depends on the scope. As an example, 4 exterior views, 3 interiors and a 3D floor plan for a new family home took six days. Your proposal confirms the timeline before work starts.",
      },
      {
        question: "Can I use the images with my builder or bank?",
        answer:
          "Yes. Final images are delivered as high-resolution files you can share with family, your contractor or your lender.",
      },
    ],
  },

  cta: {
    heading: ["Building, extending or renovating?", "Send your plans."],
    body: "Send drawings, a sketch or just the brief. You will have a scoped proposal, with price and timeline, within 24 hours.",
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "Book a Call", href: "/studio/#scheduleCall" },
  },
};

export default homeowners;
