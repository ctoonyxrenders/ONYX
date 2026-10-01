// src/app/services/_components/CTASection.tsx
import Link from "next/link";
import type { ServiceContent } from "../_types";

export default function CTASection({ cta }: { cta: ServiceContent["cta"] }) {
  return (
    <section className="bg-[#114046] text-white p-10 space-y-10">
      <h2 className="heading leading-none text-center">{cta.heading}</h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
        <Link href={cta.primaryHref}>
          <button className="bg-white text-[#114046] hover:bg-transparent hover:text-white border border-white btn-pill">
            {cta.primaryLabel}
          </button>
        </Link>

        {cta.secondaryLabel && cta.secondaryHref && (
          <Link href={cta.secondaryHref}>
            <button className="text-white border border-white btn-pill hover:bg-white hover:text-[#114046]">
              {cta.secondaryLabel}
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}