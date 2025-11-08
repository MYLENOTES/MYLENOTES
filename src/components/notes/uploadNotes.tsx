"use client";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import UploadForm from "./uploadForm";

interface UploadNotesProps {
  onSuccess?: () => void;
}

export default function UploadNotes({ onSuccess }: UploadNotesProps) {
  const [showPopup, setShowPopup] = useState(false);

    return (
      <div className="w-full md:w-64 lg:w-72 h-80 rounded-lg bg-primary bg-opacity-50 flex flex-col gap-2 justify-center items-center text-text text-xl hover:bg-opacity-40 transition duration-300">
      {!showPopup ? (
        <>
          <div
            onClick={() => setShowPopup(true)}
            className="text-text bg-secondary bg-opacity-50 rounded-full hover:scale-125 cursor-pointer transition duration-300"
          >
            <FiPlus size={60} />
          </div>
          <span>Upload your notes</span>
        </>
      ) : (
        <UploadForm onClose={() => setShowPopup(false)} onSuccess={onSuccess} />
      )}
    </div>
    
    )
}