// src/components/home/CaseStudies.tsx
// OPTIMIZED: Consistent universal spacing, removed unnecessary code

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import styles from "./home.module.css";

interface CaseStudy {
  tag: string;
  title: string;
  challenge?: string;
  delivered?: string;
  result: string;
  image: string;
  href: string;
}

const feature: CaseStudy = {
  tag: "Developer",
  title: "Luxury villa community, off-plan launch",
  challenge: "Launch sales before construction started, with nothing built to show buyers.",
  delivered: "12 exterior renders, 6 interiors and a 60-second film.",
  result: "Result: first phase sold before groundbreaking",
  image: "/home/exterior-visualization.svg",
  href: "/case-studies",
};

const secondary: CaseStudy[] = [
  {
    tag: "Architect",
    title: "Mixed-use tower, planning approval",
    result: "Result: approved on first submission",
    image: "/home/M2.svg",
    href: "/case-studies",
  },
  {
    tag: "Interior designer",
    title: "Penthouse redesign, client sign-off",
    result: "Result: approved with no changes on site",
    image: "/home/interior-visualization.svg",
    href: "/case-studies",
  },
];

const thumbnails = [
  "/home/1.webp",
  "/home/5.webp",
  "/home/4.webp",
  "/home/6.webp",
  "/home/2.webp",
  "/home/3.webp",
];

const READ_MORE = "text-x-small text-[#7D7D7D] group-hover:text-[#114046] underline underline-offset-4 inline-block mt-3 transition-colors";

function Tag({ label }: { label: string }) {
  return (
    <span className="text-x-small absolute top-4 left-4 md:top-6 md:left-6 bg-black/70 text-white px-3 py-1 md:px-4 md:py-2 rounded-full">
      {label}
    </span>
  );
}

export default function CaseStudies() {
  return (
    <section className="section">
      {/* Section heading */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 md:gap-8">
        <h2 className="heading xl:shrink-0 flex flex-col gap-2 md:gap-4 [word-spacing:0.25em] tracking-wide max-w-2xl">
          <span className="lg:whitespace-nowrap">Work that moved projects</span>
          <span>forward</span>
        </h2>

        <p className="text-small max-w-md">
          Every project starts with a goal. Here&apos;s what we delivered and what it achieved.
        </p>
      </div>

      {/* Grid: Feature left, two stacked right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mt-12 md:mt-16">
        {/* FEATURE CASE STUDY */}
        <Link href={feature.href} className="group bg-[#bac3c833] rounded-xl overflow-hidden flex flex-col">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={feature.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
            <Tag label={feature.tag} />
          </div>

          <div className="p-6 md:p-8 flex flex-col flex-1 gap-4 md:gap-6">
            <h3 className="text-small font-bold group-hover:text-[#114046] transition-colors">
              {feature.title}
            </h3>

            <dl className="flex flex-col gap-3">
              <div className="flex gap-4">
                <dt className="text-x-small w-20 shrink-0">Challenge</dt>
                <dd className="text-small">{feature.challenge}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-x-small w-20 shrink-0">Delivered</dt>
                <dd className="text-small">{feature.delivered}</dd>
              </div>
            </dl>

            <div className="mt-auto pt-6 md:pt-8">
              <p className="text-small font-bold border-t border-black/10 pt-4 md:pt-5">
                {feature.result}
              </p>
              <span className={READ_MORE}>Read case study</span>
            </div>
          </div>
        </Link>

        {/* SECONDARY (TWO STACKED) */}
        <div className="flex flex-col gap-5 md:gap-6">
          {secondary.map((study) => (
            <Link key={study.title} href={study.href} className="group bg-[#bac3c833] rounded-xl overflow-hidden flex flex-col flex-1">
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={study.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
                <Tag label={study.tag} />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1 gap-3 md:gap-4">
                <h3 className="text-small font-bold group-hover:text-[#114046] transition-colors">
                  {study.title}
                </h3>
                <p className="text-small font-bold mt-auto">{study.result}</p>
                <span className={READ_MORE}>Read case study</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA + Gallery link */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mt-10 md:mt-14">
        <Link href="/case-studies" className="text-small underline underline-offset-4 hover:text-[#114046] transition-colors">
          All case studies
        </Link>
        <Link href="/studio/#scheduleCall">
          <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
            Request a Proposal
          </button>
        </Link>
      </div>

      {/* GALLERY STRIP - Marquee */}
      <div className="overflow-x-hidden mt-12 md:mt-16">
        <div style={{ animationDuration: "30s" }} className={`flex w-fit items-center gap-4 md:gap-6 ${styles.slider}`}>
          {[...thumbnails, ...thumbnails, ...thumbnails].map((src, idx) => (
            <Link
              key={idx}
              href="/gallery"
              className="relative w-[280px] md:w-[360px] aspect-video shrink-0 overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 280px, (max-width: 2048px) 360px, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>

      <Link href="/gallery" className="text-small underline underline-offset-4 hover:text-[#114046] transition-colors inline-block mt-6 md:mt-8">
        Browse the full gallery
      </Link>
    </section>
  );
}