// ProgressBar.jsx — Khushboo
// Shows subject progress %

import React from "react";

function ProgressBar({ subject, percentage }) {
  return (
    <div>
      <p>{subject}</p>
      <div style={{ width: `${percentage}%` }}></div>
      {/* TODO: Build progress bar UI here */}
    </div>
  );
}

export default ProgressBar;
