import React from "react";
import Link from "next/link";

const Careers = () => {
  return (
    <section className="w-full section bg-white">
      <div className="mb-10 md:mb-14">
        <p className="text-xs md:text-sm lg:text-base text-[#999999] uppercase tracking-widest mb-6 md:mb-8">
          CAREERS
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 md:gap-8 mb-10 md:mb-14">
          <h2 className="heading lg:w-1/2 flex flex-col gap-2 md:gap-4">
            <span>We hire architects, then</span>
            <span>teach them to render</span>
          </h2>
          <Link href="/career/#openpositions">
            <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035] transition-colors text-xs lg:text-sm xl:text-base min-w-[210px]">
              See open roles
            </button>
          </Link>
        </div>
        <p className="text-xs md:text-sm lg:text-base lg:w-2/3">
          It takes longer and it is the reason the work holds up. If you draw buildings and want to make images of them, the studio is open.
        </p>
      </div>
    </section>
  );
};

export default Careers;