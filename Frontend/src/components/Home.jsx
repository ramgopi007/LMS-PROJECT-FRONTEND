import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // REFS
  const homeRef = useRef(null);
  const coursesRef = useRef(null);
  const aboutRef = useRef(null);
  const teamRef = useRef(null);

  const scrollToSection = (ref) => {
    setMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 bg-white z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* LOGO */}
            <div className="cursor-pointer">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-widest">
                Next<span className="text-blue-500">Learn</span>
              </h2>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center space-x-10">
              <button onClick={() => scrollToSection(homeRef)}>Home</button>
              <button onClick={() => scrollToSection(coursesRef)}>All Courses</button>
              <button onClick={() => scrollToSection(aboutRef)}>About</button>
              <button onClick={() => scrollToSection(teamRef)}>Team</button>

              <button onClick={() => navigate("/login")}>Log in</button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 border-2 border-black hover:bg-black hover:text-white"
              >
                Register
              </button>
            </div>

            {/* MOBILE MENU ICON */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="flex flex-col space-y-4 px-6 py-6">
              <button onClick={() => scrollToSection(homeRef)}>Home</button>
              <button onClick={() => scrollToSection(coursesRef)}>All Courses</button>
              <button onClick={() => scrollToSection(aboutRef)}>About</button>
              <button onClick={() => scrollToSection(teamRef)}>Team</button>
              <button onClick={() => navigate("/login")}>Log in</button>
              <button
                onClick={() => navigate("/signup")}
                className="border px-4 py-2"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* ================= HOME ================= */}
        <div ref={homeRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Best Online Education with{" "}
                <span className="text-green-500 underline">NextLearn</span>
              </h1>

              <p className="mt-6 sm:mt-8 text-base sm:text-lg">
                Your Gateway to Knowledge and Growth. Discover courses,
                resources, and expert guidance to empower your learning.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-5">
                <button className="px-8 sm:px-10 py-3 sm:py-4 bg-orange-500 text-white hover:bg-orange-600">
                  Get Started
                </button>

                <a className="text-base font-semibold cursor-pointer">
                  ▶ Watch Video
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                className="w-[80%] sm:w-[65%] lg:w-[70%]"
                src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* ================= COURSES ================= */}
        <div ref={coursesRef} className="mt-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            All Courses
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[
              { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
              { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
              { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
              { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
              { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
              { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
              { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
              { name: "AI", logo: "https://cdn-icons-png.flaticon.com/512/4712/4712104.png" },
              { name: "Machine Learning", logo: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png" },
              { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
              { name: "SQL", logo: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png" },
              { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
              { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-xl border hover:shadow-xl hover:-translate-y-2 transition transform duration-300"
              >
                <img
                  src={course.logo}
                  alt={course.name}
                  className="w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-4 animate-floating"
                />
                <h3 className="text-base sm:text-lg font-semibold text-center">
                  {course.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ABOUT ================= */}
        <div ref={aboutRef} className="mt-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5">About Us</h2>
          <p className="text-base sm:text-lg">
            NextLearn is a next-generation online learning platform created with a vision to empower learners with modern, in-demand skills. We bridge the gap between traditional education and industry requirements by offering practical, project-based courses taught by experienced instructors.At NextLearn, we believe learning should be simple, engaging, and outcome-driven. Our platform provides structured courses, real-world examples, and continuous support to help learners gain confidence and job-ready expertise.We are committed to building a learning community where curiosity is encouraged, growth is continuous, and success is achievable for everyone.
          </p>
        </div>

        {/* ================= TEAM (UNCHANGED CONTENT) ================= */}
        <div ref={teamRef} className="mt-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Our Team
          </h2>

          {/* Founder */}
          <div className="max-w-3xl mx-auto mb-16 text-center px-4">
            <img
              src="gopi.jpg"
              alt="Founder"
              className="w-24 sm:w-28 h-24 sm:h-28 mx-auto rounded-full shadow-md"
            />
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">
              T Ramgopinath
            </h3>
            <p className="text-base sm:text-lg font-medium">
              Founder & Developer – NextLearn
            </p>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              NextLearn was created with a vision to make learning simple...
            </p>
          </div>

          {/* Instructors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 sm:px-5">
            {[
              { name: "Guptha", role: "Senior React Instructor", img: "guptha.jpg", desc: "Expert in modern front-end frameworks with 6+ years of experience." },
              { name: "Tharun Kumar", role: "Python & AI Instructor", img: "tharun2.jpg", desc: "AI specialist with deep expertise in machine learning." },
              { name: "Sanjay", role: "Full Stack Instructor", img: "sanjay.jpg", desc: "Specialist in MERN stack development." },
              { name: "Vinay Kumar Reddy", role: "Java & Backend Instructor", img: "vinay.jpg", desc: "7+ years of enterprise backend experience." }
            ].map((ins, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center hover:-translate-y-2 transition-all duration-300">
                <img
                  src={ins.img}
                  className="w-20 sm:w-24 h-20 sm:h-24 mx-auto rounded-full mb-4 animate-floating"
                  alt="Instructor"
                />
                <h3 className="text-lg sm:text-xl font-semibold">{ins.name}</h3>
                <p className="text-gray-600">{ins.role}</p>
                <p className="mt-2 text-sm text-gray-500">{ins.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER (UNCHANGED CONTENT) ================= */}
      <footer className="bg-black text-white mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-3xl font-bold tracking-widest">
              Next<span className="text-blue-400">Learn</span>
            </h2>
            <p className="mt-4 text-gray-300">
              Empowering learners with modern skills for a better future.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li onClick={() => scrollToSection(homeRef)} className="cursor-pointer hover:text-white">Home</li>
              <li onClick={() => scrollToSection(coursesRef)} className="cursor-pointer hover:text-white">Courses</li>
              <li onClick={() => scrollToSection(aboutRef)} className="cursor-pointer hover:text-white">About</li>
              <li onClick={() => scrollToSection(teamRef)} className="cursor-pointer hover:text-white">Team</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-300">📞 +91 8522903812</p>
            <p className="text-gray-300 mt-2">📧 nextlearn@gmail.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <p className="text-gray-300">🌐 Instagram</p>
            <p className="text-gray-300">🌐 LinkedIn</p>
            <p className="text-gray-300">🌐 YouTube</p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} NextLearn. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
