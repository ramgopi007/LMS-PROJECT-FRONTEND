import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../src/components/AuthenticationPages/SignUp";
import Login from "../src/components/AuthenticationPages/Login";

function App() {
  return (
    <Routes>
      {/* Default Route (Redirect to Signup) */}
      <Route path="/" element={<Navigate to="/signup" />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
