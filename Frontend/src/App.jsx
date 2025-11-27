import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Logout from "./pages/authentication/logout";
/* import Navbar from "./components/navbar"; */
import Settings from "./pages/authentication/settings";
import Profile from "./pages/authentication/profile";
import Home from "./components/Home";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
     {/*  <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
