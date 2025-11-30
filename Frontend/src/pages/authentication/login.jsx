import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  // 🔥 LOGIN SUBMIT FUNCTION (Works With Your Backend)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/lms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT — stores the JWT cookie
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // Store user details
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "instructor") {
        navigate("/instructor/dashboard");
      } else if (data.user.role === "Student") {
        navigate("/student/dashboard");
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        
        {/* Logo */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 tracking-wide">
          Next<span className="text-blue-500">Learn</span>
        </h1>

        {/* Form */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Log In
            </button>
          </form>

          {/* Signup link */}
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

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} NextLearn. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Login;
