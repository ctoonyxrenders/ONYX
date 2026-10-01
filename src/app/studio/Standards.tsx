import React from "react";

const Standards = () => {
  const standards = [
    {
      title: "User-generated artifact content",
      description: "NDA on request as standard. White-label delivery available, so the work can carry your practice's name.",
    },
    {
      title: "Quality control",
      description: "Multi-stage internal review before anything reaches you, checked against your drawings rather than the previous render.",
    },
    {
      title: "Delivery",
      description: "4K professional standard, native and print-ready formats, with a fixed timeline agreed before work begins.",
    },
    {
      title: "Commercial terms",
      description: "Milestone payments tied to approved stages, and unlimited revisions within the agreed delivery phase.",
    },
  ];

  return (
    <section className="w-full section bg-white">
      <div className="mb-10 md:mb-14">
        <p className="text-xs md:text-sm lg:text-base text-[#999999] uppercase tracking-widest mb-6 md:mb-8">
          STANDARDS
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8">
          <h2 className="heading lg:w-1/2 flex flex-col gap-2 md:gap-4">
            <span>How we protect your project</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-[#7D7D7D] lg:w-1/3">
            The questions serious clients ask before they commit, answered before they have to.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {standards.map((item, index) => (
          <div key={index} className="border border-[#e0e0e0] p-6 md:p-8">
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

export default Standards;