import React from "react";
import JobDescription from "../JobDescription";

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
  const jobData = {
    title: "3D Modeler",
    jobDescription: `You will build the models everything downstream depends on: accurate geometry from CAD,
                    Revit, PDFs or sketches, ready for rendering, animation and coordination. Clean models are
                    the difference between a smooth project and a week of corrections.`,
    position: "3D Modeler",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time · On-site · Reports to Visualization Lead",
    keyResponsibilities: [
      "Model buildings, interiors and products from supplied drawings",
      "Rebuild or clean imported CAD and Revit geometry for render use",
      "Produce clay models for client approval before materials are applied",
      "Maintain naming, layering and scene standards across the studio",
      "Flag drawing conflicts and ambiguities before they reach the render stage",
      "Prepare assets for reuse across projects",
    ],
    skillExperience: [
      "2+ years of architectural or product modeling",
      "3ds Max, SketchUp or Rhino to professional standard",
      "Ability to read a drawing set and model to correct dimensions",
      "Discipline with clean topology, naming and file organisation",
      "Speed without loss of accuracy",
      "Comfort working from incomplete or inconsistent information",
    ],
    offer: [
      "Competitive salary, reviewed annually.",
      "Clear modeling standards and templates, so you build instead of firefight.",
      "Current 3ds Max, SketchUp and Rhino licences on hardware that handles large scenes.",
      "Models reused across entire developments, not discarded after one image.",
      "A direct path into rendering or BIM, whichever interests you more.",
    ],
    callToAction:
      "At ONYX RENDERS, nothing downstream works if the model is wrong. If you take quiet pride in geometry nobody notices because it's correct, we'd like to hear from you.",
  };

  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
