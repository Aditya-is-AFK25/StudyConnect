// api.js — Aditya
// Task: API service layer — axios setup, matches backend contract

import axios from "axios";

// Base URL — points to the Express backend
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── AUTH ────────────────────────────────────────────────
export const registerUser  = (data) => api.post("/auth/register", data);
export const loginUser     = (data) => api.post("/auth/login", data);

// ─── PROFILE ─────────────────────────────────────────────
export const getProfile    = ()     => api.get("/users/profile");
export const updateProfile = (data) => api.put("/users/profile", data);

// ─── MATCHING ────────────────────────────────────────────
export const getMatches    = ()     => api.get("/matches");

export default api;
