"use client";
import React, { useEffect, useState } from "react";
import FilePicker from "./FilePicker";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const JobApplicationForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    location: "",
    email: "",
    assesmentLink: "",
    portfolio: null,
    cv: null,
    jobTitle: "",
  });
  const driveLinkRegex = /^(https?:\/\/)?(www\.)?(drive|docs)\.google\.com\/(file\/d\/|open\?id=|drive\/folders\/)[\w-]+/;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.href;

      // Extract job title from the URL path
      const pathSegments = window.location.pathname.split("/");
      const jobTitle = pathSegments[3]; // Assuming job title is always at index 4

      if (jobTitle) {
        setFormData((prev) => ({
          ...prev,
          jobTitle: decodeURIComponent(jobTitle), // Decoding in case of special characters
        }));
      }
    }
  }, []);

  const handleFileChange = (
    file: File | null,
    field: keyof typeof formData
  ) => {

    if (!file) return

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, DOCX, and DOC files are allowed.')
      return
    }

    if (file.size > maxSize) {
      toast.error('File size must be 10MB or less.')
      return
    }

    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Validation
    if (!formData.firstName.trim()) { toast.error("First Name is required"); return }
    if (!formData.lastName.trim()) { toast.error("Last Name is required"); return }
    if (!formData.contactNo.trim()) { toast.error("Contact No is required"); return }
    if (!formData.location.trim()) { toast.error("Location is required"); return }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { toast.error("Email is required and should be valid"); return }
    if (!formData.portfolio) { toast.error("Portfolio file is required"); return }
    if (!formData.cv) { toast.error("CV file is required"); return }
    if (!formData.assesmentLink.trim()) { toast.error("Google Drive Link is required"); return }
    if (!driveLinkRegex.test(formData.assesmentLink.trim())) { toast.error("Please enter a valid Google Drive Link"); return }


    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData; // Explicitly cast key
      formDataToSend.append(key, formData[typedKey] as string);
    });

    try {
      setLoading(true)
      await axios.post("/api/jobApplication", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Error submitting application");
    }
    setLoading(false)
  };

  return (
    <form className="flex w-full flex-col justify-center items-center max-lg:gap-4 gap-16">
      <div className="w-full flex gap-4 justify-between max-lg:flex-col">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="bg-[#E3E3E3] text-[#00000099] outline-none max-lg:w-full w-[47%] max-lg:h-[59px] h-[70px] p-5 para"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="bg-[#E3E3E3] text-[#00000099] outline-none max-lg:w-full w-[47%] max-lg:h-[59px] h-[70px] p-5 para"
        />
      </div>
      <div className="w-full flex gap-4 justify-between max-lg:flex-col">
        <div className="relative w-[47%] max-lg:w-full">
          <p className="absolute flex justify-center items-center text-white text-4xl max-lg:text-3xl w-[70px] bg-[#114046] h-full">
            +
          </p>
          <CountryCodeJob />
        </div>
        <input
          type="text"
          name="contactNo"
          placeholder="Contact No"
          value={formData.contactNo}
          onChange={handleChange}
          className="bg-[#E3E3E3] text-[#00000099] outline-none max-lg:w-full w-[47%] max-lg:h-[59px] h-[70px] p-5 para"
        />
      </div>

      <div className="w-full flex gap-4 justify-between max-lg:flex-col">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="bg-[#E3E3E3] text-[#00000099] outline-none max-lg:w-full w-[47%] max-lg:h-[59px] h-[70px] p-5 para"
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#E3E3E3] text-[#00000099] outline-none max-lg:w-full w-[47%] max-lg:h-[59px] h-[70px] p-5 para"
        />
      </div>
      <div className="w-full flex gap-4 justify-between max-lg:flex-col" >
        <input
          type="text"
          name="assesmentLink"
          placeholder="Google Drive Assesment Link"
          value={formData.assesmentLink}
          onChange={handleChange}
          className="bg-[#E3E3E3] text-[#00000099] outline-none w-full max-lg:h-[59px] h-[70px] p-5 para"
        />
      </div>
      <FilePicker
        mainText="Upload Your Portfolio "
        subText="pdf | docs | docx"
        onFileSelect={(file) => handleFileChange(file, "portfolio")}
      />
      <FilePicker
        mainText="Upload Your CV "
        subText="pdf | docs | docx"
        onFileSelect={(file) => handleFileChange(file, "cv")}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-pill bg-[#114046] text-white w-auto text-center flex justify-center"
      >
        {loading ? <Loader className="animate-spin" /> : 'Submit'}
      </button>
    </form>
  );
};

