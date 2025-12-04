import { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnail: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/lms/instructor/CreateCourse", formData, { withCredentials: true });
      setMessage("Course created successfully!");
      setFormData({ title: "", description: "", category: "", price: "", thumbnail: "" });
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage("Failed to create course.");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Create a New Course</h1>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input name="category" value={formData.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Price (Optional)</label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" min="0" />
        </div>

        <div>
          <label className="block font-medium mb-1">Thumbnail URL</label>
          <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
