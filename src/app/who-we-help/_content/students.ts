// src/app/who-we-help/_content/students.ts
//
// All copy for /who-we-help/students.

import type { WhoWeHelpContent } from "../_types";

const students: WhoWeHelpContent = {
  slug: "students",

  meta: {
    title: "Students | Onyx Renders LLC",
    description:
      "Thesis and portfolio visualization for architecture, interior and landscape students, produced by architects who sat the same juries.",
  },

  hero: {
    eyebrow: "Who we help / Students",
    heading: ["Your design. Jury-", "ready images.", "Student pricing."],
    body: "Thesis and portfolio visualization for architecture, interior and landscape students, produced by architects who sat the same juries.",
    // TEMPORARY placeholder: no student hero image exists yet.
    image: {
      src: "/placeholders/slider-01.svg",
      alt: "Architecture student presentation render",
    },
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "See relevant work", href: "/gallery" },
    note: "4 quick questions. Scoped proposal within 24 hours.",
  },

  problem: {
    heading: ["What this usually costs", "before we get involved"],
    points: [
      {
        title: "The design is resolved, the images are not",
        body: "Weeks of design work can be undersold in a jury by presentation that does not carry it.",
      },
      {
        title: "Deadlines do not move",
        body: "Submission dates are fixed, and render time is the first thing that runs out.",
      },
      {
        title: "Studio rates are out of reach",
        body: "Commercial pricing does not fit a student budget, which is why we price this work separately.",
      },
    ],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-01.svg",
      alt: "Student presentation boards pinned up for a jury",
    },
  },

  deliver: {
    heading: ["Built for what you need", "it to achieve"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-02.svg",
      alt: "Hero view of a student thesis scheme",
    },
    items: [
      {
        title: "Jury imagery",
        body: "Hero views, context shots and atmospheric interiors sized for board layout.",
      },
      {
        title: "Coloured site plans",
        body: "Site and landscape plans drawn to read clearly from across a review room.",
      },
      {
        title: "Diagrams",
        body: "Concept, circulation and massing diagrams consistent with your board style.",
      },
      {
        title: "Short animations",
        body: "A 20 to 30 second sequence for portfolio and digital submission.",
      },
      {
        title: "Process imagery",
        body: "Clay-to-final sequences that show the jury how the scheme was developed.",
      },
      {
        title: "Board guidance",
        body: "A review of your layout before you print, from people who have marked these boards.",
      },
    ],
  },

  process: {
    // Not in the supplied copy: kept from the shared layout.
    heading: ["Four stages, agreed", "before we start"],
    steps: [
      {
        title: "Send your model and deadline",
        body: "SketchUp, Revit, Rhino or AutoCAD. Tell us the submission date first, as it sets everything else.",
      },
      {
        title: "Agree the view list",
        body: "We advise on which views a jury actually responds to, and keep the count affordable.",
      },
      {
        title: "Draft round",
        body: "Lighting and materials reviewed, with changes made in one consolidated round.",
      },
      {
        title: "Delivery before submission",
        body: "Final files delivered with time to spare for printing and layout.",
      },
    ],
    // TEMPORARY placeholders until the real images are supplied.
    comparison: {
      before: {
        src: "/placeholders/step-02.svg",
        alt: "Clay model of the thesis scheme, before materials",
      },
      after: {
        src: "/placeholders/step-04.svg",
        alt: "Final render of the thesis scheme",
      },
      // Not in the supplied copy: kept from the shared layout. Review.
      caption: "Clay model approved before materials — the stage that prevents most revisions.",
    },
  },

  proof: {
    heading: ["Final-year thesis,", "architecture"],
    // TEMPORARY placeholder until the real image is supplied.
    image: {
      src: "/placeholders/slider-03.svg",
      alt: "Aerial render of a civic thesis scheme",
    },
    details: [
      {
        label: "Challenge",
        text: "Present a complex civic scheme to a jury in a single review session.",
      },
      {
        label: "Delivered",
        text: "5 views including one aerial, a coloured site plan and a set of diagrams.",
      },
    ],
    stats: [
      { value: "4 days", label: "Before submission" },
      { value: "7", label: "Board deliverables" },
      { value: "Student", label: "Pricing" },
    ],
    result: "Result: delivered four days before submission",
    // TEMPORARY: points at the gallery until a case study page exists.
    cta: { label: "Read the case study", href: "/gallery" },
  },

  faqs: {
    // Not in the supplied copy: kept from the shared layout.
    heading: ["Before you send anything"],
    // DRAFT answers, written from facts stated elsewhere on this page.
    // Review before launch, especially who qualifies.
    items: [
      {
        question: "Who qualifies for student pricing?",
        answer:
          "Student pricing is for architecture, interior and landscape students working on thesis and portfolio projects. Tell us about your course when you get in touch, and your proposal will confirm the student rate.",
      },
      {
        question: "Will you design my project for me?",
        answer:
          "No. The design is yours. We visualize the scheme you have resolved, from your own model, so the images carry your work to the jury.",
      },
      {
        question: "My submission is in three days. Can you help?",
        answer:
          "Tell us the submission date first, as it sets everything else. We will tell you honestly what can be delivered in the time, and agree a view list that fits it.",
      },
      {
        question: "Can I use the images in my portfolio?",
        answer:
          "Yes. The work is produced for your jury and your portfolio, including short animations for digital submission.",
      },
    ],
  },

  cta: {
    heading: ["Submission date approaching?", "Tell us when it is."],
    body: "Send drawings, a sketch or just the brief. You will have a scoped proposal, with price and timeline, within 24 hours.",
    primaryCta: { label: "Request a Proposal", href: "/studio/#scheduleCall" },
    secondaryCta: { label: "Book a Call", href: "/studio/#scheduleCall" },
  },
};

export default students;
