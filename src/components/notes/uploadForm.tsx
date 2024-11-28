'use client';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';

interface UploadFormProps {
  onClose: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputStyles = "w-full h-10 border text-gray-800 text-xs md:text-sm border-text rounded-lg px-2";
  const labelStyles = "text-text text-sm md:text-md mt-2 md:mt-4";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const getTruncatedFileName = (fileName: string) => {
    return fileName.length > 10 ? fileName.substring(0, 10) + "..." : fileName;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-50 z-50">
      <div className="relative w-5/6 md:w-2/5 h-auto p-6 flex flex-col items-center justify-center bg-background border border-text rounded-lg">
        <form className="w-full flex flex-col items-start">
          <label htmlFor="title" className={labelStyles}>Title</label>
          <input type="text" id="title" className={inputStyles} />

          <label htmlFor="subject" className={labelStyles}>Subject</label>
          <input type="text" id="subject" className={inputStyles} />

          <label htmlFor="institute" className={labelStyles}>Institute</label>
          <input type="text" id="institute" className={inputStyles} />

          <label htmlFor="description" className={labelStyles}>Description</label>
          <textarea id="description" className="w-full h-36 border text-xs lg:text-sm text-gray-800 border-text rounded-lg px-2" />
        </form>

        <div className="flex flex-col md:flex-row items-center justify-evenly w-full mt-4">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="file" className="w-28 h-10 flex items-center justify-center bg-primary bg-opacity-20 rounded-lg cursor-pointer">
              <input type="file" id="file" className="hidden" onChange={handleFileChange} />
              <FaCloudUploadAlt className="text-4xl text-primary" />
            </label>
            {selectedFile ? (
              <div className="mt-2 text-text text-xs">
                {getTruncatedFileName(selectedFile.name)}
              </div>
            ) : <span className="text-text text-xs mt-1">Upload file</span>}
            
          </div>
          <button className="bg-primary text-text p-2 px-4 rounded-md mt-1">Submit</button>
        </div>



        <button className="absolute top-2 right-2 p-1 text-text rounded-full" onClick={onClose} type="button">
          <RiCloseFill size={24} />
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
