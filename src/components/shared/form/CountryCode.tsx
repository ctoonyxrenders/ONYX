import { COUNTRIES } from "@/constants";
import React, { ChangeEvent } from "react";

interface CountryCodeProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CountryCode: React.FC<CountryCodeProps> = ({ value, onChange }) => {
  return (
    <select
      className="w-[60%] h-[5vh] max-lg:h-[8vh] max-sm:h-[6vh] outline-none para border-b-2 border-white border-t-0 border-x-0 bg-[#114046] px-2 leading-tight max-lg:px-0 cursor-pointer"
      value={value} // Bind the value prop
      onChange={onChange} // Handle changes
    >
      {COUNTRIES.map((option, index) => (
        <option className="text-[12px] w-1/2" key={index} value={option.phone}>
          {option.name} (+{option.phone})
        </option>
      ))}
    </select>
  );
};

export default CountryCode;
