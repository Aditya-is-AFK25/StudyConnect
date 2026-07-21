// App.tsx — StudyConnect
// Concepts used:
//   - React.lazy + Suspense (taught in newapp/App.tsx) — lazy loads every page
//   - useState (dark/light mode toggle — ControlledComp pattern)
//   - HOC withPageLayout wraps all protected pages (MyContainer pattern)
//   - Conditional rendering (Navbar changes based on auth state)

import React, { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/aditya.css";
import "./styles/khushboo.css";

// Shared components
import Navbar from "./components/aditya/Navbar";
import LoadingBar from "./components/shared/LoadingBar";
import withPageLayout from "./components/shared/withPageLayout";

// ── Lazy-load ALL pages (React.lazy + Suspense) ────────────────────────────
// Aditya's pages
const HomePage         = React.lazy(() => import("./pages/aditya/HomePage"));
const RegisterPage     = React.lazy(() => import("./pages/aditya/RegisterPage"));
const LoginPage        = React.lazy(() => import("./pages/aditya/LoginPage"));
const EditProfilePage  = React.lazy(() => import("./pages/aditya/EditProfilePage"));
const MatchingPage     = React.lazy(() => import("./pages/aditya/MatchingPage"));

// Khushboo's pages
const NotesPage         = React.lazy(() => import("./pages/khushboo/NotesPage"));
const StudyGroupsPage   = React.lazy(() => import("./pages/khushboo/StudyGroupsPage"));
const StudySessionsPage = React.lazy(() => import("./pages/khushboo/StudySessionsPage"));
const ProgressTrackerPage = React.lazy(() => import("./pages/khushboo/ProgressTrackerPage"));
const NotFoundPage      = React.lazy(() => import("./pages/khushboo/NotFoundPage"));

// ── Apply HOC (withPageLayout) to all protected pages ─────────────────────
// This is the HOC pattern from MyContainer.tsx — wraps each page with layout
const HomeWithLayout         = withPageLayout(HomePage);
const EditProfileWithLayout  = withPageLayout(EditProfilePage);
const MatchingWithLayout     = withPageLayout(MatchingPage);
const NotesWithLayout        = withPageLayout(NotesPage);
const StudyGroupsWithLayout  = withPageLayout(StudyGroupsPage);
const SessionsWithLayout     = withPageLayout(StudySessionsPage);
const ProgressWithLayout     = withPageLayout(ProgressTrackerPage);

function App() {
  // useState for dark mode — controlled state (ControlledComp pattern)
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Suspense wraps all routes — shows LoadingBar while any lazy page loads */}
          <Suspense fallback={<LoadingBar />}>
            <Routes>

              {/* ── ADITYA'S ROUTES ── */}
              <Route path="/"             element={<HomeWithLayout />} />
              <Route path="/register"     element={<RegisterPage />} />
              <Route path="/login"        element={<LoginPage />} />
              <Route path="/profile/edit" element={<ProtectedRoute><EditProfileWithLayout /></ProtectedRoute>} />
              <Route path="/match"        element={<ProtectedRoute><MatchingWithLayout /></ProtectedRoute>} />

              {/* ── KHUSHBOO'S ROUTES ── */}
              <Route path="/notes"    element={<ProtectedRoute><NotesWithLayout /></ProtectedRoute>} />
              <Route path="/groups"   element={<ProtectedRoute><StudyGroupsWithLayout /></ProtectedRoute>} />
              <Route path="/sessions" element={<ProtectedRoute><SessionsWithLayout /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><ProgressWithLayout /></ProtectedRoute>} />
              <Route path="*"         element={<NotFoundPage />} />

            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
