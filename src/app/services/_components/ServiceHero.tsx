// src/app/services/_components/ServiceHero.tsx
import Link from "next/link";
import type { ServiceContent } from "../_types";

export default function ServiceHero({
  hero,
  exploreHeading,
}: {
  hero: ServiceContent["hero"];
  exploreHeading: string;
}) {
  return (
    <>
      <section className="section">
        <div className="max-w-5xl">
          <h1 className="heading">
            {hero.headingLead}{" "}
            <span className="text-[#114046]">{hero.headingAccent}</span>
            {hero.headingTail}
          </h1>

          <p className="text-small text-[#7D7D7D] mt-6 max-w-3xl">
            {hero.body}
          </p>

          <Link href={hero.ctaHref}>
            <button className="bg-[#114046] text-white mt-10 md:mt-16 btn-pill btn-theme hover:bg-[#0e3035]">
              {hero.ctaLabel}
            </button>
          </Link>
        </div>
      </section>

      <section className="px-[var(--gutter)] pt-[var(--section-y)] pb-6 md:pb-10">
        <h2 className="sub-heading">{exploreHeading}</h2>
      </section>
    </>
  );
}