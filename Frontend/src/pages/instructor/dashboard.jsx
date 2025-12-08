import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FiHome,
  FiFilePlus,
  FiList,
  FiLogOut,
} from "react-icons/fi";

import InstructorHome from "../instructor/InstructorHome";
import CreateCourse from "../instructor/CreateCourse";
import MyCourses from "../instructor/MyCourses";
import UpdateCourse from "../instructor/UpdateCourse";

const InstructorDashboard = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  // Read ?edit=courseId from URL
  const queryParams = new URLSearchParams(location.search);
  const editCourseId = queryParams.get("edit");

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
            <div className="bg-white text-black font-bold p-3 rounded-lg">NL</div>
            <h1 className="text-xl font-semibold">Instructor Panel</h1>
          </div>

          <nav className="mt-4 px-2 space-y-1">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "home" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => {
                setActive("home");
                navigate("/instructor/dashboard");
              }}
            >
              <FiHome size={18} /> Home
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "createCourse" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => {
                setActive("createCourse");
                navigate("/instructor/dashboard");
              }}
            >
              <FiFilePlus size={18} /> Create Course
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "myCourses" ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => {
                setActive("myCourses");
                navigate("/instructor/dashboard");
              }}
            >
              <FiList size={18} /> My Courses
            </button>
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/50" className="w-10 h-10 rounded-full" alt="avatar" />
            <div>
              <p className="font-medium">Instructor</p>
              <p className="text-xs text-gray-400">NextLearn</p>
            </div>
          </div>

          <FiLogOut onClick={handleLogout} className="cursor-pointer hover:text-red-400" size={22} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 bg-gray-100">
        {/* If URL contains edit ID → show UpdateCourse inside dashboard */}
        {editCourseId ? (
          <UpdateCourse courseId={editCourseId} />
        ) : active === "home" ? (
          <InstructorHome />
        ) : active === "createCourse" ? (
          <CreateCourse />
        ) : active === "myCourses" ? (
          <MyCourses />
        ) : null}
      </main>
    </div>
  );
};

export default InstructorDashboard;
