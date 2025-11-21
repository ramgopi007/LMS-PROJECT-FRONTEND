// src/services/tokenHandler.js

// Save JWT token to localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

// Get token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Remove token on logout
export const clearAuthToken = () => {
  localStorage.removeItem("token");
};

// Restore token on app load
export const loadAuthToken = () => {
  return localStorage.getItem("token");
};
