// MatchCard.jsx — Aditya
// Task: Card UI for displaying a study match

import React from "react";

function MatchCard({ peer, btnProps, handleConnect }) {
  return (
    <article className="form-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* Peer Header */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.3rem", margin: 0 }}>{peer.name}</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
              {peer.email}
            </span>
          </div>
          {/* Compatibility Score */}
          <div style={{
            backgroundColor: "rgba(93, 172, 161, 0.1)",
            color: "var(--teal)",
            padding: "0.35rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: "700",
            fontFamily: "JetBrains Mono, monospace"
          }}>
            ⚡ Score: {peer.score}
          </div>
        </div>

        {/* Bio */}
        <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "1.25rem" }}>
          {peer.bio || "This peer hasn't added a bio yet."}
        </p>

        {/* Enrolled Courses */}
        <div style={{ marginBottom: "1rem" }}>
          <span className="field-label" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Enrolled Subjects</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
            {peer.subjects?.map((sub, idx) => {
              const isShared = peer.sharedSubjects?.includes(sub);
              return (
                <span key={idx} style={{
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  backgroundColor: isShared ? "var(--teal)" : "rgba(255,255,255,0.06)",
                  color: isShared ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: isShared ? "600" : "400"
                }}>
                  {sub} {isShared && "✓"}
                </span>
              );
            })}
          </div>
        </div>

        {/* Study Availability */}
        <div style={{ marginBottom: "1rem" }}>
          <span className="field-label" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Availability Schedule</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
            {peer.availability?.map((slot, idx) => {
              const isShared = peer.sharedAvailability?.includes(slot);
              return (
                <span key={idx} style={{
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  backgroundColor: isShared ? "rgba(93, 172, 161, 0.15)" : "rgba(255,255,255,0.04)",
                  color: isShared ? "var(--teal)" : "var(--text-muted)",
                  border: isShared ? "1px solid var(--teal)" : "1px solid transparent"
                }}>
                  {slot}
                </span>
              );
            })}
          </div>
        </div>

        {/* Preferred Environment */}
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="field-label" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Preferred Environment</span>
          <div style={{ marginTop: "0.25rem" }}>
            <span style={{
              fontSize: "0.85rem",
              color: peer.environmentMatch ? "var(--teal)" : "var(--text-secondary)",
              fontWeight: peer.environmentMatch ? "600" : "400"
            }}>
              📍 {peer.environment || "Library"} {peer.environmentMatch && "(Shared Preferred Environment)"}
            </span>
          </div>
        </div>
      </div>

      {/* Connect Action Button */}
      <div>
        <button
          id={`connect-${peer._id}`}
          onClick={() => !btnProps.disabled && handleConnect(peer)}
          disabled={btnProps.disabled}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "0.9rem",
            cursor: btnProps.disabled ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            ...btnProps.style,
          }}
        >
          {btnProps.label}
        </button>
      </div>
    </article>
  );
}

export default MatchCard;
