"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { FiDownload, FiExternalLink } from "react-icons/fi";

interface Note {
  id: number;
  title: string;
  subject: string;
  institute: string;
  description: string;
  filelink: string;
}

interface NotesProps {
  searchQuery?: string;
  refreshTrigger?: number;
}

export default function Notes({ searchQuery = "", refreshTrigger = 0 }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.subject.toLowerCase().includes(query) ||
      note.institute.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <p className="text-text text-lg">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="flex justify-center items-center p-12">
        <p className="text-text text-lg">
          {searchQuery ? "No notes found matching your search" : "No notes available yet"}
        </p>
      </div>
    );
  }

  const handleDownload = async (filelink: string, filename: string) => {
    try {
      const response = await fetch(filelink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to opening in new tab
      window.open(filelink, "_blank");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="w-full h-auto rounded-xl border border-gray-700 bg-gray-900 bg-opacity-50 hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
            onClick={() => setSelectedNote(note)}
          >
          <div className="h-full">
            <div className="w-full h-48 relative overflow-hidden bg-gray-800">
              <iframe
                src={`${note.filelink}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full pointer-events-none scale-150"
                title={note.title}
                style={{ border: 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            </div>
            <div className="p-4">
              <h4 className="text-text text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {note.title}
              </h4>
              <p className="text-text text-sm opacity-70 line-clamp-2 mb-3">
                {note.description}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-primary bg-opacity-20 text-primary px-3 py-1 rounded-full font-medium">
                  {note.subject}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center px-4 pb-4 mt-2">
            <p className="text-text text-xs font-medium opacity-80">
              {note.institute}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Preview Modal */}
    {selectedNote && (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
        <div className="bg-gray-900 border-2 border-primary border-opacity-30 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl my-4">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-primary border-opacity-20 p-4 flex justify-between items-start z-10">
            <div className="flex-1 pr-3">
              <h2 className="text-xl md:text-2xl font-semibold text-text mb-2">
                {selectedNote.title}
              </h2>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-primary bg-opacity-20 text-primary px-2.5 py-1 rounded-full text-xs font-medium">
                  {selectedNote.subject}
                </span>
                <span className="text-text opacity-70 text-xs">
                  • {selectedNote.institute}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedNote(null)}
              className="text-text hover:text-primary transition-colors p-1.5 hover:bg-gray-800 rounded-full flex-shrink-0"
            >
              <RiCloseFill size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Preview Image/PDF */}
            <div className="w-full h-64 md:h-80 bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
              <iframe
                src={`${selectedNote.filelink}#toolbar=0`}
                className="w-full h-full"
                title={selectedNote.title}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-primary font-semibold text-base mb-2">Description</h3>
              <p className="text-text opacity-80 leading-relaxed text-sm">
                {selectedNote.description || "No description available."}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-800 bg-opacity-50 p-3 rounded-lg">
              <div>
                <p className="text-text opacity-60 text-xs mb-1">Subject</p>
                <p className="text-text font-medium text-sm">{selectedNote.subject}</p>
              </div>
              <div>
                <p className="text-text opacity-60 text-xs mb-1">Institute</p>
                <p className="text-text font-medium text-sm">{selectedNote.institute}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleDownload(selectedNote.filelink, `${selectedNote.title}.pdf`)}
                className="flex-1 bg-primary bg-opacity-80 hover:bg-opacity-90 text-background font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm shadow-lg"
              >
                <FiDownload size={18} />
                Download Note
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const link = document.createElement('a');
                  link.href = selectedNote.filelink;
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-text font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm"
              >
                <FiExternalLink size={18} />
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
