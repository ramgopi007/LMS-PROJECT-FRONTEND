// src/app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
// add others later...

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
