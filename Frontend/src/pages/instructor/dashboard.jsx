import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FiHome, FiFilePlus, FiList, FiLogOut, FiMenu, FiX, FiChevronRight } from "react-icons/fi";

import InstructorHome from "../instructor/InstructorHome";
import CreateCourse from "../instructor/CreateCourse";
import MyCourses from "../instructor/MyCourses";
import UpdateCourse from "../instructor/UpdateCourse";
import AddLesson from "../instructor/addLesson";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For responsiveness

  const params = new URLSearchParams(location.search);
  const editCourseId = params.get("edit");
  const addLessonCourseId = params.get("addLesson");

  const [active, setActive] = useState("home");
  const [instructor, setInstructor] = useState(null);

  const fetchInstructor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/lms/instructor/me",
        { withCredentials: true }
      );
      setInstructor(res.data);
    } catch (err) {
      console.error("Dashboard instructor fetch error:", err);
    }
  };

  useEffect(() => {
    fetchInstructor();
  }, []);

  useEffect(() => {
    if (editCourseId || addLessonCourseId) return;
    if (active === "home") navigate("/instructor/dashboard");
  }, [active, editCourseId, addLessonCourseId, navigate]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigate("/login");
  };

  // Modernized Nav Button Styling
  const navBtn = (name) =>
    `w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
      active === name
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
        : "hover:bg-slate-800 text-slate-400 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* MOBILE HAMBURGER (Visible only on small screens) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full shadow-2xl">
          
          {/* Logo Section */}
          <div className="px-8 py-10">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 text-white font-black p-3 rounded-2xl shadow-xl shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform">
                NL
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">NextLearn</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Instructor hub</p>
              </div>
            </div>
          </div>

          {/* Navigation Area */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <button
              className={navBtn("home")}
              onClick={() => { setActive("home"); navigate("/instructor/dashboard"); setIsMobileMenuOpen(false); }}
            >
              <div className="flex items-center gap-3">
                <FiHome size={20} className={active === 'home' ? "text-white" : "text-slate-500 group-hover:text-indigo-400"} /> 
                <span className="font-semibold text-sm">Dashboard</span>
              </div>
              {active === "home" && <FiChevronRight />}
            </button>

            <button
              className={navBtn("createCourse")}
              onClick={() => { setActive("createCourse"); navigate("/instructor/dashboard"); setIsMobileMenuOpen(false); }}
            >
              <div className="flex items-center gap-3">
                <FiFilePlus size={20} className={active === 'createCourse' ? "text-white" : "text-slate-500 group-hover:text-indigo-400"} /> 
                <span className="font-semibold text-sm">Create Course</span>
              </div>
              {active === "createCourse" && <FiChevronRight />}
            </button>

            <button
              className={navBtn("myCourses")}
              onClick={() => { setActive("myCourses"); navigate("/instructor/dashboard"); setIsMobileMenuOpen(false); }}
            >
              <div className="flex items-center gap-3">
                <FiList size={20} className={active === 'myCourses' ? "text-white" : "text-slate-500 group-hover:text-indigo-400"} /> 
                <span className="font-semibold text-sm">My Courses</span>
              </div>
              {active === "myCourses" && <FiChevronRight />}
            </button>
          </nav>

          {/* Sidebar User Profile Footer */}
          <div className="m-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img
                  src={instructor?.profilePicture ? `http://localhost:5000${instructor.profilePicture}` : "https://i.pravatar.cc/150"}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20"
                  alt="profile"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm text-white truncate">{instructor?.name || "Instructor"}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold truncate tracking-wider">Premium Account</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-slate-700 hover:border-red-400/20"
            >
              <FiLogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar">
        {/* Top Header Bar (Optional but looks great) */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 hidden lg:flex justify-between items-center">
            <h2 className="text-slate-400 font-medium text-sm">
              Welcome back, <span className="text-slate-900 font-bold">{instructor?.name?.split(' ')[0] || "Instructor"}!</span>
            </h2>
            <div className="flex items-center gap-4 text-slate-400 italic text-xs">
              NextLearn Instructor Dashboard v2.0
            </div>
        </header>

        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {/* Transition wrapper logic preserved */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {editCourseId ? (
              <UpdateCourse courseId={editCourseId} />
            ) : addLessonCourseId ? (
              <AddLesson courseId={addLessonCourseId} />
            ) : active === "home" ? (
              <InstructorHome
                instructor={instructor}
                refreshInstructor={fetchInstructor}
              />
            ) : active === "createCourse" ? (
              <CreateCourse />
            ) : active === "myCourses" ? (
              <MyCourses />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;