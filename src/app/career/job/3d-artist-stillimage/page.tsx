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
  const jobData: jobDataType = {
    title: "3D Artist | Still Image Team",
    jobDescription:
      "You will produce exterior and interior stills at 4K professional standard for developers, architects and designers worldwide. These are the images clients sell units with and win approvals on, so lighting and composition decide whether the work succeeds.",
    position: "Still Image Rendering Artist",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time · On-site · Reports to Visualization Lead",
    keyResponsibilities: [
      "Carry a project from camera planning and clay study to final delivery",
      "Light, texture and compose interior and exterior views",
      "Post-produce in Photoshop: entourage, atmosphere, grading and clean-up",
      "Respond to client comments within structured revision rounds",
      "Keep scenes organised and assets reusable across a project",
      "Flag drawing conflicts before they reach the render stage",
    ],
    skillExperience: [
      "2+ years producing architectural stills professionally",
      "3ds Max with Corona or V-Ray (our primary pipeline); equivalent experience considered",
      "Strong Photoshop post-production",
      "A portfolio showing control of natural and artificial light, not only daytime exteriors",
      "The ability to read an architectural drawing set accurately",
      "Reliability on deadlines across time zones",
    ],
    offer: [
      "Competitive salary, reviewed annually alongside your portfolio growth.",
      "RTX workstations with current 3ds Max, Corona, V-Ray and Adobe licences.",
      "Structured art direction on every image, not approvals without feedback.",
      "Your best work credited internally and featured in studio marketing.",
      "Paid training, asset libraries and industry events.",
    ],
    callToAction:
      "At ONYX RENDERS, a single image can sell a development or win an approval. If you understand that light does most of that work, send us your portfolio.",
  };
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
