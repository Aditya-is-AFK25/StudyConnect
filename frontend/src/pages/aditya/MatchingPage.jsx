import React, { useState, useEffect } from "react";
import {
  getMatches,
  sendConnectRequest,
  getIncomingRequests,
  getSentRequests,
  acceptConnectRequest,
  declineConnectRequest,
} from "../../services/api";
import LoadingSpinner from "../../components/khushboo/LoadingSpinner";

function MatchingPage() {
  const [candidates, setCandidates]           = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState("");

  // Set of toUser IDs that the current user has already sent a request to
  const [sentIds, setSentIds]                 = useState(new Set());
  // Map of requestId → "pending" for in-flight UI feedback
  const [buttonState, setButtonState]         = useState({}); // { userId: "sending" | "sent" | "error" }

  const [incomingRequests, setIncomingRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  // ── On mount: load candidates + already-sent requests + incoming ─────────
  useEffect(() => {
    const init = async () => {
      try {
        const [matchRes, sentRes, incomingRes] = await Promise.all([
          getMatches(),
          getSentRequests(),
          getIncomingRequests(),
        ]);

        setCandidates(matchRes.data);

        // Build a Set of userIds we've already sent requests to
        const alreadySent = new Set(
          sentRes.data
            .filter((r) => r.status === "pending")
            .map((r) => r.toUser.toString())
        );
        setSentIds(alreadySent);
        setIncomingRequests(incomingRes.data);
      } catch (err) {
        setError("Failed to load data. Please sign in again.");
      } finally {
        setLoading(false);
        setRequestsLoading(false);
      }
    };
    init();
  }, []);

  // ── Send connect request ──────────────────────────────────────────────────
  const handleConnect = async (peer) => {
    // Optimistically mark button as sending
    setButtonState((prev) => ({ ...prev, [peer._id]: "sending" }));
    try {
      await sendConnectRequest(peer._id);
      // Mark as sent in both sources of truth
      setSentIds((prev) => new Set([...prev, peer._id.toString()]));
      setButtonState((prev) => ({ ...prev, [peer._id]: "sent" }));
    } catch (err) {
      const msg = err.response?.data?.message || "Could not send request.";
      setButtonState((prev) => ({ ...prev, [peer._id]: "error" }));
      // Show inline error briefly then reset
      setTimeout(() => {
        setButtonState((prev) => ({ ...prev, [peer._id]: undefined }));
      }, 3000);
      console.error("sendConnectRequest error:", msg);
    }
  };

  // ── Accept / Decline incoming request ────────────────────────────────────
  const handleAccept = async (requestId) => {
    try {
      await acceptConnectRequest(requestId);
      setIncomingRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      alert(err.response?.data?.message || "Could not accept request.");
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await declineConnectRequest(requestId);
      setIncomingRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      alert(err.response?.data?.message || "Could not decline request.");
    }
  };

  // ── Button label & disabled logic ─────────────────────────────────────────
  const getButtonProps = (peer) => {
    const state = buttonState[peer._id];
    const alreadySent = sentIds.has(peer._id.toString());

    if (state === "sending") {
      return { label: "Sending…", disabled: true, style: { opacity: 0.6 } };
    }
    if (state === "sent" || alreadySent) {
      return {
        label: "✓ Request Sent",
        disabled: true,
        style: { backgroundColor: "var(--teal)", opacity: 0.85 },
      };
    }
    if (state === "error") {
      return {
        label: "⚠ Failed — Retry?",
        disabled: false,
        style: { backgroundColor: "var(--coral)" },
      };
    }
    return { label: "✉️ Connect With Peer", disabled: false, style: {} };
  };

  if (loading) {
    return <LoadingSpinner message="Finding your study partners..." />;
  }

  return (
    <div className="home-page" style={{ padding: "3rem 1.5rem", minHeight: "85vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Title Heading */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <span className="profile-badge">🤝 RECOMMENDATIONS</span>
          <h1 style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>Find Your Study Match</h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0.5rem auto 0 auto" }}>
            We've calculated overlap in course sections, schedules, and environment settings to find the best peer candidates for you.
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div style={{
            backgroundColor: "rgba(224, 86, 86, 0.08)",
            border: "1px solid rgba(224, 86, 86, 0.2)",
            color: "var(--coral)",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            marginBottom: "2rem"
          }}>
            {error}
          </div>
        )}

        {/* ── Incoming Requests Section ─────────────────────────────────────── */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem"
          }}>
            <span className="profile-badge" style={{ fontSize: "0.75rem" }}>📬 INCOMING</span>
            <h2 style={{ fontSize: "1.25rem", margin: 0 }}>
              Connection Requests
              {incomingRequests.length > 0 && (
                <span style={{
                  marginLeft: "0.5rem",
                  backgroundColor: "var(--coral)",
                  color: "#fff",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  padding: "0.15rem 0.5rem",
                  fontWeight: "700"
                }}>
                  {incomingRequests.length}
                </span>
              )}
            </h2>
          </div>

          {requestsLoading ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Loading requests…
            </p>
          ) : incomingRequests.length === 0 ? (
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              padding: "1rem 1.25rem",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.07)"
            }}>
              No pending incoming requests right now.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {incomingRequests.map((req) => (
                <div
                  key={req._id}
                  className="form-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    flexWrap: "wrap",
                    gap: "0.75rem"
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "1rem" }}>{req.fromUser?.name}</strong>
                    <span style={{
                      marginLeft: "0.5rem",
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontFamily: "JetBrains Mono, monospace"
                    }}>
                      {req.fromUser?.email}
                    </span>
                    {req.fromUser?.subjects?.length > 0 && (
                      <div style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Subjects: {req.fromUser.subjects.join(", ")}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      id={`accept-${req._id}`}
                      onClick={() => handleAccept(req._id)}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "var(--teal)",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "0.85rem"
                      }}
                    >
                      ✓ Accept
                    </button>
                    <button
                      id={`decline-${req._id}`}
                      onClick={() => handleDecline(req._id)}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: "6px",
                        border: "1px solid rgba(224,86,86,0.4)",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        color: "var(--coral)",
                        fontWeight: "600",
                        fontSize: "0.85rem"
                      }}
                    >
                      ✕ Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Peer Grid Cards Feed ──────────────────────────────────────────── */}
        {candidates.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>No classmate matches found yet. Try updating your profile subjects and availability!</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem"
          }}>
            {candidates.map((peer) => {
              const btnProps = getButtonProps(peer);
              return (
                <article key={peer._id} className="form-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

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
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default MatchingPage;
