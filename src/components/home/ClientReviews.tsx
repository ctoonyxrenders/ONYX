// src/components/home/ClientReviews.tsx
// OPTIMIZED: Removed excessive padding (was p-5 md:p-10 3xl:p-24), standardized to universal spacing

import Image from "next/image";
import { urlFor, getReviews } from "@/lib/sanity";
import TestimonialAccordion, { type TestimonialCard } from "./TestimonialAccordion";
import { HEADING, BODY } from "@/components/shared/typography";

interface Testimony {
  name: string;
  designation: string;
  img: any;
  logo: any;
  review: string;
}

const AVATAR_COUNT = 5;

export default async function ClientReviews() {
  const testimonials: Testimony[] = await getReviews();

  const cards: TestimonialCard[] = testimonials.map((t) => ({
    name: t.name,
    designation: t.designation,
    review: t.review,
    imgUrl: urlFor(t.img).width(2000).fit("max").auto("format").url(),
    logoUrl: urlFor(t.logo).width(800).auto("format").url(),
  }));

  const avatars = testimonials.slice(0, AVATAR_COUNT).map((t) => ({
    name: t.name,
    url: urlFor(t.img).width(120).height(120).fit("crop").auto("format").url(),
  }));

  return (
    <section className="section bg-white">
      {/* HEADING */}
      <h2 className={`${HEADING} text-center max-w-3xl mx-auto`}>
        Discover the impact we've made for our <span className="font-bold text-[#4a5f66]">Clients</span>
      </h2>

      {/* COMMUNITY BADGE */}
      <div className="flex items-center gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-black w-fit px-4 md:px-6 py-2 md:py-3 mx-auto mt-8 md:mt-12">
        <div className="-space-x-2 flex">
          {avatars.map((avatar) => (
            <div key={avatar.name} className="relative aspect-square w-[28px] md:w-[32px]">
              <Image
                src={avatar.url}
                alt=""
                fill
                sizes="(max-width: 768px) 28px, (max-width: 2048px) 32px, 3vw"
                className="rounded-full border border-black object-cover"
              />
            </div>
          ))}
        </div>
        <span className={`${BODY} text-xs md:text-sm lg:text-base`}>Our Community</span>
      </div>

      {/* TESTIMONIALS */}
      <div className="mt-8 md:mt-12">
        <TestimonialAccordion items={cards} />
      </div>
    </section>
  );
}