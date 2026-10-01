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
  howToApply: (string | React.ReactNode)[];
  callToAction: string;
}

const page = () => {
  const jobData: jobDataType = {
    title: "2D Architectural Drafting",
    jobDescription:
      "At Onyx Renders, we bridge the gap between design concepts and reality through precise and detailed architectural drafting. We are looking for a skilled 2D Architectural Drafting Specialist to join our team and contribute to the creation of high-quality technical drawings for architectural and visualization projects.",
    position: "2D Architectural Drafting Specialist",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time",
    keyResponsibilities: [
      "Produce accurate and detailed 2D architectural drawings for residential, commercial, and industrial projects.",
      "Develop floor plans, elevations, sections, and technical details based on architectural specifications.",
      "Interpret and convert CAD files, sketches, and 3D models into precise 2D representations.",
      "Ensure drawings are optimized for use in 3D visualization, rendering, and construction documentation.",
      "Collaborate with architects, designers, and 3D modelers to maintain consistency and accuracy across projects.",
      "Adhere to industry standards, regulations, and client requirements for all technical drawings.",
      "Revise and update drawings based on feedback and project changes.",
    ],
    skillExperience: [
      "Strong experience in architectural drafting and technical drawing.",
      "Proficiency in AutoCAD and Revit for precise drafting.",
      "Understanding of architectural design principles, building codes, and construction detailing.",
      "Experience working with 3D modelers and visualization teams to ensure seamless integration.",
      "Ability to interpret blueprints, site plans, and construction documents.",
      "Strong organizational skills and attention to detail.",
      "Ability to work under tight deadlines while maintaining high accuracy.",
    ],
    offer: [
      "Competitive salary based on experience and expertise.",
      "Collaboration on international projects with top architects and designers.",
      "A structured yet creative work environment that values technical excellence.",
      "Access to the latest industry tools and software for high-end drafting.",
      "Continuous learning opportunities and career growth.",
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
      "At Onyx Renders, precision in drafting is the foundation of great design. If you're passionate about architectural detailing and want to be part of a world-class team, we'd love to hear from you!",
  };
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
