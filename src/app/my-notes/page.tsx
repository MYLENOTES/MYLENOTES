"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiPlus, FiDownload, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import Form from "../notes/form";

interface Note {
  id: number;
  title: string;
  subject: string;
  institute: string;
  description: string;
  filelink: string;
}

export default function MyNotesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myNotes, setMyNotes] = useState<Note[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchMyNotes();
    }
  }, [user, refreshTrigger]);

  const fetchMyNotes = async () => {
    try {
      const response = await fetch("/api/user/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      // For now, showing all notes. You can filter by user email later
      setMyNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const handleNoteAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteNote = async (noteId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/user/notes?id=${noteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      const data = await response.json();
      window.alert("Note deleted successfully!");
      
      // Refresh the notes list
      setRefreshTrigger((prev) => prev + 1);
      
      // Close modal if the deleted note was being previewed
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      window.alert("Failed to delete note. Please try again.");
    }
  };

  const handleDownload = async (filelink: string, filename: string) => {
    try {
      const response = await fetch(filelink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(filelink, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen w-full pt-16 px-4 md:px-8 lg:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            My Notes
          </h1>
          <p className="text-text opacity-70 text-sm">
            Manage your uploaded notes and share knowledge with the community
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-primary bg-opacity-80 hover:bg-opacity-90 text-background font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <FiPlus size={20} />
            Upload New Note
          </button>
        </div>

        {/* Notes Grid */}
        {myNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <p className="text-text text-lg mb-4 opacity-70">
                You haven&apos;t uploaded any notes yet
              </p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="bg-primary bg-opacity-80 hover:bg-opacity-90 text-background font-semibold py-2 px-6 rounded-lg transition-all shadow-lg"
              >
                Upload Your First Note
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myNotes.map((note) => (
              <div
                key={note.id}
                className="w-full h-auto rounded-xl border border-gray-700 bg-gray-900 bg-opacity-50 hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="h-full cursor-pointer" onClick={() => setSelectedNote(note)}>
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
                    <h4 className="text-text text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
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
                <div className="flex items-center justify-between px-4 pb-4 mt-2">
                  <p className="text-text text-xs font-medium opacity-80">
                    {note.institute}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-400 hover:bg-opacity-10 rounded-full transition-all"
                    title="Delete note"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Form Modal */}
        {showUploadForm && (
          <Form
            onClose={() => setShowUploadForm(false)}
            onSuccess={handleNoteAdded}
          />
        )}

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
                  <h3 className="text-primary font-semibold text-base mb-2">
                    Description
                  </h3>
                  <p className="text-text text-sm opacity-80 leading-relaxed">
                    {selectedNote.description || "No description available."}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                  <div>
                    <p className="text-text opacity-60 text-xs mb-1">Subject</p>
                    <p className="text-text font-medium text-sm">
                      {selectedNote.subject}
                    </p>
                  </div>
                  <div>
                    <p className="text-text opacity-60 text-xs mb-1">
                      Institute
                    </p>
                    <p className="text-text font-medium text-sm">
                      {selectedNote.institute}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() =>
                        handleDownload(
                          selectedNote.filelink,
                          `${selectedNote.title}.pdf`
                        )
                      }
                      className="flex-1 bg-primary bg-opacity-80 hover:bg-opacity-90 text-background font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm shadow-lg"
                    >
                      <FiDownload size={18} />
                      Download Note
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const link = document.createElement("a");
                        link.href = selectedNote.filelink;
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
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
                  <button
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    className="w-full bg-red-500 bg-opacity-20 hover:bg-opacity-30 border border-red-500 border-opacity-50 text-red-400 hover:text-red-300 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm"
                  >
                    <FiTrash2 size={18} />
                    Delete Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
