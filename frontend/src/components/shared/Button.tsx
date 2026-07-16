// Button.jsx — Shared Component
// Used by both Aditya and Khushboo
// ⚠️ Discuss before editing

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: (e?: any) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Button({ label, onClick, type = "button", disabled = false }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
