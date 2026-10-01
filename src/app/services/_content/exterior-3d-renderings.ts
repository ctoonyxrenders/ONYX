// src/app/services/_content/exterior-3d-renderings.ts
//
// All copy for /services/exterior-3d-renderings. Media comes from the Sanity
// serviceMedia document whose slug is "exterior-3d-renderings".

import type { ServiceContent } from "../_types";

const exterior3dRenderings: ServiceContent = {
  slug: "exterior-3d-renderings",

  meta: {
    title: "Exterior 3D Renderings | Onyx Renders LLC",
    description:
      "Photorealistic exterior architectural visualization — built to the drawing, lit to the hour, detailed to the crop.",
  },

  hero: {
    headingLead: "Exterior",
    headingAccent: "renderings",
    headingTail: " built to the drawing.",
    body: "Facades, landscaping and light studied together, so a building is judged the way it will actually be seen from the street. Modelled from your CAD and elevations, lit to the hour you specify, and detailed to the crop.",
    ctaLabel: "Book a Call",
    ctaHref: "/studio/#scheduleCall",
  },

  exploreHeading: "Explore Our Work",

  viewMoreLabel: "View More",

  howWeWork: {
    heading: "How We Work",
    body: "A staged process with named review points, so nothing is approved twice and nothing is a surprise. You sign off on composition before we build materials, and on light before we render final frames.",
    steps: [
      {
        title: "01 — Brief & Drawings",
        body: "We review your CAD, elevations and references, flag anything ambiguous, and confirm scope before a single view is priced.",
      },
      {
        title: "02 — Modelling & Camera",
        body: "The architectural model is built from your drawings. You approve grayscale camera previews before any material work begins.",
      },
      {
        title: "03 — Materials & Light",
        body: "Two colour preview stages cover materials, landscaping, entourage and lighting, with refinements included at each.",
      },
      {
        title: "04 — Final Delivery",
        body: "High-resolution frames delivered in print and web formats, with full commercial usage on handover.",
      },
    ],
  },

  cta: {
    heading: "Ready to see your project before it is built?",
    primaryLabel: "Book a Call",
    primaryHref: "/studio/#scheduleCall",
    secondaryLabel: "Get a Quote",
    secondaryHref: "/#quote",
  },

  faqs: [
    {
      question: "What is architectural visualization?",
      answer:
        "It is the process of turning architectural drawings into photorealistic images, allowing a design to be judged, marketed and sold before construction begins.",
    },
    {
      question: "What types of exterior visualization do you provide?",
      answer:
        "Street-level hero views, elevated three-quarter shots, aerial and full-site renders, entrance and podium details, and dusk or night treatments.",
    },
    {
      question: "How long does an exterior project take?",
      answer:
        "A typical four-view residential set runs three to four weeks from complete source material. Compressed schedules are possible and carry a rush premium.",
    },
    {
      question: "What information do you need from a client?",
      answer:
        "CAD drawings or elevations, material and finish references, site context or photography, and an indication of the mood and time of day you want.",
    },
    {
      question: "Can you work with existing 3D models?",
      answer:
        "Yes. If you supply a usable model we work from it directly, which reduces both the timeline and the cost.",
    },
    {
      question: "Do you offer revisions?",
      answer:
        "Our workflow includes three structured review stages. Normal refinements are included within those stages; major geometry or brief changes after an approved stage are quoted separately.",
    },
  ],

  about: {
    heading: "About This Service",
    body: "Onyx Renders works with architects, designers and developers across more than twenty-five countries, delivering exterior visualization that holds up at print resolution and under client scrutiny.",
    ctaLabel: "Book a Call",
    ctaHref: "/studio/#scheduleCall",
    panelTitle: "Service Details",
    entries: [
      {
        heading: "What you receive",
        body: "High-resolution stills in print and web formats, with full commercial usage rights on final delivery.",
      },
      {
        heading: "Source material",
        body: "CAD drawings, elevations or an existing 3D model. We build the architectural model from your drawings when no model exists.",
      },
      {
        heading: "Review stages",
        body: "Grayscale camera preview, two colour preview stages, then final delivery — three structured review points before handover.",
      },
      {
        heading: "Timeline",
        body: "Three to four weeks for a typical set, assuming complete source material and feedback returned within two working days at each stage.",
      },
      {
        heading: "Revisions",
        body: "Material adjustments, landscaping refinements, lighting tweaks and secondary object changes are included within the review stages.",
      },
      {
        heading: "Rush delivery",
        body: "Compressed schedules are subject to team availability and carry a premium depending on how aggressive the timeline is.",
      },
      {
        heading: "Working internationally",
        body: "We work across time zones with architects, designers and developers in over twenty-five countries, with communication in English throughout.",
      },
    ],
  },
};

export default exterior3dRenderings;