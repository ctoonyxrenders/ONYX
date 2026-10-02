import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "BIM Modeler / Coordinator",
  jobDescription: `You will build and coordinate Revit models, run clash detection and keep models aligned
                   across disciplines. This role sits closest to construction, and the clashes you catch here
                   save clients real money on site.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "BIM Modeler / Coordinator",
  location: "On-site",
  jobType: "Full-Time · On-site · Reports to Founder",
  keyResponsibilities: [
    "Build and maintain Revit models to agreed LOD",
    "Run clash detection and issue clear coordination reports",
    "Coordinate architectural models against structural and MEP input",
    "Maintain families, templates and shared parameters",
    "Produce schedules and quantity extracts where required",
    "Keep the coordinated model and the documentation set in step",
  ],
  skillExperience: [
    "2+ years in BIM, with projects coordinated through to construction",
    "Strong Revit, including families and worksets",
    "Navisworks or equivalent clash detection",
    "Working knowledge of building assemblies and construction sequencing",
    "Clear written reporting, since your output is read by external consultants",
    "Methodical file and version discipline",
  ],
  offer: [
    "Competitive salary, reviewed annually.",
    "Coordination on live international projects, carried through to construction.",
    "A direct working relationship with a registered architect on every model.",
    "Support toward BIM certification and ISO 19650 training.",
    "The authority to hold a model until clashes are properly resolved.",
  ],
  callToAction:
    "At ONYX RENDERS, the clashes you catch are the ones a contractor never has to price. If you'd rather solve a problem on screen than on site, send us your details.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
