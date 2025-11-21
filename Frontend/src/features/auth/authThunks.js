// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, loginAPI } from "./authAPI";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      return await signupAPI(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginAPI(credentials);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid credentials");
    }
  }
);
