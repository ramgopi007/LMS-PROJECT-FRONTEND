import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-6">
      
      {/* NextLearn Logo */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 tracking-wide text-center">
        Next<span className="text-blue-500">Learn</span>
      </h1>

      {/* Logout Box */}
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
          Logout
        </h2>

        <p className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          Are you sure you want to log out from your account?
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition duration-200 text-sm sm:text-base"
        >
          Logout
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 text-blue-600 hover:underline text-center text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs sm:text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} NextLearn. All rights reserved.
      </p>
    </div>
  );
};

export default Logout;
