// src/features/auth/authApi.js
import API from "../../services/axiosInstance";

// LOGIN API
export const loginApi = (data) => {
  return API.post("lms/auth/login", data);  
  // backend sets the HTTP-only cookie
};

// SIGNUP API
export const signupApi = (data) => {
  return API.post("lms/auth/signup", data);
};

// LOGOUT API — backend clears cookie
export const logoutApi = () => {
  return API.post("lms/auth/logout");
};

// USER PROFILE API — backend checks cookie
export const fetchProfileApi = () => {
  return API.get("lms/auth/profile");
};
