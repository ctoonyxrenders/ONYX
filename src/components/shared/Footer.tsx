import React from "react";
import GetAQuote from "./GetAQuote";
import Services from "./Services";

const Footer = () => {
  return (
    <footer className="bg-[#114046] text-white px-[6%] py-[2%] w-full overflow-hidden">
      <GetAQuote />
      <Services />
    </footer>
  );
};

export default Footer;
