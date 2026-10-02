// src/app/who-we-help/_components/CtaSection.tsx
//
// Closing call to action: heading and text on the left, buttons on the right
// from lg, on the white page background. The button column takes its natural
// width (two pills need ~436px), so the buttons never wrap on laptops.

import Link from "next/link";
import { HEADING, BODY } from "@/components/shared/typography";
import { BUTTON_OUTLINE } from "@/components/shared/buttonStyles";
import type { WhoWeHelpContent } from "../_types";
import Lines from "./Lines";

export default function CtaSection({
  cta,
}: {
  cta: WhoWeHelpContent["cta"];
}) {
  return (
    <section className="section bg-white grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 md:gap-14 lg:gap-20 lg:items-center">
      <div>
        <h2 className={`${HEADING} leading-tight`}>
          <Lines lines={cta.heading} />
        </h2>
        <p className={`${BODY} mt-6 text-secondary text-justify max-w-2xl`}>
          {cta.body}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href={cta.primaryCta.href}
          className="btn-pill btn-theme inline-flex justify-center hover:bg-[#0e3035]"
        >
          {cta.primaryCta.label}
        </Link>
        <Link
          href={cta.secondaryCta.href}
          className={`btn-pill ${BUTTON_OUTLINE} inline-flex justify-center`}
        >
          {cta.secondaryCta.label}
        </Link>
      </div>
    </section>
  );
}
