// src/app/services/_components/AboutService.tsx
import Link from "next/link";
import type { ServiceContent } from "../_types";

export default function AboutService({
  about,
}: {
  about: ServiceContent["about"];
}) {
  return (
    <section className="section">
      {/* items-stretch lets both columns share a height, so the left column
          can centre itself against the panel on the right. */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="sub-heading">{about.heading}</h2>
          <p className="text-small text-[#7D7D7D] mt-6">
            {about.body}
          </p>

          {about.ctaLabel && about.ctaHref && (
            <Link href={about.ctaHref} className="w-fit">
              <button className="bg-[#114046] text-white mt-8 md:mt-12 btn-pill btn-theme hover:bg-[#0e3035]">
                {about.ctaLabel}
              </button>
            </Link>
          )}
        </div>

        <div className="w-full lg:w-1/2">
          <div className="border border-[#114046]/30 rounded-2xl p-6 md:p-8">
            <h3 className="text-small text-[#114046] font-normal">
              {about.panelTitle}
            </h3>

            {/* Scrolls independently once the content outgrows the box. */}
            <div className="mt-5 max-h-[22rem] md:max-h-[26rem] overflow-y-auto pr-3 flex flex-col gap-6">
              {about.entries.map((entry) => (
                <div key={entry.heading}>
                  <h4 className="text-x-small text-[#114046]">
                    {entry.heading}
                  </h4>
                  <p className="text-x-small text-[#7D7D7D] mt-2">
                    {entry.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}