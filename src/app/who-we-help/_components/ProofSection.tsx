// src/app/who-we-help/_components/ProofSection.tsx
//
// Section D: one case study, as a brand-teal card on the white page. Image and
// details stack on mobile and sit side by side from lg, where the image fills
// the panel height.

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import { HEADING, BODY, SMALL } from "@/components/shared/typography";
import { BUTTON_WHITE } from "@/components/shared/buttonStyles";
import type { WhoWeHelpContent } from "../_types";
import SectionLabel from "./SectionLabel";
import Lines from "./Lines";

export default function ProofSection({
  proof,
}: {
  proof: WhoWeHelpContent["proof"];
}) {
  return (
    <section className="section bg-white">
      <SectionLabel label="Proof" />

      <article className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg bg-[#114046] text-white">
        <div className="relative aspect-[4/3] lg:aspect-auto bg-white/5">
          <Image
            src={proof.image.src}
            alt={proof.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-10 lg:p-12">
          <h2 className={`${HEADING} leading-tight`}>
            <Lines lines={proof.heading} />
          </h2>

          <dl className="mt-6 md:mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            {proof.details.map((detail) => (
              <div key={detail.label} className="contents">
                <dt className={`${BODY} text-white/60`}>{detail.label}</dt>
                <dd className={`${BODY} text-justify`}>{detail.text}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/15 grid grid-cols-3 gap-4">
            {proof.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className={`${SMALL} mt-1 text-white/60`}>{stat.label}</dt>
                <dd className="text-xl md:text-2xl font-light">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <p className={`${BODY} font-bold mt-6 md:mt-8`}>{proof.result}</p>

          <Link
            href={proof.cta.href}
            className={`btn-pill ${BUTTON_WHITE} inline-flex justify-center mt-8 md:mt-10`}
          >
            {proof.cta.label}
          </Link>
        </div>
      </article>
    </section>
  );
}
