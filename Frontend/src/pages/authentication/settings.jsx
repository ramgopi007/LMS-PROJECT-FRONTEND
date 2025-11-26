import { useState } from "react";
import { FiUser, FiLock, FiBell, FiPlayCircle, FiMoon, FiTrash2 } from "react-icons/fi";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#0F1629] text-gray-200 p-6">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-6">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Sidebar */}
        <div className="bg-[#1B233A] p-4 rounded-xl border border-[#2A3454] h-max">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>

          <ul className="space-y-3">
            {[
              "Profile Settings",
              "Account Security",
              "Notifications",
              "Course Preferences",
              "Appearance",
              "Danger Zone"
            ].map((item, i) => (
              <li
                key={i}
                className="px-3 py-2 bg-[#0F1629] border border-[#2A3454] rounded-lg cursor-pointer hover:bg-[#2A3454]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile Settings */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiUser className="text-xl" />
              <h2 className="text-xl font-semibold">Profile Settings</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454] outline-none" />

              <input type="email" placeholder="Email Address"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454] outline-none" />

              <input type="text" placeholder="Username"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454] outline-none" />

              <input type="text" placeholder="Phone Number"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454] outline-none" />
            </div>

            <button className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Save Changes
            </button>
          </div>

          {/* Account Security */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiLock className="text-xl" />
              <h2 className="text-xl font-semibold">Account Security</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="password" placeholder="Current Password"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]" />

              <input type="password" placeholder="New Password"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]" />

              <input type="password" placeholder="Confirm New Password"
                className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454]" />
            </div>

            <button className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Update Password
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiBell className="text-xl" />
              <h2 className="text-xl font-semibold">Notification Settings</h2>
            </div>

            <div className="space-y-4">
              {["Email Alerts", "Course Updates", "Assignment Reminders", "Instructor Announcements"].map((label, i) => (
                <label key={i} className="flex items-center justify-between">
                  <span>{label}</span>
                  <input type="checkbox" className="w-5 h-5" />
                </label>
              ))}
            </div>
          </div>

          {/* Course Preferences */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiPlayCircle className="text-xl" />
              <h2 className="text-xl font-semibold">Course Preferences</h2>
            </div>

            <label className="block mb-3">
              Default Video Speed:
              <select className="bg-[#0F1629] p-3 rounded-lg border border-[#2A3454] mt-1 w-full">
                <option>1x (Normal)</option>
                <option>1.25x</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
            </label>

            <label className="flex items-center justify-between">
              Autoplay Next Video
              <input type="checkbox" className="w-5 h-5" />
            </label>

            <label className="flex items-center justify-between mt-3">
              Auto Download Resources
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>

          {/* Appearance */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiMoon className="text-xl" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>

            <label className="flex items-center justify-between">
              Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5"
              />
            </label>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#1B233A] p-6 rounded-xl border border-[#2A3454]">
            <div className="flex items-center gap-3 mb-4">
              <FiTrash2 className="text-xl text-red-500" />
              <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
            </div>

            <p className="text-gray-400 mb-4">
              Deleting your account is irreversible. All your courses, progress, and settings will be permanently removed.
            </p>

            <button className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
              Delete My Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
