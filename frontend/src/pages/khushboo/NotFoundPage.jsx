// NotFoundPage.jsx — Khushboo
// Task: 404 / Not Found page

import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/khushboo.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        
        {/* Monospace 404 Code */}
        <span className="not-found-code">
          404
        </span>
        
        {/* Premium Serif Heading */}
        <h1 className="not-found-title">
          Class Dismissed... Early?
        </h1>
        
        {/* Witty Study-themed Copy */}
        <p className="not-found-text">
          We checked the syllabus, searched the library stacks, and even asked the smart kid in the front row, but this page seems to have dropped out this semester.
        </p>

        {/* Neubrutalist Design Navigation Button */}
        <button 
          onClick={() => navigate("/")} // Safety fallback directly to main portal route
          className="btn-back-home"
        >
          ← Back to Study Hall
        </button>
        
      </div>
    </div>
  );
}

export default NotFoundPage;