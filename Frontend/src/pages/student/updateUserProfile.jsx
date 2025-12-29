import { useState } from "react";
import axios from "axios";
import { FiSave, FiUser, FiMail, FiCpu, FiFileText } from "react-icons/fi";

const UpdateProfile = ({ student, refreshStudent }) => {
  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    skills: student?.skills?.join(", ") || "", // Convert array to string for input
    bio: student?.bio || ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        "http://localhost:5000/lms/student/profile", // Corrected URL
        formData,
        { withCredentials: true } // Crucial for fixing 401 error
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
        refreshStudent();
      }
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Update failed. Please check your login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">First Name</label>
            <input 
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Last Name</label>
            <input 
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Skills (comma separated)</label>
          <input 
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Bio</label>
          <textarea 
            rows="4"
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>

        <button 
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? "Saving..." : <><FiSave /> Update Profile</>}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;