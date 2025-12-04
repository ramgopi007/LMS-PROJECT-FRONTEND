import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/lms/auth/login",
        { email, password },
        {
          withCredentials: true, // ⭐ Automatically receives HttpOnly cookie
          headers: { "Content-Type": "application/json" }
        }
      );

      const data = response.data;

      // Redirect based on role
      if (data.user.role === "instructor") {
        navigate("/instructor/dashboard");
      } else if (data.user.role === "Student") {
        navigate("/student/dashboard");
      } else {
        alert("Unknown role");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">

      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 tracking-wide">
        Next<span className="text-blue-500">Learn</span>
      </h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={handleSignupClick}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>

      <p className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} NextLearn. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
