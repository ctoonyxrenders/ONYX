// src/components/shared/Video.tsx
//
// Client video testimonial beside supporting copy, with a trust bar below.
// Server component — the Sanity fetch stays on the server, and an iframe needs
// no client JS.

import React from "react";
import Link from "next/link";
import { fetchFeedbackVideo } from "@/lib/sanity";
import { RefreshCw, Clock, Lock, CreditCard } from "lucide-react";

const assurances = [
  {
    Icon: RefreshCw,
    title: "Revisions included",
    body: "Rounds of changes built into every quote.",
  },
  {
    Icon: Clock,
    title: "On-time delivery",
    body: "A fixed timeline agreed before we start.",
  },
  {
    Icon: Lock,
    title: "Your files stay private",
    body: "NDA on request. White-label delivery available.",
  },
  {
    Icon: CreditCard,
    title: "Pay in milestones",
    body: "Pay as each stage is approved.",
  },
];

export const FeedbackVideo = async () => {
  const videoLink = await fetchFeedbackVideo();
  const src = videoLink?.[0]?.videoUrl;

  return (
    <section className="px-6 md:px-16 lg:px-20 section-y">
      {/* items-start lines the heading up with the top edge of the video. */}
      {/* items-center balances the copy around the video's midpoint, so it
          overhangs equally above and below rather than only at the bottom. */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#bac3c833]">
            {src && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={src}
                title="Client video testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Copy */}
        <div className="w-full lg:w-1/2">
          <h2 className="heading tracking-wide [word-spacing:0.25em] flex flex-col gap-2 md:gap-4 leading-[1.15] max-w-2xl">
            <span>Clients trust us with</span>
            <span className="font-bold ">
              launches, approvals and homes
            </span>
          </h2>

          <p className="text-small mt-6 max-w-md">
            Written reviews above stay visible for visitors who don&apos;t press
            play.
          </p>

          <div className="flex flex-wrap gap-4 mt-8 md:mt-12">
            <Link href="/studio/#scheduleCall">
              <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
                Request a Proposal
              </button>
            </Link>
            <Link href="/client-reviews">
              <button className="btn-pill border border-[#114046]  hover:bg-[#114046] hover:text-white">
                Read all reviews
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* One outer border with dividers between, so the row reads as a single
          block rather than four separate boxes. */}
      <div className="mt-12 md:mt-16 border border-black/10 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-black/10">
        {assurances.map(({ Icon, title, body }) => (
          <div key={title} className="p-6">
            <Icon className="w-6 h-6 text-[#114046]" />
            <h3 className="text-small font-bold mt-4">{title}</h3>
            <p className="text-small mt-2">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};