import React from "react";

const TheDifference = () => {
  const differences = [
    {
      number: "01",
      title: "Read by architects",
      description: "Your drawings are interpreted by people who have produced construction sets. Junctions, tolerances and setting-out are understood.",
    },
    {
      number: "02",
      title: "One team through the project",
      description: "Concept, visualization, documentation and BIM coordination under one roof. No hand-offs, no re-explaining, one point of contact.",
    },
    {
      number: "03",
      title: "Built to professional standard",
      description: "4K delivery, multi-stage internal review, clash detection on coordinated models and NDA on request.",
    },
  ];

  return (
    <section className="w-full section bg-white">
      <div className="mb-10 md:mb-14">
        <p className="text-xs md:text-sm lg:text-base text-[#999999] uppercase tracking-widest mb-6 md:mb-8">
          THE DIFFERENCE
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8">
          <h2 className="heading lg:w-1/2 flex flex-col gap-2 md:gap-4">
            <span>Three things a visualization-</span>
            <span>only studio cannot offer</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base lg:w-1/3">
            Each one exists because architects, not illustrators, run the work.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {differences.map((item, index) => (
          <div key={index} className="border border-[#e0e0e0] p-6 md:p-8">
            <p className="text-xs md:text-sm lg:text-base text-[#999999] font-bold mb-4 md:mb-6">
              {item.number}
            </p>
            <h3 className="text-sm md:text-base lg:text-lg font-bold mb-4 md:mb-6">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm lg:text-base text-[#7D7D7D]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TheDifference;