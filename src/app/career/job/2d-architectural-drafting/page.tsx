import React from "react";
import JobDescription from "../JobDescription";
import { Link } from "lucide-react";

interface jobDataType {
  title: string;
  jobDescription: string;
  position: string;
  location: string;
  jobType: string;
  keyResponsibilities: string[];
  skillExperience: string[];
  offer: string[];
  callToAction: string;
}

const page = () => {
  const jobData: jobDataType = {
    title: "2D Architectural Drafting",
    jobDescription:
      "You will produce the plans, elevations and sections that support every other output in the studio, including the marketing floor plans developers use in sales material.",
    position: "2D Architectural Drafting Specialist",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time · On-site · Reports to Documentation Lead",
    keyResponsibilities: [
      "Draft floor plans, elevations, sections and details to studio standard",
      "Convert sketches, PDFs and survey information into clean CAD drawings",
      "Prepare 2D and marketing floor plans for sales use",
      "Maintain title blocks, layer standards and drawing registers",
      "Issue revisions accurately and keep drawing records current",
      "Support the documentation team on larger sets",
    ],
    skillExperience: [
      "1+ year of architectural drafting",
      "Strong AutoCAD; Revit an advantage",
      "Accuracy with dimensions, scale and annotation",
      "Ability to interpret incomplete or inconsistent information",
      "Attention to drawing conventions and consistency",
      "Dependability on short turnarounds",
    ],
    offer: [
      "Competitive salary, reviewed at six months and then annually.",
      "Structured training into Revit and BIM within your first year.",
      "Clear studio standards, templates and review, so you learn properly from the start.",
      "Work across every project type we handle, not one drawing repeated.",
      "A defined path into documentation or modeling, agreed with you.",
    ],

    callToAction:
      "At ONYX RENDERS, good drafting is where most careers in this studio start. If you're accurate, fast and want to learn BIM properly, we'd like to hear from you.",
  };
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
