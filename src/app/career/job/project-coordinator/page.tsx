import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Project Coordinator",
  jobDescription: `You will be the single point of contact our clients rely on, keeping concurrent international
                   projects on schedule and clients informed before they need to ask. Same-day replies are a
                   promise we make, and you are how we keep it.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "Project Coordinator",
  location: "On-site",
  jobType: "Full-Time · On-site · Reports to COO",
  keyResponsibilities: [
    "Own scheduling and delivery tracking across live projects",
    "Maintain daily client communication across US, UK and other time zones",
    "Collect and clarify briefs, references and drawing sets before work starts",
    "Manage revision rounds and hold scope to what was agreed",
    "Flag delivery risks early, internally and to the client",
    "Keep project records, approvals and issue history current",
  ],
  skillExperience: [
    "2+ years in project coordination, ideally in design, construction or a creative studio",
    "Excellent written English; most client contact is written",
    "Confidence managing several projects without losing detail",
    "Comfort working across time zones, including some early or late contact",
    "Enough technical literacy to discuss drawings and deliverables credibly",
    "Calm handling of difficult conversations about scope and timing",
  ],
  offer: [
    "Competitive salary, reviewed annually.",
    "The authority to hold scope and timelines, backed by the founder.",
    "Direct relationships with international clients, not internal admin.",
    "Clear processes and templates instead of firefighting by inbox.",
    "Flexibility around early or late client calls, agreed in advance.",
  ],
  callToAction:
    "At ONYX RENDERS, we promise clients a reply the same day. If you're the person who keeps that promise without anyone chasing you, we'd like to hear from you.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
