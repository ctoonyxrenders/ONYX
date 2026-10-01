import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full section overflow-x-hidden bg-white">
      <h1 className="text-[#B9B9B933] text-[26.8vw] leading-none">
        <span className="relative left-[-3.5vw]">ABOUT</span>
        <span className="relative right-[-3.5vw]">US</span>
      </h1>
      <h2 className="heading mt-6 mb-4 md:mb-6">
        <span>Architects who </span>
        <span className="font-bold text-[#114046]">Visualize.</span>
        <br />
        <span>Not a render farm.</span>
      </h2>
      <p className="para mb-6 md:mb-8 w-full lg:w-4/5">
        A leading name in high-end 3D architectural visualization and large-scale modeling. 1,100+ projects, 30+ countries, delivered by a studio of practising architects, 3D artists and BIM specialists.
      </p>
      <div className="flex items-center gap-6 md:gap-8 flex-wrap">
        <Link href="/gallery">
          <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
            See Work
          </button>
        </Link>
        <Link href="/studio/#scheduleCall">
          <button className="btn-pill bg-transparent text-[#114046] border border-[#114046] hover:bg-[#114046] hover:text-white">
            Request a Proposal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;