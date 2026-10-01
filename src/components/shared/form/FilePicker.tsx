"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FileText, FileImage } from "lucide-react";
import { FileDownload } from "@/icons";
import { blurDataURL } from "@/constants";

interface FilePickerProps {
  mainText: string;
  subText: string;
  onFileSelect: (file: File | null) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  mainText,
  subText,
  onFileSelect,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const supportedImages = ["jpg", "jpeg", "png", "gif"];
    const supportedDocs = ["pdf", "doc", "docx"];

    setFileName(file.name);
    setFileType(fileExtension || null);
    onFileSelect(file);

    if (supportedImages.includes(fileExtension || "")) {
      setFilePreview(URL.createObjectURL(file));
    } else if (supportedDocs.includes(fileExtension || "")) {
      setFilePreview(null);
    } else {
      setFilePreview(null);
      setFileName("Unsupported file type");
    }
  };

  return (
    <div className="w-full bg-[#E3E3E3] max-sm:h-[250px] max-md:h-[300px] h-[350px] flex justify-center items-center flex-col gap-4 p-4">
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${mainText}`} // Add a unique id to avoid sharing the state
      />
      <label
        htmlFor={`file-upload-${mainText}`} // Match the label's htmlFor with the input id
        className="cursor-pointer flex flex-col items-center justify-center p-4 w-48 h-48 hover:bg-gray-100 duration-500 transition"
      >
        {filePreview ? (
          <Image
            placeholder="blur"
            blurDataURL={blurDataURL}
            src={filePreview}
            alt="Preview"
            width={100}
            height={100}
            className="rounded-md"
          />
        ) : fileType === "pdf" ? (
          <FileImage size={50} className="text-red-500" />
        ) : fileType === "doc" || fileType === "docx" ? (
          <FileText size={50} className="text-blue-500" />
        ) : (
          <FileDownload />
        )}
        <p className="text-gray-600 text-center text-small mt-2">
          {fileName || "Click to Upload"}
        </p>
        <p className="text-[#00000099] text-center text-x-small">{mainText}</p>
        <p className="text-[#00000099] text-center text-x-small">{subText}</p>
      </label>
    </div>
  );
};

export default FilePicker;
