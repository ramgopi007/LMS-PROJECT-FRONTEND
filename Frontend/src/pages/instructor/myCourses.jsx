import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiPlay,
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiPlusCircle,
  FiStar,
  FiUsers,
  FiClock,
  FiChevronUp,
} from "react-icons/fi";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [playingLesson, setPlayingLesson] = useState(null);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/lms/instructor/my-courses",
        { withCredentials: true }
      );
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lms/instructor/courses/${courseId}/lessons`,
        { withCredentials: true }
      );
      setLessons((prev) => ({
        ...prev,
        [courseId]: res.data.lessons || [],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course permanently?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/lms/instructor/courses/${courseId}`,
        { withCredentials: true }
      );
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch {
      alert("Failed to delete course");
    }
  };

  const deleteLesson = async (lessonId, courseId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/lms/instructor/lessons/${lessonId}`,
        { withCredentials: true }
      );
      setLessons((prev) => ({
        ...prev,
        [courseId]: prev[courseId].filter((lesson) => lesson._id !== lessonId),
      }));
    } catch {
      alert("Failed to delete lesson");
    }
  };

  const toggleLessons = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setPlayingLesson(null);
    } else {
      setExpandedCourse(courseId);
      setPlayingLesson(null);
      if (!lessons[courseId]) {
        await fetchLessons(courseId);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          My Courses
        </h1>
        <p className="text-gray-500 mt-2">Manage your curriculum and student engagement.</p>
      </header>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">No courses created yet. Start your journey today!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
            >
              {/* THUMBNAIL AREA */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail || "https://via.placeholder.com/400x200"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Stats Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <FiStar className="text-yellow-400 fill-yellow-400" /> {course.rating || 4.6}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <FiUsers /> {course.students || "1.2k"}
                    </span>
                  </div>
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <FiClock /> {course.totalDuration || "6h"}
                  </span>
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                  {course.description}
                </p>

                {/* ACTION BUTTONS GRID */}
                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button
                    onClick={() => navigate(`/instructor/dashboard?edit=${course._id}`)}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <FiEdit size={14} /> Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-600 hover:text-white transition-all"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>

                  <button
                    onClick={() => navigate(`/instructor/dashboard?addLesson=${course._id}`)}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-green-50 text-green-600 rounded-xl text-sm font-semibold hover:bg-green-600 hover:text-white transition-all"
                  >
                    <FiPlusCircle size={14} /> Add Lesson
                  </button>

                  <button
                    onClick={() => toggleLessons(course._id)}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                      expandedCourse === course._id 
                        ? "bg-gray-800 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {expandedCourse === course._id ? <FiChevronUp /> : <FiChevronDown />}
                    Lessons
                  </button>
                </div>

                {/* EXPANDABLE LESSONS LIST */}
                {expandedCourse === course._id && (
                  <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">
                      Course Curriculum
                    </h3>
                    {lessons[course._id]?.length ? (
                      <div className="max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {lessons[course._id].map((lesson, i) => (
                          <div
                            key={lesson._id}
                            className="group/lesson bg-gray-50 p-3 rounded-2xl mb-2 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex-1 pr-4">
                                <p className="font-bold text-xs text-gray-700">
                                  <span className="text-blue-500 mr-1">{String(i + 1).padStart(2, '0')}</span> {lesson.title}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">
                                  Duration: {lesson.duration}s
                                </p>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => setPlayingLesson(playingLesson === lesson._id ? null : lesson._id)}
                                  className="p-1.5 text-green-600 bg-white rounded-lg shadow-sm hover:bg-green-600 hover:text-white transition-all"
                                >
                                  <FiPlay size={12} />
                                </button>
                                <button
                                  onClick={() => navigate(`/instructor/dashboard?editLesson=${lesson._id}&course=${course._id}`)}
                                  className="p-1.5 text-blue-600 bg-white rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all"
                                >
                                  <FiEdit size={12} />
                                </button>
                                <button
                                  onClick={() => deleteLesson(lesson._id, course._id)}
                                  className="p-1.5 text-red-600 bg-white rounded-lg shadow-sm hover:bg-red-600 hover:text-white transition-all"
                                >
                                  <FiTrash2 size={12} />
                                </button>
                              </div>
                            </div>

                            {playingLesson === lesson._id && (
                              <div className="mt-3 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                <video
                                  src={lesson.videoUrl}
                                  controls
                                  className="w-full"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-[10px] italic py-2">
                        No lessons created for this course yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;