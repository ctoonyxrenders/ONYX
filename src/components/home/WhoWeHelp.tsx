// src/components/home/WhoWeHelp.tsx
// OPTIMIZED: Universal padding standard applied

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import { ArrowRight, GraduationCap } from "lucide-react";
import { HEADING, BODY } from "@/components/shared/typography";

interface Audience {
  title: string;
  body: string;
  outcome: string;
  href: string;
  image: string;
  tint: string;
}

const audiences: Audience[] = [
  {
    title: "Real Estate Developers",
    body: "For real estate developers and construction companies launching off-plan.",
    outcome: "Visuals that sell units",
    href: "/who-we-help/developers",
    image: "/home/who we help/developers.webp",
    tint: "#114046",
  },
  {
    title: "Architects & landscape",
    body: "For architects and landscape architects pitching designs, approvals and competitions.",
    outcome: "Images that win projects",
    href: "/who-we-help/architects",
    image: "/home/who we help/architects.webp",
    tint: "#2f5d3a",
  },
  {
    title: "Interior designers",
    body: "For interior designers presenting concepts, materials and finishes.",
    outcome: "Faster client approvals",
    href: "/who-we-help/interior-designers",
    image: "/home/who we help/interior.webp",
    tint: "#7a5230",
  },
  {
    title: "Homeowners",
    body: "For homeowners planning a new build, extension or renovation.",
    outcome: "Decide with confidence",
    href: "/who-we-help/homeowners",
    image: "/home/who we help/homeowner.webp",
    tint: "#2b4a7a",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="section">
      <div className="flex flex-wrap items-baseline justify-between gap-6 md:gap-8">
        <h2 className={`${HEADING} tracking-wide [word-spacing:0.025em]`}>
          What are you working on?
        </h2>

        <Link
          href="/who-we-help/developers"
          className={`${BODY} group inline-flex items-center gap-2 underline underline-offset-4 hover:text-[#114046] transition-colors whitespace-nowrap`}
        >
          See how we help
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {audiences.map((audience) => (
          <Link
            key={audience.href}
            href={audience.href}
            className="group bg-white/60 border border-black/10 rounded-2xl overflow-hidden flex flex-col hover:border-black/25 transition-colors"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#bac3c833]">
              <Image
                src={audience.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>

            <div className="p-5 md:p-6 flex flex-col flex-1 gap-3 md:gap-4">
              <h3 className={`${BODY} font-bold group-hover:text-[#114046] transition-colors`}>
                {audience.title}
              </h3>

              <p className={`${BODY} text-justify`}>
                {audience.body}
              </p>

              <p className={`${BODY} font-medium mt-auto pt-1 md:pt-3 `} >
                {audience.outcome}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className={`${BODY} mt-6 md:mt-10 flex flex-wrap items-center gap-3 `}>
        <GraduationCap className="w-6 h-6 text-[#7D7D7D] shrink-0" />
        Architecture or interior design student?
        <Link
          href="/who-we-help/students"
          className="group text-black font-bold inline-flex items-center gap-2 underline underline-offset-4 hover:text-[#114046] transition-colors"
        >
          Get a Student Quote
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </p>
    </section>
  );
}