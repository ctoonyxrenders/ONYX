import React from "react";
import JobDescription, { type jobDataType } from "../JobDescription";

const jobData: jobDataType = {
  title: "Business Development Executive",
  jobDescription: `You will build relationships with architects, developers and design teams in the US and UK,
                   where most of our work originates. This is a consultative role built on technical
                   credibility, not a volume sales role.`,
  // No department was supplied, so the second line repeats the role, as on
  // the older job pages.
  position: "Business Development Executive",
  location: "On-site",
  jobType: "Full-Time · On-site · Reports to CCO",
  keyResponsibilities: [
    "Identify and approach practices and developers whose work fits our standard",
    "Hold technical conversations about scope, deliverables and timelines",
    "Prepare and present proposals alongside the commercial team",
    "Maintain the pipeline and follow up on proposals and past clients",
    "Represent the studio at industry events and exhibitions",
    "Feed market insight back into how we position our services",
  ],
  skillExperience: [
    "2+ years in business development, preferably in a technical or creative field",
    "Excellent spoken and written English for direct international contact",
    "Enough understanding of our services to scope a project accurately",
    "Comfort with long sales cycles and considered decisions",
    "Willingness to work across US and UK hours",
    "Accurate pipeline discipline",
  ],
  offer: [
    "Competitive salary plus commission on closed work.",
    "A portfolio and delivery record strong enough to sell on merit.",
    "Technical support from architects on every proposal and client call.",
    "Budget for industry events and exhibitions in your target markets.",
    "Real influence over how we position our services in the US and UK.",
  ],
  callToAction:
    "At ONYX RENDERS, the work sells itself once it's in front of the right people. If you can find those people and talk credibly about buildings, we'd like to meet you.",
};

const page = () => {
  return (
    <main>
      <JobDescription jobData={jobData} />
    </main>
  );
};

export default page;
