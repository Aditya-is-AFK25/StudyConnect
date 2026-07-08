// LoadingSpinner.jsx — Khushboo
// Loading state UI

import React from "react";

import "../styles/khushboo.css";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
}

export default LoadingSpinner;
