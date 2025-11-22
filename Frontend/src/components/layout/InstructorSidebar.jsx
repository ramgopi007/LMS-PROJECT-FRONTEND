import { Link } from "react-router-dom";
import { FaBars, FaChalkboardTeacher, FaBook, FaPlus, FaUser } from "react-icons/fa";
import { useState } from "react";

const InstructorSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 text-2xl"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-5 transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-semibold mb-8">Instructor</h2>

        <ul className="flex flex-col gap-4">
          <li>
            <Link className="flex items-center gap-3 hover:text-blue-300" to="/instructor/dashboard">
              <FaChalkboardTeacher /> Dashboard
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3 hover:text-blue-300" to="/instructor/my-courses">
              <FaBook /> My Courses
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3 hover:text-blue-300" to="/instructor/create-course">
              <FaPlus /> Create Course
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3 hover:text-blue-300" to="/instructor/profile">
              <FaUser /> Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InstructorSidebar;
