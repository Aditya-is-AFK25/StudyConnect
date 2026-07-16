// ErrorMessage.jsx — Khushboo
// Error state UI with a retry option

import React from "react";
import "../../styles/khushboo.css"; // Correct path for styles

function ErrorMessage({ message = "Something went wrong. Please try again.", onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;