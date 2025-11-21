// src/features/auth/authAPI.js
import API from "../../services/axiosInstance";

export const signupAPI = async (data) => {
  const res = await API.post("/lms/auth/signup", data);
  return res.data;
};

export const loginAPI = async (data) => {
  const res = await API.post("/lms/auth/login", data);
  return res.data;
};
