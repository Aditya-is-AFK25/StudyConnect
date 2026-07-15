// ProgressBar.jsx — Khushboo
// Shows progress %

import React from "react";

function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar-track">
      <div 
        className="progress-bar-fill" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
