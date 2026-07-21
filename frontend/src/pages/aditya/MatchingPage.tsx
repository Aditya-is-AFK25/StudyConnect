// MatchingPage.tsx — Aditya
// React Bootstrap: Container, Row, Col, Card, Badge, Button, Alert, Spinner, ListGroup
// Concepts: useState, useEffect (fetch on mount), conditional rendering

import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Badge, Button, Alert, Spinner, ListGroup,
} from "react-bootstrap";
import {
  getMatches, sendConnectRequest, getIncomingRequests, getSentRequests,
  acceptConnectRequest, declineConnectRequest,
} from "../../services/api";
import MatchCard from "../../components/aditya/MatchCard";

function MatchingPage() {
  const [candidates, setCandidates]             = useState<any[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState("");
  const [sentIds, setSentIds]                   = useState<Set<string>>(new Set());
  const [buttonState, setButtonState]           = useState<Record<string, string>>({});
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [requestsLoading, setRequestsLoading]   = useState(true);

  // useEffect — fetch all data on mount (taught in UseEffectExample1)
  useEffect(() => {
    const init = async () => {
      try {
        const [matchRes, sentRes, incomingRes] = await Promise.all([
          getMatches(), getSentRequests(), getIncomingRequests(),
        ]);
        setCandidates(matchRes.data);
        const alreadySent = new Set<string>(
          sentRes.data
            .filter((r: any) => r.status === "pending")
            .map((r: any) => r.toUser.toString())
        );
        setSentIds(alreadySent);
        setIncomingRequests(incomingRes.data);
      } catch {
        setError("Failed to load data. Please sign in again.");
      } finally {
        setLoading(false);
        setRequestsLoading(false);
      }
    };
    init();
  }, []);

  const handleConnect = async (peer: any) => {
    setButtonState((prev) => ({ ...prev, [peer._id]: "sending" }));
    try {
      await sendConnectRequest(peer._id);
      setSentIds((prev) => new Set([...prev, peer._id.toString()]));
      setButtonState((prev) => ({ ...prev, [peer._id]: "sent" }));
    } catch {
      setButtonState((prev) => ({ ...prev, [peer._id]: "error" }));
      setTimeout(() => setButtonState((prev) => ({ ...prev, [peer._id]: "" })), 3000);
    }
  };

  const handleAccept = async (requestId: string) => {
    try {
      await acceptConnectRequest(requestId);
      setIncomingRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Could not accept request.");
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineConnectRequest(requestId);
      setIncomingRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Could not decline request.");
    }
  };

  const getButtonProps = (peer: any) => {
    const state = buttonState[peer._id];
    const alreadySent = sentIds.has(peer._id.toString());
    if (state === "sending") return { label: "Sending…", disabled: true, variant: "secondary" };
    if (state === "sent" || alreadySent) return { label: "✓ Request Sent", disabled: true, variant: "success" };
    if (state === "error") return { label: "⚠ Failed — Retry?", disabled: false, variant: "danger" };
    return { label: "✉️ Connect With Peer", disabled: false, variant: "primary" };
  };

  if (loading) {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: "var(--forest)" }} />
          <p className="mt-3" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--text-secondary)" }}>
            Finding your study partners...
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: 1200, padding: "3rem 1rem" }}>
      {/* Title */}
      <div className="text-center mb-5">
        <span className="profile-badge">🤝 RECOMMENDATIONS</span>
        <h1 style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>Find Your Study Match</h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "0.5rem auto 0" }}>
          We've calculated overlap in course sections, schedules, and environment settings to find the best peer candidates for you.
        </p>
      </div>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Incoming Requests */}
      <div className="mb-5">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="profile-badge" style={{ fontSize: "0.75rem" }}>📬 INCOMING</span>
          <h2 style={{ fontSize: "1.3rem", margin: 0 }}>
            Connection Requests{" "}
            {incomingRequests.length > 0 && (
              <Badge bg="danger" pill style={{ fontSize: "0.75rem", verticalAlign: "middle" }}>
                {incomingRequests.length}
              </Badge>
            )}
          </h2>
        </div>

        {requestsLoading ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Loading requests…</p>
        ) : incomingRequests.length === 0 ? (
          <p
            style={{
              color: "var(--text-secondary)", fontSize: "0.875rem",
              padding: "1rem 1.25rem", background: "rgba(255,255,255,0.03)",
              borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            No pending incoming requests right now.
          </p>
        ) : (
          <ListGroup variant="flush">
            {incomingRequests.map((req) => (
              <ListGroup.Item
                key={req._id}
                className="d-flex align-items-center justify-content-between flex-wrap gap-2 py-3"
                style={{ background: "var(--card-bg)", color: "var(--ink)", border: "1px solid rgba(35,40,31,0.12)", borderRadius: 8, marginBottom: "0.5rem" }}
              >
                <div>
                  <strong>{req.fromUser?.name}</strong>
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
                    {req.fromUser?.email}
                  </span>
                  {req.fromUser?.subjects?.length > 0 && (
                    <div style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      Subjects: {req.fromUser.subjects.join(", ")}
                    </div>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="success" id={`accept-${req._id}`} onClick={() => handleAccept(req._id)}>✓ Accept</Button>
                  <Button size="sm" variant="outline-danger" id={`decline-${req._id}`} onClick={() => handleDecline(req._id)}>✕ Decline</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>

      {/* Peer Cards Grid */}
      {candidates.length === 0 ? (
        <div className="text-center py-5">
          <p style={{ color: "var(--text-secondary)" }}>
            No classmate matches found yet. Try updating your profile subjects and availability!
          </p>
        </div>
      ) : (
        <Row className="g-4">
          {candidates.map((peer) => {
            const btnProps = getButtonProps(peer);
            return (
              <Col key={peer._id} md={6} lg={4}>
                <MatchCard
                  peer={peer}
                  btnProps={btnProps}
                  handleConnect={handleConnect}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default MatchingPage;
