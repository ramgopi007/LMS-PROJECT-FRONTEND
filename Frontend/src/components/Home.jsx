import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home"); 
  // home | allcourses | about | team

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100">

      {/* HEADER NAVBAR */}
      <header>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* LOGO */}
            <div className="flex-shrink-0">
              <div className="flex cursor-pointer" onClick={() => setActiveSection("home")}>
                <h2 className="text-3xl font-bold tracking-widest">
                  Next<span className="text-green-600">Learn</span>
                </h2>
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              className="inline-flex p-1 text-black border border-black lg:hidden"
            >
              {/* You can later add mobile menu logic */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* MENU ITEMS */}
            <div className="hidden ml-auto lg:flex lg:items-center lg:space-x-10">

              <button
                onClick={() => setActiveSection("home")}
                className="text-base font-semibold text-black hover:text-opacity-80"
              >
                Home
              </button>

              <button
                onClick={() => setActiveSection("allcourses")}
                className="text-base font-semibold text-black hover:text-opacity-80"
              >
                All Courses
              </button>

              <button
                onClick={() => setActiveSection("about")}
                className="text-base font-semibold text-black hover:text-opacity-80"
              >
                About
              </button>

              <button
                onClick={() => setActiveSection("team")}
                className="text-base font-semibold text-black hover:text-opacity-80"
              >
                Team
              </button>

              <div className="w-px h-5 bg-black/20"></div>

              {/* LOGIN BUTTON → ROUTE TO LOGIN PAGE */}
              <button
                onClick={() => navigate("/login")}
                className="text-base font-semibold text-black hover:text-opacity-80"
              >
                Log in
              </button>

              {/* REGISTER BUTTON → ROUTE TO SIGNUP PAGE */}
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold
                text-black border-2 border-black hover:bg-black hover:text-white transition-all"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT SECTION */}
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {/* HOME SECTION */}
          {activeSection === "home" && (
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                  Best Online Education with
                  <div className="relative inline-flex">
                    <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-green-400"></span>
                    <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                      NextLearn.
                    </h1>
                  </div>
                </h1>

                <p className="mt-8 text-base text-black sm:text-xl">
                  Your Gateway to Knowledge and Growth. Discover a world of
                  comprehensive learning resources, expert guidance, and tools
                  designed to empower your educational journey.
                </p>

                <div className="mt-10 flex items-center gap-5">
                  <button
                    className="px-10 py-4 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600"
                    onClick={() => setActiveSection("allcourses")}
                  >
                    Get Started
                  </button>

                  <a className="inline-flex items-center text-base font-semibold hover:opacity-80">
                    <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor">
                      <path fill="#F97316" stroke="#F97316"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch video
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  className="w-[70%]"
                  src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
                  alt=""
                />
              </div>
            </div>
          )}

          {/* ALL COURSES SECTION */}
          {activeSection === "allcourses" && (
            <h2 className="text-4xl font-bold text-center">All Courses Section</h2>
          )}

          {/* ABOUT SECTION */}
          {activeSection === "about" && (
            <h2 className="text-4xl font-bold text-center">About Us Section</h2>
          )}

          {/* TEAM SECTION */}
          {activeSection === "team" && (
            <h2 className="text-4xl font-bold text-center">Our Team Section</h2>
          )}

        </div>
      </section>
    </div>
  );
};

export default Home;
