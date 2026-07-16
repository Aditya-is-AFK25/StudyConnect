// InputField.jsx — Shared Component
// Used by both Aditya and Khushboo
// ⚠️ Discuss before editing

import React from "react";

function InputField({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
