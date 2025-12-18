import { useEffect, useState } from "react";
import axios from "axios";
import { FiSave, FiArrowLeft, FiImage, FiSettings } from "react-icons/fi";

const UpdateCourse = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");

  const fetchCourse = async () => {
    try {
      const res = await axios.get("http://localhost:5000/lms/instructor/my-courses", { withCredentials: true });
      const found = (res.data.courses || []).find((c) => c._id === courseId);
      setCourse(found || null);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => { fetchCourse(); }, [courseId]);

  if (!course) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );

  const handleChange = (e) => setCourse({ ...course, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/lms/instructor/courses/${courseId}`, {
        title: course.title,
        description: course.description,
        category: course.category,
        price: course.price,
        thumbnail: course.thumbnail,
        status: course.status,
      }, { withCredentials: true });

      setMessage("Course updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating course:", error);
      setMessage("Failed to update course.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                <FiSettings className="animate-spin-slow" /> Update Course
              </h1>
              <p className="text-blue-100 mt-1 opacity-90">Modify your course details and publishing status.</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          {message && (
            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${
              message.includes("successfully") 
                ? "bg-green-50 text-green-700 border border-green-100" 
                : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              <div className={`w-2 h-2 rounded-full ${message.includes("successfully") ? "bg-green-500" : "bg-red-500"}`} />
              <span className="font-semibold">{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Course Title</label>
              <input 
                name="title" 
                value={course.title || ""} 
                onChange={handleChange} 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none bg-gray-50/50 font-medium" 
                placeholder="Enter course title"
                required 
              />
            </div>

            {/* Description Area */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Description</label>
              <textarea 
                name="description" 
                value={course.description || ""} 
                onChange={handleChange} 
                rows="5" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none bg-gray-50/50 resize-none leading-relaxed" 
                placeholder="Write a compelling description..."
                required 
              />
            </div>

            {/* Grid for Category, Price, and Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Category</label>
                <input 
                  name="category" 
                  value={course.category || ""} 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none bg-gray-50/50" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Price ($)</label>
                <input 
                  name="price" 
                  type="number" 
                  value={course.price || 0} 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none bg-gray-50/50 font-mono" 
                  min="0" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Status</label>
                <select 
                  name="status" 
                  value={course.status || "Draft"} 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none bg-gray-50/50 font-semibold text-blue-600 appearance-none cursor-pointer"
                >
                  <option value="Draft">📝 Draft</option>
                  <option value="Published">🚀 Published</option>
                </select>
              </div>
            </div>

            {/* Thumbnail URL Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 flex items-center gap-2">
                <FiImage /> Thumbnail URL
              </label>
              <input 
                name="thumbnail" 
                value={course.thumbnail || ""} 
                onChange={handleChange} 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none bg-gray-50/50 text-blue-500 underline" 
                required 
              />
              {course.thumbnail && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-gray-100 shadow-sm max-w-xs">
                  <img src={course.thumbnail} alt="Preview" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <FiSave /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;