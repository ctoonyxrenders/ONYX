// src/components/home/WhyUs.tsx
// OPTIMIZED: Universal padding standard applied

import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/15123255121";

interface Row {
  label: string;
  caption: string;
  onyx: string;
  studio: string;
  freelancer: string;
}

const rows: Row[] = [
  {
    label: "First draft",
    caption: "See your vision early and make confident decisions.",
    onyx: "48 hours",
    studio: "1 to 2 weeks",
    freelancer: "Varies",
  },
  {
    label: "Revisions",
    caption: "Refine until it feels right — no surprise costs.",
    onyx: "Included",
    studio: "Often extra",
    freelancer: "Limited",
  },
  {
    label: "Dedicated project manager",
    caption: "A single point of contact, always available.",
    onyx: "Yes",
    studio: "Yes",
    freelancer: "No",
  },
  {
    label: "Response time",
    caption: "Quick answers, smooth communication.",
    onyx: "Same day",
    studio: "1 to 2 days",
    freelancer: "Unpredictable",
  },
  {
    label: "Large projects",
    caption: "Capacity for full developments, not just single views.",
    onyx: "Yes",
    studio: "Yes",
    freelancer: "Rarely",
  },
  {
    label: "Quality control",
    caption: "Multi-stage review process before delivery.",
    onyx: "Yes",
    studio: "Varies",
    freelancer: "Not guaranteed",
  },
  {
    label: "Confidentiality & data security",
    caption: "Your project stays private with NDA on request.",
    onyx: "Yes",
    studio: "Sometimes",
    freelancer: "Rarely",
  },
];

const CELL = "p-5 md:p-6";
const ACCENT = "font-bold text-[#4a5f66]";

export default function WhyUs() {
  return (
    <section className="section">
      {/* QUOTE BAND */}
      <div className="bg-[#bac3c833] rounded-xl p-8 md:p-12 flex flex-col xl:flex-row xl:items-center justify-between gap-8 xl:gap-16">
        <div>
          <h2 className="heading flex flex-col gap-2 md:gap-4 tracking-wide max-w-2xl">
            <span className="md:whitespace-nowrap">
              Send your <span className={ACCENT}>drawings.</span>
            </span>
            <span className="lg:whitespace-nowrap">
              Get a <span className={ACCENT}>quote</span> in 24 hours.
            </span>
          </h2>
          <p className="text-small mt-4 md:mt-6 max-w-md">
            No commitment. We&apos;ll review your files, suggest the best views and give you a clear price and timeline.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 shrink-0">
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-pill border border-[#114046]  hover:bg-[#114046] hover:text-white">
              Chat on WhatsApp
            </button>
          </Link>
          <Link href="/studio/#scheduleCall">
            <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
              Request a Proposal
            </button>
          </Link>
        </div>
      </div>

      {/* COMPARISON HEADING */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 md:gap-8 xl:gap-16 mt-16 md:mt-24">
        <h2 className="heading xl:shrink-0 flex flex-col gap-2 md:gap-4 max-w-2xl">
          <span className="lg:whitespace-nowrap">Studio quality without</span>
          <span className="whitespace-nowrap">studio delays</span>
        </h2>

        <p className="text-small max-w-2xl">
          The craft of a top visualization studio, with faster turnaround
          <br />
          and a team that answers when you message.{" "}
          <Link
            href="/studio"
            className="text-black underline underline-offset-4 hover:text-[#114046] transition-colors"
          >
            About us
          </Link>
        </p>
      </div>

      {/* COMPARISON TABLE */}
      <div className="mt-10 md:mt-16 overflow-x-auto">
        <table className="w-full min-w-[640px] border border-black/10 rounded-xl border-separate border-spacing-0 overflow-hidden">
          <thead>
            <tr>
              <th className={`text-small ${CELL} font-bold text-left border-b border-black/10`}>
                Feature / What you get
              </th>
              <th className={`text-small ${CELL} font-bold text-left text-white bg-[#114046] border-b border-black/10`}>
                ONYX RENDERS
              </th>
              <th className={`text-small ${CELL} text-left  border-b border-black/10`}>
                Typical studio
              </th>
              <th className={`text-small ${CELL} text-left  border-b border-black/10`}>
                Freelancer
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => {
              const border = i === rows.length - 1 ? "" : "border-b border-black/10";

              return (
                <tr key={row.label}>
                  <th scope="row" className={`${CELL} text-left font-normal align-top ${border}`}>
                    <span className="text-small block">{row.label}</span>
                    <span className="text-x-small block mt-1">
                      {row.caption}
                    </span>
                  </th>
                  <td className={`text-small ${CELL} font-bold text-white bg-[#114046] ${border}`}>
                    {row.onyx}
                  </td>
                  <td className={`text-small ${CELL}  ${border}`}>
                    {row.studio}
                  </td>
                  <td className={`text-small ${CELL}  ${border}`}>
                    {row.freelancer}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}