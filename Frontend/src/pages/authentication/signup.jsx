import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // Form States
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); 
  const [skills, setSkills] = useState("");   // ⭐ New
  const [bio, setBio] = useState("");         // ⭐ New

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        role,
        skills,  // ⭐ New
        bio,     // ⭐ New
      };

      const response = await axios.post(
        "http://localhost:5000/lms/auth/signup",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup success:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Try again!");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 tracking-wide">
          Next<span className="text-blue-500">Learn</span>
        </h1>

        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSignupSubmit} className="space-y-4">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="Student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* ⭐ Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Skills
              </label>
              <input
                type="text"
                placeholder="E.g. React, Node.js, UI/UX..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* ⭐ Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Bio
              </label>
              <textarea
                placeholder="Tell us something about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button onClick={handleLoginClick} className="text-blue-500 hover:underline">
              Log in
            </button>
          </p>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} NextLearn. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Signup;
