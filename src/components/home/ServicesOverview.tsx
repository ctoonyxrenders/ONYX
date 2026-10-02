// src/components/home/ServicesOverview.tsx
// OPTIMIZED: Universal padding standard applied

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import { serviceGroups, services } from "@/components/shared/nav/navigation";

const groupImages: Record<string, string> = {
  "Architecture & Design": "/home/M2.svg",
  "Visualization & CGI": "/home/exterior-visualization.svg",
  "3D Modeling & BIM": "/home/interior-visualization.svg",
  "Immersive & Digital": "/home/architecturalWalkthrough.webp",
};

export default function ServicesOverview() {
  return (
    <section className="bg-[#114046] text-white section">
  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10 md:gap-14">
  {/* The first line is 666px at the 48px heading size: kept on one line from
      md, and the row layout waits for xl, where it fits beside the text. */}
  <h2 className="heading xl:shrink-0 flex flex-col gap-2 md:gap-4 [word-spacing:0.15em]">
    <span className="md:whitespace-nowrap">Every visual you need, from</span>
    <span className="font-bold text-white">one Studio</span>
  </h2>

  <p className="text-small text-white/70 max-w-md">
    {services.length} services in four groups. Pick one, or combine them into a full launch package.
  </p>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
        {serviceGroups.map((group) => (
          <div key={group.title} className="bg-white/[0.04] rounded-xl overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative w-full aspect-video overflow-hidden bg-white/10">
              <Image
                src={groupImages[group.title] ?? "/home/M2.svg"}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h3 className="text-small-bold">{group.title}</h3>

              <ul className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8">
                {group.services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-small text-white/70 hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mt-12 md:mt-16">
        <p className="text-small text-white/70">Not sure which service fits your project?</p>
        <Link href="/studio/#scheduleCall">
          <button className="btn-pill bg-white/10 text-white border border-white/30 hover:bg-white hover:text-black">
            Request a Proposal
          </button>
        </Link>
      </div>
    </section>
  );
}