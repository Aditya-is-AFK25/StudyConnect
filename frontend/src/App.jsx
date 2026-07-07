import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Aditya's Pages
import HomePage from "./pages/aditya/HomePage";
import RegisterPage from "./pages/aditya/RegisterPage";
import LoginPage from "./pages/aditya/LoginPage";
import EditProfilePage from "./pages/aditya/EditProfilePage";
import MatchingPage from "./pages/aditya/MatchingPage";

// Aditya's Components
import Navbar from "./components/aditya/Navbar";

// Khushboo's Pages
import NotesPage from "./pages/khushboo/NotesPage";
import StudyGroupsPage from "./pages/khushboo/StudyGroupsPage";
import StudySessionsPage from "./pages/khushboo/StudySessionsPage";
import ProgressTrackerPage from "./pages/khushboo/ProgressTrackerPage";
import NotFoundPage from "./pages/khushboo/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* ── ADITYA'S ROUTES ── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/match" element={<MatchingPage />} />

          {/* ── KHUSHBOO'S ROUTES ── */}
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/groups" element={<StudyGroupsPage />} />
          <Route path="/sessions" element={<StudySessionsPage />} />
          <Route path="/progress" element={<ProgressTrackerPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
