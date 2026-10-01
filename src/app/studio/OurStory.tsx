import { blurDataURL } from "@/constants";
import Image from "next/image";
import React from "react";

function OurStory() {
  return (
    <section className="w-full bg-white section">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 w-full items-start">
        {/* LEFT: Heading + Text */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 md:gap-8">
          <h2 className="heading text-center lg:text-center mb-6 md:mb-8 flex flex-col gap-2 md:gap-4">
            <span>Our Story</span>
          </h2>
          <div className="flex flex-col gap-6 md:gap-8 text-justify">
            <p className="text-xs md:text-sm lg:text-base">
              <span className="font-bold">ONYX RENDERS was founded in 2020.</span> The work behind it started four years earlier, in 2016, when Awais Khalid modeled his first wall in SketchUp on an aging desktop. By any technical measure it was poor work. His father treated it as the beginning of something and started sitting with his son in the evenings: let's try the next one. Not praise for what had been made, but interest in what could be made next.
            </p>
            <p className="text-xs md:text-sm lg:text-base">
              A decade on, that is still how this studio develops people, and how we treat a client's first rough sketch.
            </p>
            <div className="w-full h-[1px] bg-black/10"></div>
            <div className="space-y-4 md:space-y-6">
              <p className="text-xs md:text-sm lg:text-base">
                What began with renders did not stay there. Since 2020 the studio has delivered more than <span className="font-bold">1,100 projects and over 12,000 renders</span> for architects, developers and design teams in more than <span className="font-bold">30 countries</span>, across architectural and interior design, visualization and CGI, animation and immersive experiences, 3D and BIM modeling with clash detection, material specification, and full construction and permit documentation.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <p className="text-xs md:text-sm lg:text-base">
                The studio is led and staffed by <span className="font-bold">architects, and that composition is deliberate.</span> We hire architects and teach them visualization, rather than hiring visualizers and hoping they absorb construction knowledge. It is the slower route, and it is why our drawings, models and images all hold up on site.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Images */}
        <div className="hidden w-[40%] lg:flex gap-2 md:gap-4 items-start justify-end">
          <div className="aspect-[561/1310] w-[14.6vw] relative">
            <Image
              placeholder="blur"
              blurDataURL={blurDataURL}
              src="/portfolio/banner/1.svg"
              alt="banner-img"
              className="object-cover"
              fill
              unoptimized
            />
          </div>
          <div className="aspect-[561/1310] w-[14.6vw] relative mt-20">
            <Image
              placeholder="blur"
              blurDataURL={blurDataURL}
              src="/portfolio/banner/2.svg"
              alt="banner-img"
              className="object-cover"
              fill
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;