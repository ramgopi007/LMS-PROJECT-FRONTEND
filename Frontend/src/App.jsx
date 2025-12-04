import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Logout from "./pages/authentication/logout";
import Settings from "./pages/authentication/settings";
import Profile from "./pages/authentication/profile";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import InstructorDashboard from "./pages/instructor/dashboard";
import StudentDashboard from "./pages/student/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />

        {/* DASHBOARDS */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </>
  );
}

export default App;
