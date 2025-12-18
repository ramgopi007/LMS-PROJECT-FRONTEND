import { useState } from "react";
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
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (video) data.append("lessonVideo", video);

      await axios.put(
        `http://localhost:5000/lms/instructor/lessons/${lessonId}`,
        data,
        { withCredentials: true }
      );

      setSuccess("Lesson updated successfully!");

      setTimeout(() => navigate("/instructor/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-5">✏️ Update Lesson</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "duration", "order"].map((field) =>
          field === "description" ? (
            <textarea
              key={field}
              name={field}
              placeholder="Lesson Description"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          ) : (
            <input
              key={field}
              name={field}
              type={field.includes("duration") || field.includes("order") ? "number" : "text"}
              placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )
        )}

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Lesson"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
