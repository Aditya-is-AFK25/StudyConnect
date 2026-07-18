// api.js — Aditya
// Task: API service layer — axios setup, matches backend contract

import axios from "axios";

export const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Base URL — points to the Express backend
const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
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
export const getProfile    = ()     => api.get("/auth/profile");
export const updateProfile = (data) => api.put("/auth/profile", data);

// ─── MATCHING ────────────────────────────────────────────
export const getMatches    = ()     => api.get("/match/matches");

// ─── CONNECT REQUESTS ────────────────────────────────────
export const sendConnectRequest  = (userId)  => api.post(`/match/connect/${userId}`);
export const getIncomingRequests = ()        => api.get("/match/requests");
export const getSentRequests     = ()        => api.get("/match/requests/sent");
export const acceptConnectRequest  = (id)   => api.put(`/match/requests/${id}/accept`);
export const declineConnectRequest = (id)   => api.put(`/match/requests/${id}/decline`);

// ─── NOTES ───────────────────────────────────────────────
export const getNotes      = ()     => api.get("/notes");
export const getNotesByGroup = (groupId) => api.get(`/notes?groupId=${groupId}`);
export const createNote    = (formData) => api.post("/notes", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const updateNote    = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNoteApi = (id)   => api.delete(`/notes/${id}`);

// ─── GROUPS ──────────────────────────────────────────────
export const getGroups       = ()     => api.get("/groups");
export const createGroup     = (data) => api.post("/groups", data);
export const joinGroup       = (id)   => api.post(`/groups/${id}/join`);
export const leaveGroup      = (id)   => api.post(`/groups/${id}/leave`);
export const getGroupMembers = (id)   => api.get(`/groups/${id}/members`);
export const getGroupMessages = (id)   => api.get(`/groups/${id}/messages`);
export const postGroupMessage = (id, text) => api.post(`/groups/${id}/messages`, { text });

// ─── SESSIONS ────────────────────────────────────────────
export const getSessions     = (params?: { groupId?: string }) => api.get("/sessions", { params });
export const createSession    = (data) => api.post("/sessions", data);
export const rsvpSession     = (id, data) => api.post(`/sessions/${id}/join`, data);

// ─── PROGRESS ────────────────────────────────────────────
export const getProgress     = ()     => api.get("/progress");
export const updateProgress   = (id, data) => api.put(`/progress/${id}`, data);

export default api;
