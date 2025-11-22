// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi, logoutApi, fetchProfileApi } from "./authApi";

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginApi(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// REGISTER USER  (renamed from signupUser)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await signupApi(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// FETCH USER PROFILE (auto-login using cookie)
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await fetchProfileApi();
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

// LOGOUT USER
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await logoutApi();
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// ⭐ DEFAULT EXPORT (contains all thunks)
export default {
  loginUser,
  registerUser,
  fetchProfile,
  logoutUser,
};
