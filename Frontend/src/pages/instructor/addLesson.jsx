import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FiVideo, FiFileText, FiClock, FiList, FiPlus, 
  FiLoader, FiCheckCircle, FiAlertCircle, FiUploadCloud 
} from "react-icons/fi";

const AddLesson = ({ courseId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    order: "",
  });

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 🔥 100MB Cloudinary Free Limit Check
      if (file.size > 100 * 1024 * 1024) {
        setError("File exceeds 100MB limit. Please compress your video or upload a smaller file.");
        setVideo(null);
        return;
      }
      setVideo(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!video) return setError("Please upload a lesson video.");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("order", formData.order);
      data.append("lessonVideo", video); 

      await axios.post(
        `http://localhost:5000/lms/instructor/courses/${courseId}/addlessons`,
        data,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
          timeout: 300000, // 5 minutes for 100MB
        }
      );

      setSuccess("Lesson added successfully!");
      setTimeout(() => navigate("/instructor/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add lesson. Ensure file is under 100MB.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500">
        
        {/* HEADER SECTION */}
        <div className="bg-emerald-600 px-8 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <FiPlus className="bg-white/20 p-1 rounded-lg" /> Add New Lesson
            </h1>
            <p className="text-emerald-100 mt-2 opacity-90">
              Stay within 100MB (Cloudinary Free limit). Stay on this page until 100%.
            </p>
          </div>
          <FiUploadCloud className="absolute -right-4 -bottom-4 text-white/10 text-9xl" />
        </div>

        <div className="p-6 sm:p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 animate-bounce">
              <FiAlertCircle className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3">
              <FiCheckCircle className="shrink-0" />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 ml-1 text-xs uppercase tracking-wider">
                <FiFileText className="text-emerald-600" /> Lesson Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Introduction to React"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-gray-50/50"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 ml-1 text-xs uppercase tracking-wider">
                <FiList className="text-emerald-600" /> Lesson Description
              </label>
              <textarea
                name="description"
                placeholder="What will students learn?"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
                rows="3"
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-gray-50/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 ml-1 text-xs uppercase tracking-wider">
                  <FiClock className="text-emerald-600" /> Duration (seconds)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-gray-50/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 ml-1 text-xs uppercase tracking-wider">
                  <FiList className="text-emerald-600" /> Lesson Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-gray-50/50"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 ml-1 text-xs uppercase tracking-wider">
                <FiVideo className="text-emerald-600" /> Lesson Video (Max 100MB)
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-3xl transition-all bg-gray-50/50 ${video ? 'border-emerald-400 bg-emerald-50/30' : 'border-gray-300 hover:border-emerald-500'}`}>
                <div className="space-y-2 text-center">
                  <FiVideo className={`mx-auto h-12 w-12 ${video ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`} />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-bold text-emerald-600 hover:text-emerald-500 outline-none">
                      <span>{video ? "Change Video" : "Select Video"}</span>
                      <input type="file" accept="video/*" onChange={handleFileChange} className="sr-only" disabled={loading} />
                    </label>
                  </div>
                  {video && (
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-100/50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <FiCheckCircle /> {(video.size / (1024 * 1024)).toFixed(2)} MB - {video.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {loading && (
              <div className="space-y-3 py-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black uppercase text-emerald-600 tracking-widest">
                    {uploadProgress < 100 ? "Uploading..." : "Processing..."}
                  </span>
                  <span className="text-lg font-black text-emerald-700">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden border border-gray-200">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-xl transition-all disabled:bg-gray-300 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-2xl" /> 
                  {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : "Finalizing..."}
                </>
              ) : (
                <>
                  <FiUploadCloud className="text-2xl" /> Add Lesson
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;