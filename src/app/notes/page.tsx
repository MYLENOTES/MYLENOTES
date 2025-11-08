"use client";
import Notes from "@/components/notes/notes";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Form from "./form";

export default function Home() {
  const searchPlaceholder = "Search for a note...";
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the Notes component through props
  };

  const handleNoteAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger re-fetch of notes
  };

  return (
    <main className="bg-background flex min-h-screen w-full flex-col">
      {/* Header and Search Section */}
      <div className="w-full pt-12 pb-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-text text-center mb-3">
            Explore Notes
          </h1>
          <p className="text-text opacity-70 text-center mb-8">
            Search and access notes from students around the world
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-3xl mx-auto">
            <input
              type="search"
              className="p-3 px-5 rounded-lg text-gray-800 bg-white shadow-md w-full sm:flex-1"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-primary bg-opacity-80 hover:bg-opacity-90 text-background font-semibold p-3 px-12 rounded-lg transition-all duration-300 shadow-lg hover:scale-105 w-full sm:w-auto">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* All Notes Section */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        {searchQuery && (
          <div className="mb-8">
            <h3 className="font-semibold text-2xl text-accent text-center mb-2">
              Search Results for &quot;{searchQuery}&quot;
            </h3>
            <p className="text-text opacity-60 text-center text-sm">
              Showing results matching your search query
            </p>
          </div>
        )}
        <div className="w-full">
          <Notes searchQuery={searchQuery} refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Upload Notes Section */}
      <div className="flex justify-center items-center py-12 pb-20">
        <div className="w-full max-w-sm h-72 rounded-lg border border-primary border-opacity-30 bg-primary bg-opacity-5 shadow-xl flex flex-col gap-4 justify-center items-center text-text text-xl hover:border-opacity-50 hover:shadow-2xl transition duration-300">
          {!showPopup ? (
            <>
              <div
                onClick={() => setShowPopup(true)}
                className="text-background bg-primary bg-opacity-80 rounded-full hover:scale-110 hover:bg-opacity-90 cursor-pointer transition-all duration-300 p-5 shadow-lg"
              >
                <FiPlus size={60} />
              </div>
              <span className="font-semibold text-primary">Upload Your Notes</span>
              <p className="text-sm text-text opacity-70 text-center px-6">Share your knowledge with the community</p>
            </>
          ) : (
            <Form onClose={() => setShowPopup(false)} onSuccess={handleNoteAdded} />
          )}
        </div>
      </div>
    </main>
  );
}
