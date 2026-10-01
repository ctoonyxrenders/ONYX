import { Star } from "@/icons";
import React from "react";
import styles from './home.module.css'
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="my-16">
      <div className="flex justify-center gap-1">
        {Array.from({ length: 5 }, (_, idx) => (
          <Star key={idx} />
        ))}
      </div>
      <h2 className="text-center heading w-[63%] mx-auto mt-5">
        Based in <span className="text-[#114046]">Pakistan</span>{" "}, Trusted Worldwide - A Leading Name in High-End 3D Architectural Visualization & Large-Scale Modeling.
      </h2>
      <div className="flex flex-col md:flex-row mx-10 gap-4 justify-center items-center mt-16">
      <Link href="/studio/#scheduleCall">
        <button className="btn-pill btn-theme hover:bg-[#ff565605] hover:text-black">
          Schedule a Call
        </button>
        </Link>
        <Link href="/gallery">
        <button className="btn-pill text-[#114046] border border-[#114046] hover:bg-[#114046] hover:text-white">
          Portfolio
        </button>
        </Link>
      </div>
    </section>
  );
}
