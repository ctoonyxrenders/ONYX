import Link from "next/link";
import { boldOnyxRenders } from "@/utils";
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

interface JobDescriptionProps {
  jobData: jobDataType;
}

const JobDescription = ({ jobData }: JobDescriptionProps) => {
  return (
    <>
      <section className="overflow-hidden flex flex-col gap-4 relative top-[-1vw]">
        <h1 className="text-[#B9B9B933] text-[20vw] leading-none text-nowrap -translate-x-[4vw]">
          APPLY NOW
        </h1>
        <p className="absolute top-[15vw] px-[3.8vw] text-[#00000099] max-sm:top-[12vw] para">
          Job title
        </p>
      </section>
      <section className="px-[3.8vw] flex flex-col gap-4 relative top-[-3vw] max-md:top-[-5.5vw]">
        <div>
          <h1 className="sub-heading">{jobData.title}</h1>
          <p className="para text-[#00000099] max-sm:top-[12vw] mt-[15px] max-md:mt-[10px]">
            {jobData.jobType}
          </p>
          <p className="para text-[#00000099] max-sm:top-[12vw] mt-[15px] max-md:mt-[10px]">
            {jobData.position}
          </p>
          <h1 className="sub-heading max-md:mt-[15px] mt-[40px]">
            Job description
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: boldOnyxRenders(jobData.jobDescription),
            }}
            className="text-[#00000099] leading-snug para w-[85%] max-md:mt-[15px] mt-[25px] text-justify max-md:w-full"
          ></p>
        </div>
        <div>
          <h1 className="sub-heading max-md:mt-[15px] mt-[40px]">
            Key Responsibilities
          </h1>
          <ul className="list-disc px-[2vw] text-[#00000099] text-[1.5vw] w-[85%] max-md:text-[3.5vw] max-md:w-full">
            {jobData.keyResponsibilities.map((res: string, idx: number) => {
              return (
                <li className="my-2 lg:my-7 para text-justify" key={idx}>
                  {res}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h1 className="sub-heading max-md:mt-[15px] mt-[40px]">
            Required Skills & Experience
          </h1>
          <ul className="list-disc px-[2vw] text-[#00000099] text-[1.5vw] w-[85%] max-md:text-[3.5vw] max-md:w-full">
            {jobData.skillExperience.map((res: string, idx: number) => {
              return (
                <li className="my-2 lg:my-7 para text-justify" key={idx}>
                  {res}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h1 className="sub-heading max-md:mt-[15px] mt-[40px]">
            What We Offer:
          </h1>
          <ul className="list-disc px-[2vw] text-[#00000099] text-[1.5vw] w-[85%] max-md:text-[3.5vw] max-md:w-full">
            {jobData.offer.map((res: string, idx: number) => {
              return (
                <li className="my-2 lg:my-7 para text-justify" key={idx}>
                  {res}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h1 className="sub-heading max-md:mt-[15px] mt-[40px]">
            How to Apply
          </h1>
          <div className="mt-[20px] w-[85%] max-md:w-full">
            <ul className="list-disc px-[2vw] text-[#00000099] text-[1.5vw] max-md:text-[3.5vw]">
              {jobData.howToApply.map((res, idx: number) => {
                return (
                  <li className="my-2 lg:my-7 para text-justify" key={idx}>
                    {res}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <p
            dangerouslySetInnerHTML={{
              __html: boldOnyxRenders(jobData.callToAction),
            }}
            className="text-[#00000099] para w-[85%] max-md:mt-[15px] mt-[30px] text-justify max-md:w-full"
          ></p>
        </div>
        <div>
          <p className="text-[#00000099] para w-[85%] max-md:mt-[15px] mt-[30px] text-justify max-md:w-full">
            Apply Now and be part of our journey!
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col lg:flex-row   justify-center items-center gap-4 my-[5vw]">
        <Link
          href={`/career/job/${jobData.title
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim()
            .replace(/\s+/g, "-")}/apply`}
          className="btn-pill btn-theme hover:bg-[#ff565605] hover:text-black text-center"
        >
          Apply Now
        </Link>
        <Link
          href={"/career"}
          className="btn-pill text-center text-[#114046] border border-[#114046] hover:bg-[#114046] hover:text-white"
        >
          Other Jobs
        </Link>
      </section>
    </>
  );
};

export default JobDescription;
