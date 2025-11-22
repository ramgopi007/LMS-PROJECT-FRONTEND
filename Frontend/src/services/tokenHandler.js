// src/services/tokenHandler.js

// No storing or reading JWT token — cookie is HTTP-only

// Logout action only handled by backend clearing cookie
export const clearAuthToken = () => {
  console.warn("Token is stored in HTTP-only cookies. Logout is handled by backend.");
};

// Optional helper — checks *presence* of any cookies (not 100% reliable)
export const isAuthenticated = () => {
  return document.cookie !== ""; 
};
