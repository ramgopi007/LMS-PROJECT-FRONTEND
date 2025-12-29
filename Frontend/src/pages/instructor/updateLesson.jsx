import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateLesson = ({ lessonId }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    order: "",
  });

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // FETCH EXISTING DATA ON LOAD
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/lms/instructor/lessons/${lessonId}`,
          { withCredentials: true }
        );
        const { title, description, duration, order } = res.data.lesson;
        setForm({ title, description, duration, order });
      } catch (err) {
        setError("Could not load lesson details.");
      }
    };

    if (lessonId) fetchLessonData();
  }, [lessonId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const data = new FormData();
      
      // Append text fields
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, value)
      );
      
      // Append video only if a new one is selected
      if (video) data.append("lessonVideo", video);

      await axios.put(
        `http://localhost:5000/lms/instructor/lessons/${lessonId}`,
        data,
        { withCredentials: true }
      );

      setSuccess("Lesson updated successfully!");
      // Navigate back to the list after success
      setTimeout(() => navigate("/instructor/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">✏️ Update Lesson</h1>
        <button 
          onClick={() => navigate("/instructor/dashboard")}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          Cancel
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Lesson Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Introduction to React"
            className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What will students learn?"
            className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Duration (sec)</label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Order Index</label>
            <input
              name="order"
              type="number"
              value={form.order}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Change Video (Optional)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:bg-blue-300"
        >
          {loading ? "Saving Changes..." : "Save Lesson Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;