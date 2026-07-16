// LoadingSpinner.jsx — Khushboo (Shared Component)
// Reusable loading state component. Used by MatchingPage and EditProfilePage.

import React from "react";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "6rem 2rem",
      gap: "1.25rem"
    }}>
      {/* Spinning ring */}
      <div style={{
        width: "44px",
        height: "44px",
        border: "3px solid rgba(35, 40, 31, 0.12)",
        borderTop: "3px solid var(--forest, #3d5a47)",
        borderRadius: "50%",
        animation: "spin 0.75s linear infinite"
      }} />

      {/* Inline keyframe — self-contained so component works anywhere */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.85rem",
        color: "var(--forest, #3d5a47)",
        margin: 0,
        letterSpacing: "0.05em"
      }}>
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner;
