import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: "React Basics", desc: "Learn React from scratch" },
    { id: 2, title: "Node.js Mastery", desc: "Backend with Node.js" },
    { id: 3, title: "MongoDB Crash Course", desc: "Databases made easy" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">All Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/course/${course.id}`)}
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.desc}</p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
