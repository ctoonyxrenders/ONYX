import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    // Pulled up behind the transparent site header (AppWrapper offsets every
    // page by --header-h), so the header sits on white, not the grey body.
    // Top padding equals the header height only, so "ABOUT US" starts
    // directly below the navbar.
    <div className="w-full section overflow-x-hidden bg-white -mt-[var(--header-h)] pt-[var(--header-h)]">
      {/* Full-bleed, one line: the negative margin cancels the gutter, so the
          words are cropped by the screen edges. "ABOUT US" is 4.636em wide in
          Century Gothic; shifted 0.25em left at 24.2vw, about a third of the
          "A" is cut on the left and half of the "S" on the right. Every value
          is relative to the font size, so the crop is identical at all widths. */}
      <h1 className="text-[#B9B9B933] text-[24.2vw] leading-none whitespace-nowrap -mx-[var(--gutter)]">
        <span className="block -ml-[0.25em]">ABOUT US</span>
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