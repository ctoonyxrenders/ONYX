'use client';
import React, { useState, ChangeEvent, FormEvent } from "react";
import { CountryCode, Input } from "./form";
import axios from "axios";
import { toast } from "react-hot-toast";

interface QuoteData {
  name: string;
  email: string;
  countryCode: string;
  contactNo: string;
  inquiry: string;
  subject: string;
  message: string;
}

interface DropdownProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const GetAQuote: React.FC = () => {
  const [quoteData, setQuoteData] = useState<QuoteData>({
    name: "",
    email: "",
    countryCode: "93",
    contactNo: "",
    inquiry: "General Inquiry",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!quoteData.name || !quoteData.email || !quoteData.countryCode || !quoteData.contactNo || !quoteData.inquiry || !quoteData.subject || !quoteData.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post('/api/getQuote', quoteData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setQuoteData({
          name: "",
          email: "",
          countryCode: "93",
          contactNo: "",
          inquiry: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Error sending email");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
    }
  };

  return (
    <div className="flex items-center justify-center" id="quote">
      <div className="flex flex-col gap-10 py-5 w-[70%] pt-14 max-lg:w-full">
        <h1 className="text-center heading">Get a Quote</h1>
        <form className="flex gap-10 flex-col max-lg:gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center gap-[10%] w-full max-lg:flex-col max-lg:gap-5">
            <Input
              placeHolder="Name"
              type="text"
              name="name"
              value={quoteData.name}
              onChange={handleChange}
            />
            <Input
              placeHolder="Email"
              type="email"
              name="email"
              value={quoteData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center gap-[10%] w-full max-lg:flex-col max-lg:gap-5">
            <div className="w-[45%] flex items-center justify-between gap-2 max-lg:w-full">
              <CountryCode
                value={quoteData.countryCode}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setQuoteData((prev) => ({ ...prev, countryCode: e.target.value }))}
              />
              <Input
                placeHolder="Contact"
                type="text"
                name="contactNo"
                value={quoteData.contactNo}
                onChange={handleChange}
              />
            </div>
            <div className="w-[45%] flex items-center justify-between gap-2 max-lg:w-full">
              <InquiryDropdown
                value={quoteData.inquiry}
                onChange={(e) => setQuoteData((prev) => ({ ...prev, inquiry: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-[10%] w-full max-lg:flex-col max-lg:gap-5">
            <Input
              placeHolder="Subject"
              type="text"
              name="subject"
              value={quoteData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <p className="text-gray-400 mb-3 para">Message</p>
            <textarea
              rows={5}
              name="message"
              value={quoteData.message}
              onChange={handleChange}
              className="w-full text-black outline-none p-2 max-md:text-[4vw] max-lg:text-[3.5vw] text-[1.7vw] bg-[#E8E8E8]"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-white text-[#114046] hover:bg-transparent hover:text-white border border-white btn-pill"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetAQuote;

const InquiryDropdown: React.FC<DropdownProps> = ({ value, onChange }) => {
  const inquires = ["General Inquiry", "Project Inquiry", "Job Inquiry", "Feedback", "Other"];

  return (
    <select
      className="w-full h-[5vh] max-lg:h-[8vh] max-sm:h-[6vh] outline-none para border-b-2 border-white border-t-0 border-x-0 bg-[#114046] px-2 leading-tight max-lg:px-0 cursor-pointer"
      value={value}
      onChange={onChange}
    >
      {inquires.map((inquiry, index) => (
        <option className="text-[12px]" key={index} value={inquiry}>
          {inquiry}
        </option>
      ))}
    </select>
  );
};
