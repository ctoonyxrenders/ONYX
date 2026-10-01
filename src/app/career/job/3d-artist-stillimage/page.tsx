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
  const jobData: jobDataType = {
    title: "3D ARTIST | Still image team",
    jobDescription:
      "At Onyx Renders, we specialize in creating high-end architectural visualizations that push the boundaries of photorealism. We are looking for a Still Image Rendering Artist to join our team and contribute to our portfolio of world-class imagery.",
    position: "Still Image Rendering Artist",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time",
    keyResponsibilities: [
      "Create photorealistic exterior and interior renderings for architectural projects.",
      "Develop detailed 3D models, textures, and materials for high-quality visualization.",
      "Utilize V-Ray, Corona, Lumion, and D5 Render to produce industry-leading visuals.",
      "Apply advanced lighting and composition techniques to enhance realism.",
      "Collaborate with architects and designers to ensure accurate representation of concepts.",
      "Perform post-production edits in Photoshop or After Effects when necessary.",
      "Optimize workflow for efficiency while maintaining high visual fidelity.",
    ],
    skillExperience: [
      "Proven experience in architectural visualization and rendering.",
      "Strong proficiency in 3ds Max, SketchUp Pro, and Blender.",
      "Expertise in V-Ray, Corona, Lumion, and D5 Render for high-end rendering.",
      "Solid understanding of lighting, materials, composition, and camera settings.",
      "Ability to interpret architectural plans and translate them into compelling visuals.",
      "Experience with Revit for BIM-based projects is a plus.",
      "Knowledge of post-production tools (Photoshop, After Effects) for final enhancements.",
      "Strong attention to detail, problem-solving skills, and artistic sensibility.",
    ],
    offer: [
      "Competitive salary based on experience and skill level.",
      "Opportunity to work on global projects with top architects and designers.",
      "A collaborative, creative work environment that fosters innovation.",
      "Access to the latest tools and software for cutting-edge visualization.",
      "Continuous learning opportunities and career development.",
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
    callToAction:
      "At Onyx Renders, we bring architectural visions to life. If you're passionate about creating stunning, high- end visualizations, we'd love to hear from you!",
  };
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
