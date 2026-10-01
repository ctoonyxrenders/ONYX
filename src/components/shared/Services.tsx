import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="w-full relative h-[30vw] bg-[#114046] flex items-center justify-center">
        <div className="absolute top-[calc(50%-6vw)] w-[100vw] border-[#1d6871] border-[1px]"></div>
        <p className="absolute bottom-0 translate-y-[10%] text-[26vw] text-[#b9b9b98c] pointer-events-none opacity-20">
          SERVICES
        </p>
      </div>

      {/* Services Section - Adjusted Positioning */}
      {/* 3xl:max-w-[70%] */}
      <div className="relative  mx-auto flex max-lg:flex-col max-lg:items-center max-lg:justify-start items-start justify-between gap-10">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="para !font-medium text-start max-lg:text-center">
            Architectural Visualization
          </h1>
          <ul className="text-small font-thin text-start max-lg:text-center space-y-1">
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                2D design
              </Link>
            </li>
            <li>
              <Link href="/gallery?category=Exterior" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Exterior 3D Rendering
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Residential Rendering
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Commercial Architectural 3D Visualization
              </Link>
            </li>
            <li>
              <Link href="/gallery?category=Interior" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Interior 3D Visualization
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1 className="para !font-medium text-start max-lg:text-center">
            Pano 360
          </h1>
          <ul className="text-small font-thin text-start max-lg:text-center space-y-1">
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Walkthrough
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                360 Virtual Tours
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1 className="para !font-medium text-start max-lg:text-center">
            Animation
          </h1>
          <ul className="text-small font-thin text-start max-lg:text-center space-y-1">
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Architectural Animation
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                3D Animation
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1 className="para !font-medium text-start max-lg:text-center">
            3D Modelings
          </h1>
          <ul className="text-small font-thin text-start max-lg:text-center space-y-1">
            <li>
              <Link href="/gallery?category=3D Modelling" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Architectural 3D Modelings
              </Link>
            </li>
            <li>
              <Link href="/gallery?category=Product Modeling" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Product Modeling
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Furniture Modeling
              </Link>
            </li>
            <li>
              <Link href="/gallery?category=3D Floor Plan" className="hover:text-[#8ce1e8d3] duration-300 font-light">
                Floor Plan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center items-center my-20">
        <Link href="/career">
        <button className=" text-white border border-white btn-pill hover:bg-white hover:text-[#114046]">
          Join our team
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
