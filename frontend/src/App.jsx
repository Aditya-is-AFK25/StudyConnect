import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./context/AuthContext";

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
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>

            {/* ── ADITYA'S ROUTES ── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
            <Route path="/match" element={<ProtectedRoute><MatchingPage /></ProtectedRoute>} />

            {/* ── KHUSHBOO'S ROUTES ── */}
            <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
            <Route path="/groups" element={<ProtectedRoute><StudyGroupsPage /></ProtectedRoute>} />
            <Route path="/sessions" element={<ProtectedRoute><StudySessionsPage /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><ProgressTrackerPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
