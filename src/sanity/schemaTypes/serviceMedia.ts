// src/sanity/schemaTypes/serviceMedia.ts
//
// Media only. All copy, FAQs, headings and CTA labels live in
// src/app/services/_content — by design.
//
// Replaces visualizationPage. One document per service.

import { Rule } from "sanity";

export default {
  name: "serviceMedia",
  type: "document",
  title: "Service Page Media",
  fields: [
    {
      name: "title",
      title: "Service Name",
      description: "Studio label only. Never rendered on the website.",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Service Slug",
      description:
        'Must match the route exactly, e.g. "exterior-3d-renderings" for /services/exterior-3d-renderings.',
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slider",
      title: "Slider Images",
      description:
        "Explore Our Work slider. Displayed at a fixed 16:9 — upload 16:9 crops or expect edges to be trimmed. Drag to reorder.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule: Rule) =>
        Rule.required().min(2).error("Add at least two slider images"),
    },
    {
      name: "grid",
      title: "Work Grid Images",
      description:
        "Preview of selected work. Masonry keeps each image's own proportions — mixed ratios look best. Maximum nine.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule: Rule) =>
        Rule.required().min(1).max(9).error("Between one and nine images"),
    },
    {
      name: "processVideo",
      title: "How We Work Video",
      description:
        "Direct .mp4/.webm link, or a YouTube/Vimeo URL. Rendered at 16:9.",
      type: "url",
      validation: (Rule: Rule) => Rule.uri({ allowRelative: true }),
    },
    {
      name: "processImages",
      title: "How We Work Images",
      description:
        "Exactly four, in the same order as the four steps in _content. Displayed at 4:3.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule: Rule) =>
        Rule.required().length(4).error("Exactly four images are required"),
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
};