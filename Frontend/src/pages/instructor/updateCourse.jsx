import { useEffect, useState } from "react";
import axios from "axios";

const UpdateCourse = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch course list then pick the one with matching id (keeps backend/simple route usage)
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

  if (!course) return <p>Loading course...</p>;

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
    } catch (error) {
      console.error("Error updating course:", error);
      setMessage("Failed to update course.");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Update Course</h1>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input name="title" value={course.title || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={course.description || ""} onChange={handleChange} rows="4" className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input name="category" value={course.category || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input name="price" type="number" value={course.price || 0} onChange={handleChange} className="w-full border px-3 py-2 rounded" min="0" />
        </div>

        <div>
          <label className="block font-medium mb-1">Thumbnail URL</label>
          <input name="thumbnail" value={course.thumbnail || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select name="status" value={course.status || "Draft"} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
