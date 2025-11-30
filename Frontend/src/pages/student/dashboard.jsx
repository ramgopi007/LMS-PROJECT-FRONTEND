import { useState, useEffect } from "react";
import {
  FiHome,
  FiBookOpen,
  FiList,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [active, setActive] = useState("home");
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [singleLesson, setSingleLesson] = useState(null);

  const navigate = useNavigate();

  // ------- Logout (Remove Token From Cookies) -------
  const handleLogout = () => {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigate("/login");
  };

  // Helper to read token:
  const getToken = () =>
    document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

  /* // -------- Fetch All Courses --------
  const fetchAllCourses = async () => {
    const res = await fetch("http://localhost:5000/api/courses");
    const data = await res.json();
    setCourses(data);
  }; */

  /* // -------- Fetch My Enrolled Courses --------
  const fetchMyCourses = async () => {
    const res = await fetch("http://localhost:5000/api/my-courses", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setMyCourses(data);
  }; */

  /* // -------- Enroll Course --------
  const enrollCourse = async (courseId) => {
    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}/enroll`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    ); */

  /*   const data = await res.json();
    alert(data.message);
  };
 */
  /* // -------- Fetch Lessons --------
  const fetchCourseLessons = async (courseId) => {
    setSelectedCourse(courseId);
    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}/lessons`,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    const data = await res.json();
    setLessons(data);
  };

  // -------- Fetch Single Lesson --------
  const fetchSingleLesson = async (lessonId) => {
    const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setSingleLesson(data);
  };

  // Auto-load courses on mount
  useEffect(() => {
    fetchAllCourses();
    fetchMyCourses();
  }, []);
 */
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-gray-200 flex flex-col justify-between">

        <div>
          <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-700">
            <div className="bg-white text-black font-bold p-3 rounded-lg">NL</div>
            <h1 className="text-xl font-semibold">Student Panel</h1>
          </div>

          <nav className="mt-4 px-2 space-y-1">
            
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "home" ? "bg-blue-600" : "hover:bg-blue-800"}`}
              onClick={() => setActive("home")}
            >
              <FiHome size={18} /> Home
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "allCourses" ? "bg-blue-600" : "hover:bg-blue-800"}`}
              onClick={() => setActive("allCourses")}
            >
              <FiBookOpen size={18} /> All Courses
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "myCourses" ? "bg-blue-600" : "hover:bg-blue-800"}`}
              onClick={() => setActive("myCourses")}
            >
              <FiList size={18} /> My Courses
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                ${active === "profile" ? "bg-blue-600" : "hover:bg-blue-800"}`}
              onClick={() => setActive("profile")}
            >
              <FiUser size={18} /> Profile
            </button>

          </nav>
        </div>

        <div className="px-4 py-4 border-t border-blue-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/50" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium">Student</p>
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

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">

        {/* -------- Home -------- */}
        {active === "home" && <h1 className="text-3xl font-bold">Welcome Student!</h1>}

        {/* -------- All Courses -------- */}
        {active === "allCourses" && (
          <div>
            <h1 className="text-3xl font-bold mb-5">All Courses</h1>
            <div className="grid grid-cols-3 gap-4">
              {courses.map((c) => (
                <div key={c._id} className="p-4 bg-white shadow rounded-lg">
                  <h2 className="text-xl font-bold">{c.title}</h2>
                  <button
                    onClick={() => enrollCourse(c._id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Enroll
                  </button>
                  <button
                    onClick={() => fetchCourseLessons(c._id)}
                    className="mt-3 ml-3 bg-green-600 text-white px-4 py-2 rounded"
                  >
                    View Lessons
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------- My Courses -------- */}
        {active === "myCourses" && (
          <div>
            <h1 className="text-3xl font-bold mb-5">My Enrolled Courses</h1>
            <div className="grid grid-cols-3 gap-4">
              {myCourses.map((c) => (
                <div key={c._id} className="p-4 bg-white shadow rounded-lg">
                  <h2 className="text-xl font-bold">{c.title}</h2>
                  <button
                    onClick={() => fetchCourseLessons(c._id)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Open Lessons
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------- Course Lessons -------- */}
        {lessons.length > 0 && (
          <div className="mt-10">
            <h1 className="text-2xl font-bold">Lessons</h1>
            <ul className="mt-4 space-y-3">
              {lessons.map((l) => (
                <li
                  key={l._id}
                  className="p-3 bg-white shadow rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => fetchSingleLesson(l._id)}
                >
                  {l.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* -------- Single Lesson -------- */}
        {singleLesson && (
          <div className="mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold">{singleLesson.title}</h1>
            <p className="mt-3">{singleLesson.content}</p>
          </div>
        )}

        {/* -------- User Profile -------- */}
        {active === "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-5">Update Profile</h1>
            <form
              className="bg-white p-6 rounded shadow w-96"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="block mb-3">
                Full Name
                <input className="block w-full p-2 border rounded" />
              </label>

              <label className="block mb-3">
                Email
                <input className="block w-full p-2 border rounded" />
              </label>

              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
