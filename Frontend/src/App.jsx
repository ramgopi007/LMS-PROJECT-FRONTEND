import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Logout from "./pages/authentication/logout";
import Navbar from "./components/navbar";
import Settings from "./pages/authentication/settings";
import Profile from "./pages/authentication/profile";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
