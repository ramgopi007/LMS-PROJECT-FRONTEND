import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FiBook, FiUser, FiSearch, FiLoader, FiImage, 
  FiArrowLeft, FiPlayCircle, FiCheckCircle, FiLock 
} from "react-icons/fi";

const ExploreCourses = () => {
  // --- STATE MANAGEMENT ---
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Detail & Enrollment States
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  
  // State for Video Player
  const [activeVideo, setActiveVideo] = useState(null); 

  const BACKEND_URL = "http://localhost:5000";

  // --- 1. SEARCH LOGIC ---
  useEffect(() => {
    const results = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  // --- 2. INITIAL FETCH (All Courses) ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/lms/student/courses`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setCourses(res.data.data);
          setFilteredCourses(res.data.data);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchCourses();
  }, []);

  // --- 3. DETAIL FETCH (With State Reset Fix) ---
  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchDetails = async () => {
      setDetailLoading(true);
      // IMPORTANT: Clear previous detail so we don't show a stale "Enroll" button
      setCourseDetail(null); 
      
      try {
        const res = await axios.get(`${BACKEND_URL}/lms/student/courses/${selectedCourseId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const data = res.data.data;
          setCourseDetail(data);
          // Auto-select first lesson video if backend confirms enrollment
          if (data.isEnrolled && data.lessons?.length > 0) {
            setActiveVideo(data.lessons[0].videoUrl);
          } else {
            setActiveVideo(null);
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setDetailLoading(false);
      }
    };
    fetchDetails();
  }, [selectedCourseId]);

  // --- 4. ENROLLMENT HANDLER ---
  const handleEnroll = async () => {
    // Safety check to prevent double clicks or re-enrolling
    if (!courseDetail || courseDetail.isEnrolled || enrolling) return;

    setEnrolling(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/lms/student/courses/${selectedCourseId}/enroll`,
        {}, 
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update local state so UI updates immediately
        setCourseDetail(prev => ({ ...prev, isEnrolled: true }));
        if (courseDetail.lessons?.length > 0) {
          setActiveVideo(courseDetail.lessons[0].videoUrl);
        }
        alert("Enrolled successfully!");
      }
    } catch (err) {
      // If backend says 400 "Already enrolled", sync the UI
      if (err.response?.status === 400) {
        setCourseDetail(prev => ({ ...prev, isEnrolled: true }));
        if (courseDetail.lessons?.length > 0) {
          setActiveVideo(courseDetail.lessons[0].videoUrl);
        }
      } else {
        alert(err.response?.data?.message || "Enrollment failed");
      }
    } finally {
      setEnrolling(false);
    }
  };

  const getMediaUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('data:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BACKEND_URL}${cleanPath}`;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-indigo-600">
       <FiLoader className="animate-spin text-4xl" />
    </div>
  );

  // --- CASE A: DETAIL VIEW & VIDEO PLAYER ---
  if (selectedCourseId) {
    // LOADING GUARD: Only show content once detailLoading is false and courseDetail exists
    if (detailLoading || !courseDetail) {
      return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <FiLoader className="animate-spin text-4xl text-indigo-600" />
          <p className="text-slate-500 font-medium">Verifying enrollment status...</p>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
        <button 
          onClick={() => { setSelectedCourseId(null); setCourseDetail(null); setActiveVideo(null); }}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors"
        >
          <FiArrowLeft /> Back to Courses
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black rounded-[2rem] overflow-hidden aspect-video shadow-2xl relative border-4 border-white">
              {courseDetail.isEnrolled && activeVideo ? (
                <video 
                  key={activeVideo} 
                  controls 
                  controlsList="nodownload"
                  className="w-full h-full"
                  src={getMediaUrl(activeVideo)}
                />
              ) : (
                <div className="relative h-full flex items-center justify-center">
                   <img src={getMediaUrl(courseDetail.thumbnail)} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" alt="" />
                   <div className="relative z-10 text-center p-8">
                     <FiLock className="mx-auto text-white mb-4 opacity-80" size={50} />
                     <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Enroll to access lessons</h3>
                   </div>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{courseDetail.title}</h1>
              <p className="text-slate-600 leading-relaxed text-lg">{courseDetail.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full max-h-[600px]">
              <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Course Content</h3>
              </div>
              
              <div className="overflow-y-auto flex-1 p-2">
                {courseDetail.lessons?.map((lesson, idx) => (
                  <button 
                    key={lesson._id}
                    disabled={!courseDetail.isEnrolled}
                    onClick={() => setActiveVideo(lesson.videoUrl)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left mb-2 group ${
                      activeVideo === lesson.videoUrl 
                      ? "bg-indigo-600 text-white shadow-lg" 
                      : "hover:bg-slate-50 text-slate-700"
                    } ${!courseDetail.isEnrolled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeVideo === lesson.videoUrl ? "bg-white/20" : "bg-slate-100 text-slate-400"}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">{lesson.title}</p>
                    </div>
                    {courseDetail.isEnrolled ? (
                      <FiPlayCircle className={activeVideo === lesson.videoUrl ? "text-white" : "text-slate-300 group-hover:text-indigo-500"} />
                    ) : (
                      <FiLock className="text-slate-300" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 bg-white border-t border-slate-100">
                <button 
                  onClick={handleEnroll}
                  disabled={enrolling || courseDetail.isEnrolled}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    courseDetail.isEnrolled 
                    ? "bg-emerald-500 text-white cursor-default" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
                  }`}
                >
                  {enrolling ? <FiLoader className="animate-spin" /> : null}
                  {courseDetail.isEnrolled ? <><FiCheckCircle /> Enrolled</> : "Enroll Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Explore Courses</h2>
          <p className="text-slate-500 text-sm">{filteredCourses.length} courses available</p>
        </div>
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course._id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
            <div className="aspect-video bg-slate-100 relative">
              <img src={getMediaUrl(course.thumbnail)} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">${course.price || "Free"}</div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{course.title}</h3>
              <button 
                onClick={() => setSelectedCourseId(course._id)}
                className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCourses;