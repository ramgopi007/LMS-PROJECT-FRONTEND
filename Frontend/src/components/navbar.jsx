import { useState, useRef, useEffect } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#0F1629] border-b border-[#1E253A] px-4 py-3 flex items-center justify-between relative z-50">
      {/* Left - Logo + App Name */}
      <div className="flex items-center gap-3">
        <img
          src="/src/assets/images/nextlearn-logo.png"
          alt="logo"
          className="w-8 h-8"
        />
        <h1 className="text-xl font-semibold text-white">
          Next<span className="text-[#6366F1]">Learn</span>
        </h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex w-1/3 bg-[#1B233A] px-3 py-2 rounded-lg items-center border border-[#2A3454]">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-gray-200 ml-2 w-full placeholder-gray-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* SIGN UP BUTTON */}
        <button
          onClick={() => navigate("/signup")}
          className="hidden sm:block px-5 py-2 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#818CF8] text-white font-medium hover:from-[#5558e8] hover:to-[#6b75ff] transition"
        >
          Sign Up
        </button>

        {/* Profile + Click Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-9 h-9 rounded-full border border-[#2A3454] cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)} // Toggle on click
          />

          {/* Dropdown */}
          {openDropdown && (
            <div className="absolute right-0 mt-3 w-44 bg-[#1B233A] border border-[#2A3454] rounded-xl shadow-xl p-2 text-gray-200 animate-fadeIn">
              <button
                className="w-full text-left px-3 py-2 hover:bg-[#2A3454] rounded-lg"
                onClick={() => {
                  navigate("/profile");
                  setOpenDropdown(false);
                }}
              >
                View Profile
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-[#2A3454] rounded-lg"
                onClick={() => {
                  navigate("/settings");
                  setOpenDropdown(false);
                }}
              >
                Settings
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-red-500 rounded-lg text-red-300 hover:text-white mt-1"
                onClick={() => {
                  navigate("/logout");
                  setOpenDropdown(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
