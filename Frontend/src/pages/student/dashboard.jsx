import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FiHome, 
  FiSearch, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiChevronRight, 
  FiUser 
} from "react-icons/fi";
import StudentHome from "./studentHome";
import ExploreCourses from "./exploreCourses";
import UpdateProfile from "./updateUserProfile"; // Your existing component

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/lms/student/me", {
        withCredentials: true,
      });
      if (res.data && res.data.success) {
        setStudent(res.data.data);
      }
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigate("/login");
  };

  // Helper for Sidebar Button Styles
  const navBtn = (name) =>
    `w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
      active === name
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
        : "hover:bg-slate-800 text-slate-400 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* MOBILE HAMBURGER */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full shadow-2xl">
          
          {/* LOGO */}
          <div className="px-8 py-10 flex items-center gap-3">
            <div className="bg-indigo-500 text-white font-black p-3 rounded-2xl rotate-3">NL</div>
            <div>
              <h1 className="text-xl font-bold text-white">NextLearn</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Student Portal</p>
            </div>
          </div>

          {/* MAIN NAVIGATION */}
          <nav className="flex-1 px-4 space-y-2">
            <button className={navBtn("home")} onClick={() => { setActive("home"); setIsMobileMenuOpen(false); }}>
              <div className="flex items-center gap-3">
                <FiHome size={20} className={active === "home" ? "text-white" : "text-slate-500 group-hover:text-indigo-400"} />
                <span className="font-semibold text-sm">Home</span>
              </div>
              {active === "home" && <FiChevronRight />}
            </button>

            <button className={navBtn("explore")} onClick={() => { setActive("explore"); setIsMobileMenuOpen(false); }}>
              <div className="flex items-center gap-3">
                <FiSearch size={20} className={active === "explore" ? "text-white" : "text-slate-500 group-hover:text-indigo-400"} />
                <span className="font-semibold text-sm">Explore Courses</span>
              </div>
              {active === "explore" && <FiChevronRight />}
            </button>
          </nav>

          {/* USER SECTION (PROFILE BUTTON) */}
          <div className="m-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <button 
              onClick={() => { setActive("account"); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 mb-4 w-full text-left p-2 rounded-xl transition-all group ${active === "account" ? "bg-indigo-600/20 ring-1 ring-indigo-500" : "hover:bg-slate-700/50"}`}
            >
              <div className="relative">
                <img 
                  src={student?.profilePicture ? `http://localhost:5000${student.profilePicture}` : "https://i.pravatar.cc/150"} 
                  className="w-10 h-10 rounded-lg object-cover border border-slate-600" 
                  alt="profile" 
                />
                <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-0.5 border border-slate-900">
                  <FiUser size={10} className="text-white" />
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm text-white truncate group-hover:text-indigo-400 transition-colors">
                  {student?.name || "Student"}
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Edit Profile</p>
              </div>
            </button>
            
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg border border-slate-700 transition-colors"
            >
              <FiLogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* DESKTOP HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 hidden lg:flex justify-between items-center">
          <h2 className="text-slate-400 font-medium text-sm">
            Welcome back, <span className="text-slate-900 font-bold">{student?.name?.split(" ")[0] || "Learner"}!</span>
          </h2>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {active === "home" && "Dashboard Overview"}
            {active === "explore" && "Course Library"}
            {active === "account" && "Profile Settings"}
          </div>
        </header>

        {/* COMPONENT RENDERING ENGINE */}
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {/* HOME VIEW */}
          {active === "home" && (
            <StudentHome 
              student={student} 
              refreshStudent={fetchStudent} 
            />
          )}
          
          {/* EXPLORE VIEW */}
          {active === "explore" && (
            <ExploreCourses />
          )}

          {/* ACCOUNT/PROFILE VIEW */}
          {active === "account" && (
            <UpdateProfile 
              student={student} 
              refreshStudent={fetchStudent} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;