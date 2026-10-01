import React from "react";

const HowWeThink = () => {
  const milestones = [
    {
      year: "2016",
      title: "The first wall",
      description: "Four years before the studio existed: a first model in SketchUp on an aging desktop, and a father who treated poor work as a beginning rather than a verdict.",
    },
    {
      year: "2017",
      title: "The machine that shouldn't have managed it",
      description: "An HP EliteBook, bought by his father. A CPU machine with no dedicated graphics, and the most expensive object in the house. A single V-Ray frame could take most of a working day while studios with GPU hardware saw results in minutes. The limitation was never ambition. It was equipment. So the years that followed went into the part that could be controlled: understanding why an image reads as real: light, material behaviour, composition, and the modeling accuracy underneath all three. Thousands of tests, most of them failures, all of them instructive.",
    },
    {
      year: "2018",
      title: "Commissioned before qualified",
      description: "The first paid commissions arrived before any architecture school did — modeling, drafting and rendering, all handled single-handed.",
    },
    {
      year: "2019",
      title: "The missing half",
      description: "A Bachelor of Architecture at COMSATS supplied what self-teaching could not: how a building is reasoned, assembled and documented. The work changed immediately, and so did its scope. Drafting and documentation stopped being adjacent skills and became part of what the studio could offer. Fewer incorrect details, fewer revision rounds, and images architects recognised as their own buildings.",
    },
    {
      year: "2020",
      title: "ONYX RENDERS founded",
      description: "Launched on the same laptop, with an ambition that was never freelance: a studio with a network across the world, working across design, visualization and documentation rather than one stage of a project. The first team was family, who committed before there was evidence it would work.",
    },
    {
      year: "2022",
      title: "Capability the work paid for",
      description: "After two years of delivering international commissions on that same machine, the studio bought its first workstation, funded entirely from what ONYX had earned. No outside capital. GPU rendering changed the ceiling, and six years of accumulated judgement finally had the hardware to match. Animation, walkthroughs and real-time work became possible for the first time.",
    },
    {
      year: "2024",
      title: "On record",
      description: "The thesis passed, the degree followed, and registration with the Pakistan Council of Architects and Town Planners made the founding claim a matter of record.",
    },
    {
      year: "Present",
      title: "Where we're going",
      description: "Real-time visualization, AI-assisted workflows, 360° tours, VR and 3D web configurators are changing how quickly we work and what we can hand over, and we're building with all of them. None of it changes the judgement that decides whether the work succeeds: someone who understands the building, deciding what should be shown, modeled, coordinated and documented.",
    },
  ];

  return (
    <section className="w-full section bg-white">
      <div className="mb-10 md:mb-14">
        <p className="text-xs md:text-sm lg:text-base text-[#999999] uppercase tracking-widest mb-6 md:mb-8">
          Our Milestones
        </p>
        <h2 className="heading flex flex-col gap-2 md:gap-4">
          <span>Four years of practice.</span>
          <span>Six years of studio.</span>
        </h2>
      </div>

      <div className="space-y-0">
        {milestones.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row lg:gap-16 py-8 md:py-10 ${
 index !== milestones.length - 1 ? "border-b border-[#e0e0e0]" : ""
 }`}
          >
            <div className="lg:w-1/4 flex flex-col gap-2 md:gap-3 mb-6 lg:mb-0">
              <p className="text-xs md:text-sm lg:text-base text-[#999999] font-semibold flex-shrink-0">
                {item.year}
              </p>
              <h3 className="text-sm md:text-base lg:text-lg font-bold">
                {item.title}
              </h3>
            </div>
            <div className="lg:w-3/4">
              <p className="text-xs md:text-sm lg:text-base text-justify">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeThink;