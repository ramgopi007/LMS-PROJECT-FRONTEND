import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // REFS FOR SCROLLING
  const homeRef = useRef(null);
  const coursesRef = useRef(null);
  const aboutRef = useRef(null);
  const teamRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100">
      {/* NAVBAR */}
      <header>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 lg:h-20">
            {/* LOGO */}
            <div className="flex-shrink-0 cursor-pointer">
              <h2 className="text-3xl font-bold tracking-widest">
                Next<span className="text-blue-500">Learn</span>
              </h2>
            </div>

            {/* MENU ITEMS */}
            <div className="hidden ml-auto lg:flex lg:items-center lg:space-x-10">
              <button
                onClick={() => scrollToSection(homeRef)}
                className="text-base font-semibold hover:text-opacity-70"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection(coursesRef)}
                className="text-base font-semibold hover:text-opacity-70"
              >
                All Courses
              </button>

              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-base font-semibold hover:text-opacity-70"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection(teamRef)}
                className="text-base font-semibold hover:text-opacity-70"
              >
                Team
              </button>

              <div className="w-px h-5 bg-black/20"></div>

              <button
                onClick={() => navigate("/login")}
                className="font-semibold hover:text-opacity-70"
              >
                Log in
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2.5 border-2 border-black font-semibold hover:bg-black hover:text-white"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 mx-auto max-w-7xl">
        {/* HOME SECTION */}
        <div ref={homeRef} className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
                Best Online Education with{" "}
                <span className="text-green-500 underline">NextLearn</span>
              </h1>

              <p className="mt-8 text-lg">
                Your Gateway to Knowledge and Growth. Discover courses,
                resources, and expert guidance to empower your learning.
              </p>

              <div className="mt-10 flex gap-5">
                <button className="px-10 py-4 bg-orange-500 text-white hover:bg-orange-600">
                  Get Started
                </button>

                <a className="text-base font-semibold cursor-pointer hover:opacity-80">
                  ▶ Watch Video
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                className="w-[70%]"
                src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* ALL COURSES SECTION */}
        <div ref={coursesRef} className="mt-[50px]">
          <h2 className="text-4xl font-bold text-center mb-10">All Courses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="w-16 h-16 mx-auto mb-4 animate-floating"
                />

                <h3 className="text-xl font-semibold text-center">
                  {course.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div ref={aboutRef} className="mt-[50px]">
          <h2 className="text-4xl font-bold text-center mb-5">About Us</h2>
          <p className="text-center text-lg">
            NextLearn is a modern e-learning platform created to help individuals learn new skills...
          </p>
        </div>

        {/* TEAM SECTION */}
        <div ref={teamRef} className="mt-[50px]">
          <h2 className="text-4xl font-bold text-center mb-10">Our Team</h2>

          {/* Founder Card */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <img
              src="gopi.jpg"
              alt="Founder"
              className="w-28 h-28 mx-auto rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold mt-4">T Ramgopinath</h3>
            <p className="text-lg text-gray-700 font-medium">
              Founder & Developer – NextLearn
            </p>
            <p className="mt-4 text-gray-600">
              NextLearn was created with a vision to make learning simple...
            </p>
          </div>

          {/* Instructor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
            {/* Instructor 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:-translate-y-2 transition-all duration-300">
              <img
                src="guptha.jpg"
                className="w-24 h-24 mx-auto rounded-full mb-4 animate-floating"
                alt="Instructor"
              />
              <h3 className="text-xl font-semibold">Guptha</h3>
              <p className="text-gray-600">Senior React Instructor</p>
              <p className="mt-2 text-sm text-gray-500">
                Expert in modern front-end frameworks with 6+ years of experience.
              </p>
            </div>

            {/* Instructor 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:-translate-y-2 transition-all duration-300">
              <img
                src="tharun2.jpg"
                className="w-24 h-24 mx-auto rounded-full mb-4 animate-floating"
                alt="Instructor"
              />
              <h3 className="text-xl font-semibold">Tharun Kumar</h3>
              <p className="text-gray-600">Python & AI Instructor</p>
              <p className="mt-2 text-sm text-gray-500">
                AI specialist with deep expertise in machine learning.
              </p>
            </div>

            {/* Instructor 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:-translate-y-2 transition-all duration-300">
              <img
                src="sanjay.jpg"
                className="w-24 h-24 mx-auto rounded-full mb-4 animate-floating"
                alt="Instructor"
              />
              <h3 className="text-xl font-semibold">Sanjay</h3>
              <p className="text-gray-600">Full Stack Instructor</p>
              <p className="mt-2 text-sm text-gray-500">
                Specialist in MERN stack development.
              </p>
            </div>

            {/* Instructor 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:-translate-y-2 transition-all duration-300">
              <img
                src="vinay.jpg"
                className="w-24 h-24 mx-auto rounded-full mb-4 animate-floating"
                alt="Instructor"
              />
              <h3 className="text-xl font-semibold">Vinay Kumar Reddy</h3>
              <p className="text-gray-600">Java & Backend Instructor</p>
              <p className="mt-2 text-sm text-gray-500">
                7+ years of enterprise backend experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- FOOTER ----------------------------- */}
      <footer className="bg-black text-white mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold tracking-widest">
              Next<span className="text-blue-400">Learn</span>
            </h2>
            <p className="mt-4 text-gray-300">
              Empowering learners with modern skills for a better future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection(homeRef)}>Home</li>
              <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection(coursesRef)}>Courses</li>
              <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection(aboutRef)}>About</li>
              <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection(teamRef)}>Team</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-300">📞 +91 98765 43210</p>
            <p className="text-gray-300 mt-2">📧 nextlearn@gmail.com</p>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>

            <div className="space-y-2 text-gray-300">
              <p className="cursor-pointer hover:text-white">🌐 Instagram</p>
              <p className="cursor-pointer hover:text-white">🌐 LinkedIn</p>
              <p className="cursor-pointer hover:text-white">🌐 YouTube</p>
            </div>
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
