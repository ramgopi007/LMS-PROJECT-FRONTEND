import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login form submitted");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        {/* Logo / App Name */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 tracking-wide">
          Next<span className="text-blue-500">Learn</span>
        </h1>

        {/* Login Form Container */}
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
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Log In
            </button>
          </form>

          {/* Don't have an account? */}
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

export default Login;
