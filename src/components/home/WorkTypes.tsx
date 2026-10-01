import { blurDataURL } from "@/constants";
import Image from "next/image";
import React from "react";

// 16:9 up to lg, full viewport height above it. Below lg the viewport is far
// taller than 16:9, so forcing 100vh there is what crops these landscape
// images at the sides.
const BLOCK = "relative w-full aspect-video lg:aspect-auto lg:min-h-screen";

export default function WorkTypes() {
  return (
    <section className="flex flex-col text-white">
      <div className={BLOCK}>
        <Image
          src={workItems[0].imageSrc}
          alt={workItems[0].alt}
          placeholder="blur"
          blurDataURL={blurDataURL}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-end justify-center">
          <h3 className="text-lg md:text-3xl pb-2 text-center">
            {workItems[0].title}
          </h3>
        </div>
      </div>

      {/* Two half-width panels on desktop. Each keeps 16:9 at every width —
          they are already half the screen, so they never needed full height. */}
      <div className="flex flex-col lg:flex-row">
        {[workItems[1], workItems[2]].map((item) => (
          <div key={item.title} className="relative aspect-video w-full lg:w-1/2">
            <Image
              src={item.imageSrc}
              alt={item.alt}
              placeholder="blur"
              blurDataURL={blurDataURL}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end">
              <h3 className="text-lg md:text-3xl pb-2 pl-3">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className={BLOCK}>
        <video
          muted
          loop
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={workItems[3].imageSrc}
        />
        <div className="absolute inset-0 bg-gray-200/20 flex items-end justify-center">
          <h3 className="text-lg md:text-3xl pb-2 lg:pb-6 text-center">
            {workItems[3].title}
          </h3>
        </div>
      </div>
    </section>
  );
}

const workItems = [
  {
    title: "3D MODELING",
    imageSrc: "/home/M2.svg",
    alt: "3D architectural model",
  },
  {
    title: "INTERIOR VISUALIZATION",
    imageSrc: "/home/interior-visualization.svg",
    alt: "Interior visualization",
  },
  {
    title: "EXTERIOR VISUALIZATION",
    imageSrc: "/home/exterior-visualization.svg",
    alt: "Exterior visualization",
  },
  {
    title: "Architectural Walkthrough",
    imageSrc: "/home/ArchitecturalAnimation1.mp4",
    alt: "Architectural walkthrough animation",
  },
];