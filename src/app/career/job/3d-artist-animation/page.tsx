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
    title: "3D ARTIST | Animation team",
    jobDescription: `At ONYX RENDERS, we transform architectural visions into dynamic, lifelike animations that
captivate and inspire. We are seeking a talented 3D Artist to join our Animation Team and
contribute to the creation of high-end, photorealistic animations for architectural and visualization projects.`,
    position: "3D Artist for Animation Team",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time",
    keyResponsibilities: [
      "Create stunning, photorealistic 3D animations for architectural interiors, exteriors, and landscapes.",
      "Develop detailed 3D models, materials, textures, lighting, and environments optimized for animation",
      "Animate architectural elements, camera movements, and environmental effects to enhance visual storytelling.",
      "Work closely with designers, architects, and the rendering team to ensure animation accuracy and artistic quality.",
      "Optimize scenes for performance without compromising visual fidelity.",
      "Stay up-to-date with the latest animation techniques, tools, and trends in architectural visualization",
      "Revise animations based on client feedback and project adjustments.",
    ],
    skillExperience: [
      "Strong experience in 3D animation and architectural visualization.",
      "Proficiency in industry-standard software, including 3ds Max, Blender, Unreal Engine, Lumion, and D5 Render",
      "In-depth understanding of key animation principles, camera movements, and scene composition.",
      "Experience with rendering engines like V-Ray and Corona for high-quality output.",
      "Ability to handle complex scenes, manage timelines, and meet tight deadlines.",
      "A strong portfolio showcasing architectural animations and visual storytelling.",
      "Excellent communication and collaboration skills.",
    ],
    offer: [
      "Competitive salary based on experience and skill level.",
      "The opportunity to work on prestigious international projects.",
      "A creative and dynamic work environment with access to the latest industry tools.",
      "Career growth opportunities and ongoing professional development.",
      "The chance to be part of a team that values innovation, artistry, and attention to detail.",
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
    callToAction: `At ONYX RENDERS, we bring architecture to life through motion and artistry. If you're passionate about creating immersive 3D animations and want to work with a world-class
                  team, we’d love to hear from you!`,
  };
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
