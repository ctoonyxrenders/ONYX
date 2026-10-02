import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Interior Designer",
  jobDescription: `You will design interiors that leave this studio as drawings, specifications and photoreal
                   visuals, produced by one team. Projects run from private residences to hospitality and show
                   apartments for clients in the US, UK and beyond.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "Interior Designer",
  location: "On-site",
  jobType: "Full-Time · On-site · Reports to Design Lead",
  keyResponsibilities: [
    "Produce space plans, furniture layouts and interior detailing",
    "Specify materials, finishes, lighting and furniture using real product data",
    "Build and maintain the material libraries our visualization team renders from",
    "Prepare client presentations, finish boards and option studies",
    "Work alongside the 3D team so specified materials read correctly in renders",
    "Resolve client comments through structured revision rounds",
  ],
  skillExperience: [
    "Degree in interior design or architecture",
    "2+ years of project experience with a portfolio of resolved interiors",
    "AutoCAD or Revit, plus SketchUp",
    "Genuine material knowledge: how finishes behave, cost and wear, not only how they look",
    "A trained eye for lighting and proportion",
    "Clear written English for client-facing documents",
  ],
  offer: [
    "Competitive salary, reviewed annually.",
    "See a scheme you specified rendered photorealistically within days, not after construction.",
    "Budget for material libraries, sample access and finish research.",
    "Direct presentation experience with clients in the US, UK and beyond.",
    "Your completed schemes visualized for your own portfolio at no cost.",
  ],
  callToAction:
    "At ONYX RENDERS, a scheme you specify on Monday can be rendered photorealistically by Friday. If you're tired of waiting two years to see your own work, we'd like to hear from you.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
