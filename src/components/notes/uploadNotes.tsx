import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import UploadForm from "./uploadForm";

export default function UploadNotes() {
  const [showPopup, setShowPopup] = useState(false);

    return (
      <div className="w-full md:w-64 lg:w-72 h-80 rounded-lg bg-[#789DBC] bg-opacity-50 flex flex-col gap-2 justify-center items-center text-text text-xl hover:bg-opacity-40 transition duration-300">
      {!showPopup ? (
        <>
          <div
            onClick={() => setShowPopup(true)}
            className="text-text bg-[#003161] bg-opacity-40 rounded-full hover:scale-125 cursor-pointer transition duration-300"
          >
            <FiPlus size={55} className="p-1"/>
          </div>
          <span>Upload your notes</span>
        </>
      ) : (
        <UploadForm onClose={() => setShowPopup(false)} />
      )}
    </div>
    
    )
}