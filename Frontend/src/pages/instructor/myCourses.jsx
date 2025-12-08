import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/lms/instructor/my-courses", { withCredentials: true });
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this course? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/lms/instructor/courses/${id}`, { withCredentials: true });
      fetchCourses(); // refresh
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {courses.length === 0 && <p className="text-gray-600 text-lg">You have not created any courses yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-5 shadow rounded-lg">
            <img src={course.thumbnail || "https://via.placeholder.com/400x200"} alt="thumbnail" className="h-40 w-full object-cover rounded" />
            <h2 className="text-xl font-bold mt-3">{course.title}</h2>
            <h3 className="text-xl font-bold mt-2">{course.category}</h3>
            <p className="text-gray-700">{course.description}</p>

            <div className="mt-4 flex gap-3">
              <button onClick={() => navigate(`/instructor/dashboard?edit=${course._id}`)} className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                ✏️ Edit
              </button>

              <button onClick={() => handleDelete(course._id)} className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
