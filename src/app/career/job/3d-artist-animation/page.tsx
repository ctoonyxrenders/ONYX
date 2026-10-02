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
    title: "3D Artist | Animation Team",
    jobDescription: `You will create walkthroughs, flyovers and launch films that developers use to sell projects
and architects use to win them. Films are often the highest-value deliverable on a project, and the
sequence is yours to carry from camera plan to final grade.`,
    position: "3D Artist for Animation Team",
    location: "[Specify if Remote or Office-Based]",
    jobType: "Full-Time · On-site · Reports to Visualization Lead",
    keyResponsibilities: [
      "Plan camera moves and shot sequences from the project brief",
      "Model, texture and light scenes optimised for animation",
      "Animate cameras, entourage and environmental effects",
      "Manage render passes, sequence output and farm scheduling",
      "Edit, grade and finish in After Effects or DaVinci Resolve, with sound where required",
      "Keep film and still views visually consistent on the same project",
    ],
    skillExperience: [
      "2+ years producing architectural animation",
      "3ds Max with Corona or V-Ray, or a real-time pipeline (Unreal, Lumion, D5)",
      "Confident editing and compositing in After Effects or Premiere",
      "A showreel demonstrating camera work and pacing, not only rendered movement",
      "Understanding of sequence timing and how a film holds attention",
      "Ability to manage long render schedules against fixed deadlines",
    ],
    offer: [
      "Competitive salary, reviewed annually.",
      "Full ownership of a sequence, from camera plan through to final grade.",
      "RTX workstations and render-farm capacity, so you are not waiting on frames.",
      "Films used in launch campaigns and investor presentations, with reel rights retained.",
      "Budget for the sound, stock and plugin tools that lift the finish.",
    ],
    callToAction:
      "At ONYX RENDERS, the film is often the piece a client remembers. If you know how pacing and camera work make a building feel inevitable, we'd like to see your reel.",
  };
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
