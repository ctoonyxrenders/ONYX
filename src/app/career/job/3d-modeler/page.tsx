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
  howToApply: (string | React.ReactNode)[];
  callToAction: string;
}

const page = () => {
  const jobData = {
    title: "3D Modeler",
    jobDescription: `At ONYX RENDERS, we transform architectural concepts into precise, high-quality 3D models
                    that form the foundation of stunning visualizations. We are seeking a talented 3D Modeler to 
                    join our team and contribute to our growing portfolio of world-class architectural and industrial 
                    projects.`,
    position: "3D Modeler",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time",
    keyResponsibilities: [
      "Create detailed and accurate 3D models of architectural structures, interiors, and urban environments.",
      "Develop high-quality assets with precise topology, UV mapping, and material optimization.",
      "Work with 3ds Max, SketchUp Pro, Blender, and Revit to build complex models.",
      "Prepare models for high-end rendering in V-Ray, Corona, Lumion, and D5 Render.",
      "Ensure models are optimized for real-time visualization in Unreal Engine when required.",
      "Interpret architectural blueprints, CAD files, and design references to create realistic 3D representations.",
      "Collaborate with visualization artists and designers to maintain quality and consistency across projects.",
    ],
    skillExperience: [
      "Strong experience in 3D modeling for architecture, interiors, or urban design.",
      "Proficiency in 3ds Max, SketchUp Pro, Blender, and Revit.",
      "Knowledge of V-Ray, Corona, Lumion, and D5 Render for rendering workflows.",
      "Understanding of UV mapping, texturing, and material setup.",
      "Familiarity with CAD files and architectural documentation.",
      "Experience with Unreal Engine for real-time visualization is a plus.",
      "Strong problem-solving skills and attention to detail.",
      "Ability to work efficiently under deadlines while maintaining high-quality output.",
    ],
    offer: [
      "Competitive salary based on experience and expertise.",
      "Exciting global projects with leading architects and designers.",
      "A creative, fast-paced work environment that values innovation.",
      "Access to industry-leading tools and software for advanced modeling and rendering.",
      "Continuous learning, training, and career development opportunities.",
    ],
    howToApply: [
      "Read the job description thoroughly",
      <>
        Complete the assessment in this document{" "}
        <a
          className="inline mb-1 text-blue-600 underline"
          href="https://docs.google.com/document/d/1X4JH5k3a8b9c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </>,
      "Upload your assessment to Google Drive",
      "Make the Google Drive folder public",
      "Copy the link of the folder and paste it in the application form",
    ],
    callToAction: `At ONYX RENDERS, precision meets artistry. If you are passionate about 3D modeling and want
                   to be part of a world-class team, we’d love to hear from you! Apply now and take your career 
                   to the next level!`,
  };

  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
