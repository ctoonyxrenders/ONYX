import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Real-Time / Unreal Developer",
  jobDescription: `You will build the interactive side of what we deliver: 360° tours, VR walkthroughs and 3D
                   web configurators that let a client explore a project rather than look at it. This is the
                   fastest-moving part of the studio.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "Real-Time / Unreal Developer",
  location: "On-site, hybrid considered",
  jobType: "Full-Time · Hybrid considered · Reports to Founder",
  keyResponsibilities: [
    "Build real-time scenes from production models",
    "Develop VR walkthroughs and interactive presentations",
    "Create web-based 3D configurators for unit types, finishes and options",
    "Optimise scenes for performance across desktop, mobile and headset",
    "Work with the visualization team so real-time output approaches offline quality",
    "Test and troubleshoot across devices before delivery",
  ],
  skillExperience: [
    "Unreal Engine or Twinmotion to production standard",
    "Experience optimising large architectural scenes for real time",
    "Confident lighting and material setup in a real-time pipeline",
    "Blueprint scripting or equivalent programming ability",
    "Comfort with tools that change every few months",
    "Ability to explain technical limits to non-technical clients",
  ],
  offer: [
    "Competitive salary, reviewed annually.",
    "Ownership of the studio's entire real-time and interactive output.",
    "VR hardware, high-spec GPUs and budget for the tools this field needs.",
    "Freedom to choose the pipeline, because you know it better than we do.",
    "A service line you can grow and lead as client demand increases.",
  ],
  callToAction:
    "At ONYX RENDERS, real-time is where this industry is heading, and this role owns it. If you want to build that side of a studio rather than maintain someone else's, we'd like to talk.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
