// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import InstructorRoute from "./InstructorRoute";
import { fetchProfile } from "../features/auth/authThunks";

// AUTH PAGES
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

// USER PAGES
import Home from "../pages/User/Home";
import AllCourses from "../pages/User/AllCourses";
import CourseDetails from "../pages/User/CourseDetails";
import EnrolledCourses from "../pages/User/EnrolledCourses";
import LessonPlayer from "../pages/User/LessonPlayer";
import UserProfile from "../pages/User/UserProfile";

// INSTRUCTOR PAGES
import InstructorDashboard from "../pages/Instructor/InstructorDashboard";
import MyCourses from "../pages/Instructor/MyCourses";
import CreateCourse from "../pages/Instructor/CreateCourse";
import EditCourse from "../pages/Instructor/EditCourse";
import AddLesson from "../pages/Instructor/AddLesson";
import EditLesson from "../pages/Instructor/EditLesson";
import InstructorProfile from "../pages/Instructor/InstructorProfile";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile()); // Auto login using cookie
  }, []);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<AllCourses />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* USER PROTECTED ROUTES */}
      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <EnrolledCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <LessonPlayer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* INSTRUCTOR PROTECTED ROUTES */}
      <Route
        path="/instructor/dashboard"
        element={
          <InstructorRoute>
            <InstructorDashboard />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/my-courses"
        element={
          <InstructorRoute>
            <MyCourses />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/create-course"
        element={
          <InstructorRoute>
            <CreateCourse />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/edit-course/:id"
        element={
          <InstructorRoute>
            <EditCourse />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/add-lesson/:courseId"
        element={
          <InstructorRoute>
            <AddLesson />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/edit-lesson/:lessonId"
        element={
          <InstructorRoute>
            <EditLesson />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/profile"
        element={
          <InstructorRoute>
            <InstructorProfile />
          </InstructorRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
