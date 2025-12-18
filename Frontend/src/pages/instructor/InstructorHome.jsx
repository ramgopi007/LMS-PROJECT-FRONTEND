import { useRef, useState } from "react";
import axios from "axios";

const InstructorHome = ({ instructor, refreshInstructor }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("profile", file);
      await axios.post("http://localhost:5000/lms/instructor/upload-profile-picture", formData, { withCredentials: true });
      refreshInstructor();
    } catch (error) {
      console.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm("Remove profile photo?")) return;
    try {
      setUploading(true);
      await axios.post("http://localhost:5000/lms/instructor/upload-profile-picture", { removePhoto: true }, { withCredentials: true });
      refreshInstructor();
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setUploading(false);
    }
  };

  if (!instructor) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Instructor Dashboard</h1>
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row border border-gray-100 overflow-hidden">
        
        {/* PROFILE COLUMN */}
        <div className="p-8 bg-gray-50 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className="relative">
            <img
              src={instructor.profilePicture ? `http://localhost:5000${instructor.profilePicture}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Profile"
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md ${uploading ? 'opacity-50' : 'opacity-100'}`}
            />
            
            {/* Hidden Input */}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            {/* Edit Icon */}
            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white shadow-lg hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </button>

            {/* Delete Icon */}
            {instructor.profilePicture && (
              <button onClick={handleDeletePhoto} className="absolute top-1 right-1 bg-white p-2 rounded-full text-red-500 shadow-md border border-gray-100 hover:bg-red-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
              </button>
            )}
          </div>
          <p className="mt-4 font-bold text-blue-600 uppercase text-sm tracking-widest">{instructor.role}</p>
        </div>

        {/* DETAILS COLUMN */}
        <div className="p-8 flex-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">About Me</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{instructor.bio || "No bio added."}</p>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {instructor.skills?.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHome;