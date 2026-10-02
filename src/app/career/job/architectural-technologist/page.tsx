import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Architectural Technologist | Documentation",
  jobDescription: `You will produce construction and permit documentation — the drawings a contractor builds
                   from. Detail knowledge matters more than drawing speed in this role.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "Architectural Technologist",
  location: "On-site",
  jobType: "Full-Time · On-site · Reports to Founder",
  keyResponsibilities: [
    "Prepare construction drawing sets, details and schedules",
    "Produce permit and planning submission packages",
    "Develop assembly and junction details to a buildable standard",
    "Check drawings for code and regulation compliance",
    "Keep documentation consistent with the coordinated BIM model",
    "Respond to contractor and consultant queries during delivery",
  ],
  skillExperience: [
    "Degree or diploma in architecture, architectural technology or equivalent",
    "3+ years producing construction documentation",
    "Revit and AutoCAD to professional standard",
    "Real detail knowledge: waterproofing, thermal performance, fixings, tolerances",
    "Familiarity with at least one international code framework",
    "Precision with revisions, registers and issue records",
  ],
  offer: [
    "Competitive salary, reviewed annually.",
    "Full ownership of drawing sets, from details through to permit submission.",
    "Exposure to US and UK code frameworks on real submissions.",
    "A coordinated BIM model to document from, not drawings built in isolation.",
    "Recognition as the studio's technical authority on assemblies and buildability.",
  ],
  callToAction:
    "At ONYX RENDERS, our drawings get built from. If you know how a junction actually goes together and care that it's drawn properly, we'd like to see your work.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
