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
          PAGE NOT FOUND
        </h1>
        
        {/* Clean Copy Text */}
        <p className="not-found-message">
          The resources or route you are trying to reach does not exist, or has been permanently shifted across academic directories.
        </p>

        {/* Neubrutalist Design Navigation Button */}
        <button 
          onClick={() => navigate("/")} // Safety fallback directly to main portal route
          className="btn-not-found"
        >
          ← Return to Portal
        </button>
        
      </div>
    </div>
  );
}

export default NotFoundPage;