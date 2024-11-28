"use client";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

interface FormDataTypes {
  id?: number;
  title: string;
  subject: string;
  institute: string;
  description: string;
  filelink: string;
}

interface FormProps {
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ onClose }) => {
  const [formdata, setFormData] = useState<FormDataTypes>({
    title: "",
    subject: "",
    institute: "",
    description: "",
    filelink: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputStyles =
    "w-full h-10 border text-gray-800 text-xs lg:text-sm border-text rounded-lg px-2";
  const labelStyles = "text-text mt-4";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  //upload file to vercel blob and get the url
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const path = "mylenotes/notes"; //change only /notes
      const res = await fetch(
        `/api/user/uploadfile?filename=${file.name}&path=${path}`,
        {
          method: "POST",
          body: file,
        }
      );
      const data = await res.json();
      setFormData({ ...formdata, filelink: data.url });
    }
  };

  const getTruncatedFileName = (fileName: string) => {
    return fileName.length > 10 ? fileName.substring(0, 10) + "..." : fileName;
  };

  const handleSave = async () => {
    if (
      !formdata.title ||
      !formdata.subject ||
      !formdata.institute ||
      !formdata.filelink
    ) {
      window.alert("Please fill all fields before saving.");
      return;
    }
    // setLoading(true);
    try {
      const res = await fetch("/api/user/notes", {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        window.alert("Note Added!");
        // window.location.href = "/admin/skills";
      }
      //   setLoading(false);
    } catch (error) {
      console.error(error);
      //   setLoading(false);
    }
  };
  console.log(formdata);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-50 z-50">
      <div className="relative w-full sm:w-1/2  h-auto p-6 flex flex-col items-center justify-center bg-background border border-text rounded-lg">
        <form className="w-full flex flex-col items-start">
          <label htmlFor="title" className={labelStyles}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={inputStyles}
            value={formdata.title}
            onChange={handleInputChange}
          />

          <label htmlFor="subject" className={labelStyles}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={inputStyles}
            value={formdata.subject}
            onChange={handleInputChange}
          />

          <label htmlFor="institute" className={labelStyles}>
            Institute
          </label>
          <input
            type="text"
            id="institute"
            name="institute"
            className={inputStyles}
            value={formdata.institute}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className={labelStyles}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full h-36 border text-xs lg:text-sm text-gray-800 border-text rounded-lg px-2"
            value={formdata.description}
            onChange={handleInputChange}
          />
        </form>

        <div className="flex flex-col items-center justify-evenly w-full mt-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="file"
              className="w-28 sm:w-48 h-10 sm:h-12 flex items-center justify-center bg-primary bg-opacity-20 rounded-lg cursor-pointer"
            >
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <FaCloudUploadAlt className="text-4xl sm:text-4xl text-primary" />
            </label>
            {selectedFile && (
              <div className="mt-2 text-text text-xs">
                {getTruncatedFileName(selectedFile.name)}
              </div>
            )}
            <span className="text-text text-sm mt-1">Upload file</span>
          </div>
          <button
            onClick={handleSave}
            className="bg-primary text-text p-2 px-4 rounded-md mt-1"
          >
            Submit
          </button>
        </div>

        <button
          className="absolute top-2 right-2 p-1 text-text rounded-full"
          onClick={onClose}
          type="button"
        >
          <RiCloseFill size={24} />
        </button>
      </div>
    </div>
  );
};

export default Form;
