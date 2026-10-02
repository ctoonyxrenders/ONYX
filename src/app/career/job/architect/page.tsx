import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Architect | Design Team",
  jobDescription: `ONYX RENDERS is an architecture, visualization and design coordination studio working
                   with architects, developers and design teams in more than 30 countries. We are looking for
                   an architect to take projects from brief through design development — knowing that the
                   visualization, BIM and documentation teams working on your drawings sit in the same room.`,
  // Department line, shown under the job type.
  position: "Architecture & Design",
  location: "On-site",
  jobType: "Full-Time · On-site · Reports to Founder",
  keyResponsibilities: [
    "Develop concepts into resolved designs: plans, sections, elevations and key details",
    "Work directly with clients and consultants on design intent, options and revisions",
    "Set the design logic the visualization and BIM teams build from",
    "Review coordination and documentation output for design accuracy",
    "Contribute to feasibility studies, planning and permit submissions",
    "Mentor junior architects and interns on live projects",
  ],
  skillExperience: [
    "B.Arch or equivalent; PCATP registration held or in progress",
    "2+ years in practice, with built or submitted projects you can talk through",
    "Revit or ArchiCAD, plus SketchUp or Rhino",
    "Ability to explain a design decision in writing to a client who is not an architect",
    "Strong written and spoken English for direct international client contact",
    "Comfort working to fixed programmes without losing design quality",
  ],
  offer: [
    "Competitive salary, reviewed annually against delivery and responsibility.",
    "Design ownership on international projects, not drafting someone else's scheme.",
    "Your drawings tested daily by the visualization, BIM and documentation teams.",
    "Mentoring from a registered architect, including support toward PCATP registration.",
    "A clear route to Design Lead as the studio's architecture arm grows.",
  ],
  callToAction:
    "At ONYX RENDERS, architects lead the work rather than hand it over. If you want your designs built, visualized and documented by the same team you sit with, we'd like to see your portfolio.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
