// SessionCard.tsx — Khushboo
// Displays a single study session with Google Meet support

import React from "react";

interface SessionCardProps {
  session: {
    id?: string;
    _id?: string;
    date: string;
    time: string;
    location: string;
    goal: string;
    meetingLink?: string;
    status: string;
  };
  onUpdateStatus: (id: string, status: string) => void;
}

function SessionCard({ session, onUpdateStatus }: SessionCardProps) {
  const sessionId = session.id || session._id || "";
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
          {session.meetingLink && (
            <div style={{ marginTop: "0.75rem" }}>
              <a 
                href={session.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "#137333",
                  color: "#ffffff",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  transition: "background-color 0.2s"
                }}
              >
                🎥 Join Google Meet
              </a>
            </div>
          )}
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
          onClick={() => onUpdateStatus(sessionId, "attending")}
          className={`rsvp-btn ${session.status === "attending" ? "active-attending" : ""}`}
        >
          ✅ Attending
        </button>
        <button 
          onClick={() => onUpdateStatus(sessionId, "declined")}
          className={`rsvp-btn ${session.status === "declined" ? "active-declined" : ""}`}
        >
          ❌ Declined
        </button>
      </div>
    </div>
  );
}

export default SessionCard;
