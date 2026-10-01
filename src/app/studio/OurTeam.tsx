import { blurDataURL } from "@/constants";
import Image from "next/image";
import React from "react";
import { urlFor, getTeamMembers } from "../../lib/sanity";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: any;
  alt: string;
}

async function OurTeam() {
  const teamMembers: TeamMember[] = await getTeamMembers();
  const sortedTeamMembers = teamMembers.sort((a, b) => a.id - b.id);

  return (
    <section className="w-full section bg-white">
      <div className="mb-10 md:mb-14">
        <p className="text-xs md:text-sm lg:text-base text-[#999999] uppercase tracking-widest mb-6 md:mb-8">
          THE STUDIO
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8 mb-10 md:mb-14">
          <h2 className="heading lg:w-1/2 flex flex-col gap-2 md:gap-4">
            <span>The people who will actually</span>
            <span> be on your project</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base lg:w-1/3">
            You work with the same team from brief to delivery, led by a single point of contact.
          </p>
        </div>
        <button className="btn-pill border border-[#114046] bg-white text-[#114046] hover:text-white hover:bg-[#114046] hover:border-[#114046] cursor-pointer transition-colors text-xs lg:text-sm xl:text-base min-w-[210px] flex items-center justify-center gap-3 mx-auto px-6 py-2 lg:px-8 lg:py-3">
          <div className="-space-x-2 flex">
            {sortedTeamMembers.slice(0, 5).map((member) => (
              <div key={member.id} className="w-8 h-8 relative">
                <Image
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  src={urlFor(member.image).url()}
                  alt={member.alt}
                  className="rounded-full border border-white object-cover"
                  fill
                  unoptimized
                />
              </div>
            ))}
          </div>
          <span className="text-xs md:text-sm lg:text-base font-semibold">8+ Members</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {sortedTeamMembers.map((member) => (
          <div key={member.id} className="flex flex-col cursor-pointer">
            <div className="relative w-full aspect-[3/4] mb-4 md:mb-6">
              <Image
                placeholder="blur"
                blurDataURL={blurDataURL}
                src={urlFor(member.image).url()}
                alt={member.alt}
                className="object-cover"
                fill
                unoptimized
              />
            </div>
            <h3 className="text-xs md:text-sm lg:text-base font-bold">
              {member.name.toUpperCase()}
            </h3>
            <p className="text-xs md:text-sm lg:text-base text-[#999999] mt-2 md:mt-3 font-semibold">
              {member.designation.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurTeam;