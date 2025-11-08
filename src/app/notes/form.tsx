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
  onSuccess?: () => void;
}

const Form: React.FC<FormProps> = ({ onClose, onSuccess }) => {
  const [formdata, setFormData] = useState<FormDataTypes>({
    title: "",
    subject: "",
    institute: "",
    description: "",
    filelink: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputStyles =
    "w-full h-10 border text-text bg-gray-800 text-sm border-gray-700 rounded-lg px-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all";
  const labelStyles = "text-text font-medium mt-3 mb-1 text-sm";

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
      
      // Validate PDF file
      if (file.type !== "application/pdf") {
        window.alert("Please upload only PDF files.");
        e.target.value = "";
        return;
      }

      // Check file size (optional - warn for large files)
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 10) {
        const proceed = window.confirm(
          `This file is ${fileSizeMB.toFixed(2)}MB. Large files may take a few minutes to upload. Continue?`
        );
        if (!proceed) {
          e.target.value = "";
          return;
        }
      }
      
      setSelectedFile(file);
      setUploading(true);
      setUploadProgress(0);
      
      let progressInterval: NodeJS.Timeout | null = null;
      
      try {
        const path = "mylenotes/notes";
        console.log(`Starting upload: ${file.name} (${fileSizeMB.toFixed(2)}MB)`);
        
        // Simulate progress for visual feedback
        progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) return prev; // Stop at 90% until actual upload completes
            return prev + Math.random() * 10;
          });
        }, 500);
        
        // Create an AbortController with a longer timeout (5 minutes)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minutes
        
        const res = await fetch(
          `/api/user/uploadfile?filename=${encodeURIComponent(file.name)}&path=${path}`,
          {
            method: "POST",
            body: file,
            signal: controller.signal,
          }
        );
        
        if (progressInterval) clearInterval(progressInterval);
        clearTimeout(timeoutId);
        setUploadProgress(100);
        console.log("Upload response status:", res.status);
        
        if (!res.ok) {
          let errorMessage = "Failed to upload file";
          try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = `Server error: ${res.status} ${res.statusText}`;
          }
          throw new Error(errorMessage);
        }
        
        const data = await res.json();
        console.log("Upload response data:", data);
        
        if (data.url) {
          setFormData((prev) => ({ ...prev, filelink: data.url }));
          console.log("File uploaded successfully:", data.url);
          window.alert("File uploaded successfully! You can now submit the note.");
        } else {
          throw new Error("No URL returned from upload");
        }
        setUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        if (progressInterval) clearInterval(progressInterval);
        setUploading(false);
        
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMessage = "Upload timed out after 5 minutes. Please try with a smaller file or check your internet connection.";
          } else if (error.message.includes("fetch")) {
            errorMessage = "Network error. Please check your internet connection and try again.";
          } else {
            errorMessage = error.message;
          }
        }
        
        window.alert(`Failed to upload file: ${errorMessage}`);
        setSelectedFile(null);
        setUploadProgress(0);
        e.target.value = "";
      }
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
      window.alert("Please fill all required fields and upload a file before saving.");
      return;
    }

    setUploading(true);
    try {
      console.log("Submitting note:", formdata);
      const res = await fetch("/api/user/notes", {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const responseData = await res.json();
      console.log("Response:", responseData);
      
      if (res.ok) {
        window.alert("Note Added Successfully!");
        setUploading(false);
        onClose();
        if (onSuccess) {
          onSuccess(); // Trigger refresh of notes list
        }
      } else {
        throw new Error(responseData.message || "Failed to add note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      setUploading(false);
      window.alert(`Failed to save note: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  console.log(formdata);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg h-auto p-6 flex flex-col items-center justify-center bg-gray-900 border border-primary rounded-xl shadow-2xl my-8">
        <h3 className="text-xl font-semibold text-accent mb-4 self-start">Upload New Note</h3>
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
            className="w-full h-24 border text-text bg-gray-800 text-sm border-gray-700 rounded-lg px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all resize-none"
            value={formdata.description}
            onChange={handleInputChange}
          />
        </form>

        <div className="flex flex-col w-full mt-4 gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label
                htmlFor="file"
                className="w-36 h-12 flex flex-col items-center justify-center bg-primary bg-opacity-10 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-opacity-20 transition-all"
              >
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                <FaCloudUploadAlt className={`text-2xl text-primary mb-1 ${uploading ? "animate-pulse" : ""}`} />
                <span className="text-text text-xs">
                  {uploading ? `${Math.round(uploadProgress)}%` : selectedFile ? getTruncatedFileName(selectedFile.name) : "Choose file"}
                </span>
              </label>
            </div>
            <button
              onClick={handleSave}
              disabled={uploading}
              className="bg-primary hover:bg-accent text-background font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 text-sm"
            >
              {uploading ? "Saving..." : "Submit Note"}
            </button>
          </div>
          
          {/* Progress Bar */}
          {uploading && (
            <div className="w-full">
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-primary text-xs mt-1 text-center">
                Uploading... {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
        </div>

        <button
          className="absolute top-3 right-3 p-1.5 text-text hover:text-primary rounded-full hover:bg-gray-800 transition-all"
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
