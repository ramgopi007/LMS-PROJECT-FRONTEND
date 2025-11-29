import { useState } from "react";
import {
  FiHome,
  FiBookOpen,
  FiEdit3,
  FiFilePlus,
  FiList,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* ---------------- Sidebar ---------------- */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col justify-between">

        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
            <div className="bg-white text-black font-bold p-3 rounded-lg">
              NL
            </div>
            <h1 className="text-xl font-semibold">Instructor Panel</h1>
          </div>

          {/* Menu */}
          <nav className="mt-4 px-2 space-y-1">

            {/* Home */}
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "home" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActive("home")}
            >
              <FiHome size={18} /> Home
            </button>

            {/* Create Course */}
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "createCourse" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActive("createCourse")}
            >
              <FiFilePlus size={18} /> Create Course
            </button>

            {/* Create Lesson */}
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "createLesson" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActive("createLesson")}
            >
              <FiEdit3 size={18} /> Create Lesson
            </button>

            {/* Update Courses */}
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "updateCourse" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActive("updateCourse")}
            >
              <FiBookOpen size={18} /> Update Course
            </button>

            {/* My Courses */}
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "myCourses" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActive("myCourses")}
            >
              <FiList size={18} /> My Courses
            </button>
          </nav>
        </div>

        {/* Bottom Profile Section */}
        <div className="px-4 py-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/50"
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
            <div>
              <p className="font-medium">Instructor</p>
              <p className="text-xs text-gray-400">NextLearn</p>
            </div>
          </div>

          <FiLogOut
            onClick={handleLogout}
            className="cursor-pointer hover:text-red-400"
            size={22}
          />
        </div>

      </aside>

      {/* ---------------- Main Content ---------------- */}
      <main className="flex-1 p-10 bg-gray-100">

        {active === "home" && (
          <h1 className="text-3xl font-bold">Welcome to Instructor Dashboard</h1>
        )}

        {active === "createCourse" && (
          <h1 className="text-3xl font-bold">Create a New Course</h1>
        )}

        {active === "createLesson" && (
          <h1 className="text-3xl font-bold">Create a Lesson</h1>
        )}

        {active === "updateCourse" && (
          <h1 className="text-3xl font-bold">Update Your Courses</h1>
        )}

        {active === "myCourses" && (
          <h1 className="text-3xl font-bold">Your Published Courses</h1>
        )}

      </main>

    </div>
  );
};

export default InstructorDashboard;
