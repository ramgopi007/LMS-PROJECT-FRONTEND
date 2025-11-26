import { FiEdit2, FiMail, FiPhone, FiMapPin, FiBookOpen } from "react-icons/fi";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0F1629] text-gray-200 p-6">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE — Profile Card */}
        <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454] flex flex-col items-center">
          
          {/* Profile Image */}
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-[#2A3454] object-cover"
          />

          <h2 className="mt-4 text-2xl font-semibold">T. Ramgopinath</h2>
          <p className="text-gray-400">Full Stack Developer</p>

          {/* Contact Info */}
          <div className="w-full mt-6 space-y-3">
            <div className="flex items-center gap-3 bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]">
              <FiMail className="text-gray-400" />
              <span>ramgopiramgopi231@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]">
              <FiPhone className="text-gray-400" />
              <span>+91 85229 03812</span>
            </div>

            <div className="flex items-center gap-3 bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]">
              <FiMapPin className="text-gray-400" />
              <span>Chennai, India</span>
            </div>
          </div>

          <button className="mt-6 px-4 py-2 w-full bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center gap-2">
            <FiEdit2 />
            Edit Profile
          </button>

        </div>

        {/* RIGHT SIDE — Details */}
        <div className="lg:col-span-2 space-y-6">

          {/* About Section */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <h2 className="text-xl font-semibold mb-3">About Me</h2>
            <p className="text-gray-400 leading-relaxed">
              I am a passionate full-stack developer with experience in building scalable
              web applications using React, Node.js, MongoDB, and modern front-end
              technologies. I enjoy creating user-friendly interfaces and solving real-world
              problems through development.
            </p>
          </div>

          {/* Skills */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <h2 className="text-xl font-semibold mb-3">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "JavaScript",
                "Node.js",
                "MongoDB",
                "HTML",
                "CSS",
                "Tailwind CSS",
                "Express.js"
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#0F1629] border border-[#2A3454] rounded-lg text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Completed Courses */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiBookOpen className="text-xl" />
              <h2 className="text-xl font-semibold">Completed Courses</h2>
            </div>

            <div className="space-y-3">
              {[
                "MERN Full-Stack Development",
                "JavaScript Advanced Concepts",
                "React Hooks & Context API",
                "Backend APIs with Node.js"
              ].map((course, i) => (
                <div
                  key={i}
                  className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;
