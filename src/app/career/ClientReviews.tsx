import { blurDataURL } from "@/constants";
import { getTeamMembers } from "@/lib/sanity";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/sanity";

export async function getMember() {
  const response = await getTeamMembers();
  return response[0].image ? urlFor(response[0].image).url() : null;
}
 
export default function ClientReviews() {
  return (
    <section className="flex lg:px-10 section-y justify-center items-center w-full">
      <ClientCard {...testimonials[0]} />
    </section>
  );
}

function ClientCard(props: Testimony) {
  return (
    <div className="sm:flex p-4 gap-2 lg:gap-5 w-[98%] sm:w-[80%] xl:w-[70%]">
      <div className="relative w-[50%] sm:w-[45%] xl:w-[50%] aspect-[3/4] mx-auto sm:mx-0">
        <Image placeholder="blur"
          blurDataURL={blurDataURL} src={props.img} alt="client" className="object-cover" fill />
      </div>
      <div className="w-full flex flex-col justify-between pl-[2%] mt-[10%] sm:mt-0 text-[#00000099]">
        <div className="flex flex-col text-small text-justify">
          <h2 className="heading text-[#000000] mb-[2%]">
            A Word from the CEO
          </h2>
          <p className="my-[3%] poppins">Respected candidate,</p>
          <p className="leading-none poppins">{props.para1}</p>

          <p className="leading-none py-5 poppins">
            {props.para2}
          </p>
          <p className=" leading-none poppins">{props.closingPara}</p>
        </div>
        <div className="flex flex-col text-small">
          <h6 className=" text-[#000000]  leading-none pt-[5%] pb-[3%]  sm:py-[2%]">
            Awais Khalid{" "}
          </h6>
          <h6 className=" text-[#00000099]">CEO of 3D Arhitect</h6>
        </div>
      </div>
    </div>
  );
}

interface Testimony {
  name: string;
  designation: string;
  img: string;
  logo: string;
  para1: string;
  para2: string;
  closingPara: string;
}

const testimonials: Testimony[] = [
  {
    name: "John Smith",
    designation: "CEO of TechNova",
    img: "/studio/team/Artboard 2.svg",
    logo: "/home/clients/logo.png",
    para1:
      "At ONYX RENDERS, we are committed to delivering high-end, photorealistic visualizations with unmatched speed and precision. We understand that in the world of architecture and design, time is valuable that’s why we ensure fast turnarounds without ever compromising on quality.",
    para2:
      "What truly sets us apart is our seamless communication with clients. We believe collaboration is the key to success, and we work closely with you at every stage to bring your vision to life. Whether you’re an architect, developer, or designer, our team is dedicated to transforming your ideas into captivating visuals that leave a lasting impact, providing revisions as needed to ensure that every detail aligns perfectly with your expectations.",
    closingPara:
      "Thank you for trusting ONYX RENDERS - where imagination meets precision.",
  },
];