export default JobApplicationForm;

const CountryCodeJob = () => {
  const options = [
    { name: "Country Code" },
    { name: "Afghanistan", phone: 93 },
    { name: "Åland Islands", phone: 358 },
    { name: "Albania", phone: 355 },
    { name: "Algeria", phone: 213 },
    { name: "American Samoa", phone: 1 },
    { name: "Andorra", phone: 376 },
    { name: "Angola", phone: 244 },
    { name: "Anguilla", phone: 1 },
    { name: "Antarctica", phone: 672 },
    { name: "Antigua and Barbuda", phone: 1 },
    { name: "Argentina", phone: 54 },
    { name: "Armenia", phone: 374 },
    { name: "Aruba", phone: 297 },
    { name: "Australia", phone: 61 },
    { name: "Austria", phone: 43 },
    { name: "Azerbaijan", phone: 994 },
    { name: "Bahamas", phone: 1 },
    { name: "Bahrain", phone: 973 },
    { name: "Bangladesh", phone: 880 },
    { name: "Barbados", phone: 1 },
    { name: "Belarus", phone: 375 },
    { name: "Belgium", phone: 32 },
    { name: "Belize", phone: 501 },
    { name: "Benin", phone: 229 },
    { name: "Bermuda", phone: 1 },
    { name: "Bhutan", phone: 975 },
    { name: "Bolivia (Plurinational State of)", phone: 591 },
    { name: "Bosnia and Herzegovina", phone: 387 },
    { name: "Botswana", phone: 267 },
    { name: "Bouvet Island", phone: 55 },
    { name: "Brazil", phone: 55 },
    { name: "British Indian Ocean Territory", phone: 246 },
    { name: "Brunei Darussalam", phone: 673 },
    { name: "Bulgaria", phone: 359 },
    { name: "Burkina Faso", phone: 226 },
    { name: "Burundi", phone: 257 },
    { name: "Cabo Verde", phone: 238 },
    { name: "Cambodia", phone: 855 },
    { name: "Cameroon", phone: 237 },
    { name: "Canada", phone: 1 },
    { name: "Caribbean Netherlands", phone: 599 },
    { name: "Cayman Islands", phone: 1 },
    { name: "Central African Republic", phone: 236 },
    { name: "Chad", phone: 235 },
    { name: "Chile", phone: 56 },
    { name: "China", phone: 86 },
    { name: "Christmas Island", phone: 61 },
    { name: "Cocos (Keeling) Islands", phone: 61 },
    { name: "Colombia", phone: 57 },
    { name: "Comoros", phone: 269 },
    { name: "Congo", phone: 242 },
    { name: "Congo, Democratic Republic of the", phone: 243 },
    { name: "Cook Islands", phone: 682 },
    { name: "Costa Rica", phone: 506 },
    { name: "Croatia", phone: 385 },
    { name: "Cuba", phone: 53 },
    { name: "Curaçao", phone: 599 },
    { name: "Cyprus", phone: 357 },
    { name: "Czech Republic", phone: 420 },
    { name: "Côte d'Ivoire", phone: 225 },
    { name: "Denmark", phone: 45 },
    { name: "Djibouti", phone: 253 },
    { name: "Dominica", phone: 1 },
    { name: "Dominican Republic", phone: 1 },
    { name: "Ecuador", phone: 593 },
    { name: "Egypt", phone: 20 },
    { name: "El Salvador", phone: 503 },
    { name: "Equatorial Guinea", phone: 240 },
    { name: "Eritrea", phone: 291 },
    { name: "Estonia", phone: 372 },
    { name: "Eswatini (Swaziland)", phone: 268 },
    { name: "Ethiopia", phone: 251 },
    { name: "Falkland Islands (Malvinas)", phone: 500 },
    { name: "Faroe Islands", phone: 298 },
    { name: "Fiji", phone: 679 },
    { name: "Finland", phone: 358 },
    { name: "France", phone: 33 },
    { name: "French Guiana", phone: 594 },
    { name: "French Polynesia", phone: 689 },
    { name: "French Southern Territories", phone: 262 },
    { name: "Gabon", phone: 241 },
    { name: "Gambia", phone: 220 },
    { name: "Georgia", phone: 995 },
    { name: "Germany", phone: 49 },
    { name: "Ghana", phone: 233 },
    { name: "Gibraltar", phone: 350 },
    { name: "Greece", phone: 30 },
    { name: "Greenland", phone: 299 },
    { name: "Grenada", phone: 1 },
    { name: "Guadeloupe", phone: 590 },
    { name: "Guam", phone: 1 },
    { name: "Guatemala", phone: 502 },
    { name: "Guernsey", phone: 44 },
    { name: "Guinea", phone: 224 },
    { name: "Guinea-Bissau", phone: 245 },
    { name: "Guyana", phone: 592 },
    { name: "Haiti", phone: 509 },
    { name: "Heard Island and Mcdonald Islands", phone: 61 },
    { name: "Honduras", phone: 504 },
    { name: "Hong Kong", phone: 852 },
    { name: "Hungary", phone: 36 },
    { name: "Iceland", phone: 354 },
    { name: "India", phone: 91 },
    { name: "Indonesia", phone: 62 },
    { name: "Iran", phone: 98 },
    { name: "Iraq", phone: 964 },
    { name: "Ireland", phone: 353 },
    { name: "Isle of Man", phone: 44 },
    { name: "Israel", phone: 972 },
    { name: "Italy", phone: 39 },
    { name: "Jamaica", phone: 1 },
    { name: "Japan", phone: 81 },
    { name: "Jersey", phone: 44 },
    { name: "Jordan", phone: 962 },
    { name: "Kazakhstan", phone: 7 },
    { name: "Kenya", phone: 254 },
    { name: "Kiribati", phone: 686 },
    { name: "Korea, North", phone: 850 },
    { name: "Korea, South", phone: 82 },
    { name: "Kosovo", phone: 383 },
    { name: "Kuwait", phone: 965 },
    { name: "Kyrgyzstan", phone: 996 },
    { name: "Lao People's Democratic Republic", phone: 856 },
    { name: "Latvia", phone: 371 },
    { name: "Lebanon", phone: 961 },
    { name: "Lesotho", phone: 266 },
    { name: "Liberia", phone: 231 },
    { name: "Libya", phone: 218 },
    { name: "Liechtenstein", phone: 423 },
    { name: "Lithuania", phone: 370 },
    { name: "Luxembourg", phone: 352 },
    { name: "Macao", phone: 853 },
    { name: "Macedonia North", phone: 389 },
    { name: "Madagascar", phone: 261 },
    { name: "Malawi", phone: 265 },
    { name: "Malaysia", phone: 60 },
    { name: "Maldives", phone: 960 },
    { name: "Mali", phone: 223 },
    { name: "Malta", phone: 356 },
    { name: "Marshall Islands", phone: 692 },
    { name: "Martinique", phone: 596 },
    { name: "Mauritania", phone: 222 },
    { name: "Mauritius", phone: 230 },
    { name: "Mayotte", phone: 262 },
    { name: "Mexico", phone: 52 },
    { name: "Micronesia", phone: 691 },
    { name: "Moldova", phone: 373 },
    { name: "Monaco", phone: 377 },
    { name: "Mongolia", phone: 976 },
    { name: "Montenegro", phone: 382 },
    { name: "Montserrat", phone: 1 },
    { name: "Morocco", phone: 212 },
    { name: "Mozambique", phone: 258 },
    { name: "Myanmar (Burma)", phone: 95 },
    { name: "Namibia", phone: 264 },
    { name: "Nauru", phone: 674 },
    { name: "Nepal", phone: 977 },
    { name: "Netherlands", phone: 31 },
    { name: "New Caledonia", phone: 687 },
    { name: "New Zealand", phone: 64 },
    { name: "Nicaragua", phone: 505 },
    { name: "Niger", phone: 227 },
    { name: "Nigeria", phone: 234 },
    { name: "Niue", phone: 683 },
    { name: "Norfolk Island", phone: 672 },
    { name: "Northern Mariana Islands", phone: 1 },
    { name: "Norway", phone: 47 },
    { name: "Oman", phone: 968 },
    { name: "Pakistan", phone: 92 },
    { name: "Palau", phone: 680 },
    { name: "Palestine", phone: 970 },
    { name: "Panama", phone: 507 },
    { name: "Papua New Guinea", phone: 675 },
    { name: "Paraguay", phone: 595 },
    { name: "Peru", phone: 51 },
    { name: "Philippines", phone: 63 },
    { name: "Pitcairn Islands", phone: 64 },
    { name: "Poland", phone: 48 },
    { name: "Portugal", phone: 351 },
    { name: "Puerto Rico", phone: 1 },
    { name: "Qatar", phone: 974 },
    { name: "Reunion", phone: 262 },
    { name: "Romania", phone: 40 },
    { name: "Russian Federation", phone: 7 },
    { name: "Rwanda", phone: 250 },
    { name: "Saint Barthelemy", phone: 590 },
    { name: "Saint Helena", phone: 290 },
    { name: "Saint Kitts and Nevis", phone: 1 },
    { name: "Saint Lucia", phone: 1 },
    { name: "Saint Martin", phone: 590 },
    { name: "Saint Pierre and Miquelon", phone: 508 },
    { name: "Saint Vincent and the Grenadines", phone: 1 },
    { name: "Samoa", phone: 685 },
    { name: "San Marino", phone: 378 },
    { name: "Sao Tome and Principe", phone: 239 },
    { name: "Saudi Arabia", phone: 966 },
    { name: "Senegal", phone: 221 },
    { name: "Serbia", phone: 381 },
    { name: "Seychelles", phone: 248 },
    { name: "Sierra Leone", phone: 232 },
    { name: "Singapore", phone: 65 },
    { name: "Sint Maarten", phone: 1 },
    { name: "Slovakia", phone: 421 },
    { name: "Slovenia", phone: 386 },
    { name: "Solomon Islands", phone: 677 },
    { name: "Somalia", phone: 252 },
    { name: "South Africa", phone: 27 },
    { name: "South Georgia and the South Sandwich Islands", phone: 500 },
    { name: "South Sudan", phone: 211 },
    { name: "Spain", phone: 34 },
    { name: "Sri Lanka", phone: 94 },
    { name: "Sudan", phone: 249 },
    { name: "Suriname", phone: 597 },
    { name: "Svalbard and Jan Mayen", phone: 47 },
    { name: "Sweden", phone: 46 },
    { name: "Switzerland", phone: 41 },
    { name: "Syria", phone: 963 },
    { name: "Taiwan", phone: 886 },
    { name: "Tajikistan", phone: 992 },
    { name: "Tanzania", phone: 255 },
    { name: "Thailand", phone: 66 },
    { name: "Timor-Leste", phone: 670 },
    { name: "Togo", phone: 228 },
    { name: "Tokelau", phone: 690 },
    { name: "Tonga", phone: 676 },
    { name: "Trinidad and Tobago", phone: 1 },
    { name: "Tunisia", phone: 216 },
    { name: "Turkey (Türkiye)", phone: 90 },
    { name: "Turkmenistan", phone: 993 },
    { name: "Turks and Caicos Islands", phone: 1 },
    { name: "Tuvalu", phone: 688 },
    { name: "U.S. Outlying Islands", phone: 1 },
    { name: "Uganda", phone: 256 },
    { name: "Ukraine", phone: 380 },
    { name: "United Arab Emirates", phone: 971 },
    { name: "United Kingdom", phone: 44 },
    { name: "United States", phone: 1 },
    { name: "Uruguay", phone: 598 },
    { name: "Uzbekistan", phone: 998 },
    { name: "Vanuatu", phone: 678 },
    { name: "Vatican City Holy See", phone: 39 },
    { name: "Venezuela", phone: 58 },
    { name: "Vietnam", phone: 84 },
    { name: "Virgin Islands, British", phone: 1 },
    { name: "Virgin Islands, U.S", phone: 1 },
    { name: "Wallis and Futuna", phone: 681 },
    { name: "Western Sahara", phone: 212 },
    { name: "Yemen", phone: 967 },
    { name: "Zambia", phone: 260 },
    { name: "Zimbabwe", phone: 263 },
  ];

  return (
    <select className="bg-[#E3E3E3] appearance-none text-[#b2b1b1] outline-none max-lg:w-full w-full max-lg:h-[59px] h-[70px] px-20 para cursor-pointer">
      {options.map((country, idx) => (
        <option key={idx} value={country.phone}>
          {country.name} (+{country.phone})
        </option>
      ))}
    </select>
  );
};
