// AuthContext.jsx — Aditya
// Task: Auth context + protected routing setup

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Protected Route component
export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // TODO: redirect to login when React Router is connected
    return <p>You must be logged in to view this page.</p>;
  }

  return children;
}
