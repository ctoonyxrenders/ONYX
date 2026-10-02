import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Internship | Architecture & Visualization",
  jobDescription: `For final-year and recently graduated architecture and interior design students who want to
                   learn visualization inside a working studio. This studio has been built this way from the
                   start, and strong interns are offered permanent roles.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "Architecture & Visualization Intern",
  location: "On-site",
  jobType: "3–6 months · On-site · Reports to Design Lead",
  keyResponsibilities: [
    "Support modeling, drafting and visualization on live projects",
    "Learn the full workflow from brief through clay model to final delivery",
    "Take increasing ownership of small deliverables as you progress",
    "Keep files and assets organised to studio standard",
  ],
  skillExperience: [
    "Currently studying or recently graduated in architecture or interior design",
    "Working knowledge of SketchUp, Revit or AutoCAD",
    "A portfolio of academic work, whatever stage it is at",
    "Willingness to learn and take direction",
    "Reliability on deadlines",
  ],
  offer: [
    "A paid monthly stipend, not an unpaid placement.",
    "Mentoring from a registered architect and senior artists, with weekly feedback.",
    "Live international projects from your first month, not filing and admin.",
    "A portfolio piece from real work, with permission to publish it.",
    "Permanent roles offered to strong interns, which is how much of this team was built.",
  ],
  callToAction:
    "At ONYX RENDERS, most of this team started exactly where you are now. If you're in your final year and want to learn visualization inside a working studio, send us your portfolio.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
