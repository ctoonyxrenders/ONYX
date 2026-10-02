// src/app/who-we-help/_components/SectionLabel.tsx
//
// The small uppercase marker above each section heading, e.g. "THE PROBLEM".

import { SMALL } from "@/components/shared/typography";

export default function SectionLabel({ label }: { label: string }) {
  return (
    <p className={`${SMALL} uppercase tracking-[0.25em] text-secondary`}>
      {label}
    </p>
  );
}
