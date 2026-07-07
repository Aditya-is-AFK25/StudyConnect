// Button.jsx — Shared Component
// Used by both Aditya and Khushboo
// ⚠️ Discuss before editing

import React from "react";

function Button({ label, onClick, type = "button", disabled = false }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
