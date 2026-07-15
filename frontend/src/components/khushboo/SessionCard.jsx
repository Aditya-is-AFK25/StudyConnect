// SessionCard.jsx — Khushboo
// Displays a single study session

import React from "react";

function SessionCard({ session, onUpdateStatus }) {
  return (
    <div className="session-card">
      <div className="card-top">
        <div>
          <div className="meta-info">
            <span>📅 {session.date}</span>
            <span>⏰ {session.time}</span>
            <span className="meta-location">📍 {session.location}</span>
          </div>
          <h4 className="goal-title">Target: {session.goal}</h4>
        </div>

        {/* Badge indicator */}
        {session.status && (
          <span className={`status-badge ${session.status}`}>
            {session.status.toUpperCase()}
          </span>
        )}
      </div>

      <div className="rsvp-section">
        <span className="rsvp-label">RSVP STATUS:</span>
        <button 
          onClick={() => onUpdateStatus(session.id || session._id, "attending")}
          className={`rsvp-btn ${session.status === "attending" ? "active-attending" : ""}`}
        >
          ✅ Attending
        </button>
        <button 
          onClick={() => onUpdateStatus(session.id || session._id, "declined")}
          className={`rsvp-btn ${session.status === "declined" ? "active-declined" : ""}`}
        >
          ❌ Declined
        </button>
      </div>
    </div>
  );
}

export default SessionCard;
