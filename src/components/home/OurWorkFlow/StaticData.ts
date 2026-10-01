import type { ProcessStep } from "@/components/shared/ProcessSteps";

export const list: ProcessStep[] = [
  {
    title: "01 — Brief & Drawings",
    body: "We review your CAD, SketcUp, Revit, PDFs ,elevations and references, flag anything ambiguous, and confirm scope before a single view is priced.",
    image: "/home/work-flow/1.webp",
    alt: "Architectural drawings and references under review",
  },
  {
    title: "02 — Approve Clay Model",
    body: "Check cameras angles and shapes before material are added.",
    image: "/home/work-flow/2.webp",
    alt: "A 3D architectural model being built and lit",
  },
  {
    title: "03 — Review the draft",
    body: "See materials and lighting, then send comments in one round.",
    image: "/home/work-flow/3.webp",
    alt: "Materials and lighting being refined on a draft render",
  },
  {
    title: "04 — Receive final renders",
    body: "High-resolution files ready for print, web and social media.",
    image: "/home/work-flow/4.webp",
    alt: "Final high-resolution renders delivered to the client",
  },
];