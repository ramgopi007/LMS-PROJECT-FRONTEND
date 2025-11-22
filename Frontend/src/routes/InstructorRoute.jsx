// src/routes/InstructorRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const InstructorRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "instructor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default InstructorRoute;
