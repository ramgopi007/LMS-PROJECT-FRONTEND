// src/services/axiosInstance.js

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/lms",
  withCredentials: true, // THIS sends cookies automatically
});

// Request interceptor — no token required (cookie is automatic)
API.interceptors.request.use(
  (config) => {
    return config; // No Authorization header needed
  },
  (error) => Promise.reject(error)
);

// Response interceptor — optional for errors
API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default API;
