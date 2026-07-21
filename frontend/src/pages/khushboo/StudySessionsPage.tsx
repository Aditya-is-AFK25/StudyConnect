// StudySessionsPage.tsx — Khushboo
// React Bootstrap: Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge
// Concepts: useState, useEffect (fetch on mount), conditional rendering

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge,
} from "react-bootstrap";
import { getSessions, getGroups, createSession as apiCreateSession, rsvpSession } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import SessionCard from "../../components/khushboo/SessionCard";

interface SessionType {
  id: string;
  _id: string;
  date: string;
  time: string;
  location: string;
  goal: string;
  meetingLink?: string;
  status: string;
}

function StudySessionsPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [date, setDate]         = useState("");
  const [time, setTime]         = useState("");
  const [subject, setSubject]   = useState("");
  const [topic, setTopic]       = useState("");
  const [location, setLocation] = useState("");

  const [sessions, setSessions]         = useState<SessionType[]>([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const [groupName, setGroupName]       = useState("");
  const [formError, setFormError]       = useState("");

  // useEffect — fetch sessions on mount (UseEffectExample1 pattern)
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await getSessions(groupId ? { groupId } : undefined);
        setSessions(response.data);
        if (groupId) {
          const groupsResponse = await getGroups();
          const group = groupsResponse.data.find((item: any) => item.id === groupId);
          setGroupName(group?.name || "this group");
          setIsGroupAdmin(Boolean(group && group.createdById === (user?._id || user?.id)));
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, [groupId, user]);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !subject || !topic) {
      setFormError("Please supply all metrics (Date, Time, Subject, and Topic) for scheduling.");
      return;
    }
    setFormError("");
    try {
      const response = await apiCreateSession({
        date,
        time,
        subject,
        topic,
        location: location.trim() || undefined,
        groupId: groupId || undefined,
      });
      const created = response.data.session || response.data;
      const newSession: SessionType = {
        id: created._id || created.id,
        _id: created._id || created.id,
        date: created.date ? new Date(created.date).toISOString().split("T")[0] : date,
        time: created.time || time,
        location: created.location || "Google Meet",
        goal: created.topic || topic,
        meetingLink: created.meetingLink,
        status: "attending",
      };
      setSessions([newSession, ...sessions]);
      setDate(""); setTime(""); setSubject(""); setTopic(""); setLocation("");
    } catch (error: any) {
      setFormError(error.response?.data?.message || error.message);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await rsvpSession(id, { status: newStatus });
      setSessions(sessions.map((s) => s.id === id ? { ...s, status: newStatus } : s));
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="study-sessions-container">
      <div className="sessions-header">
        <div>
          <span className="sync-tag">⏱️ Calendar Sync</span>
          <h1 className="main-title">Study Sessions</h1>
          <p className="subtitle">Schedule a session, auto-create a Google Meet when blank, and share the link instantly.</p>
        </div>
      </div>

      <div className="sessions-grid">
        <div className="form-card">
          {isGroupAdmin ? (
            <div className="session-form">
              <h3 className="form-title">📅 Schedule Session</h3>
              {formError && (
                <Alert variant="danger" style={{ fontSize: "0.82rem", fontFamily: "JetBrains Mono, monospace" }}>
                  {formError}
                </Alert>
              )}
              <Form onSubmit={handleCreateSession} className="session-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">DATE</label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">TIME</label>
                    <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">SUBJECT / COURSE</label>
                  <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. CS101, BCA-302" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">STUDY GOAL / TOPIC</label>
                  <Form.Control type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Review Module 2 concepts..." className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">LOCATION (leave blank for Google Meet)</label>
                  <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Optional: Room 402, Library..." className="form-input" />
                </div>
                <Button type="submit" className="submit-btn">🗓️ Deploy Session</Button>
              </Form>
            </div>
          ) : (
            <div>
              <h3 className="form-title">Study Sessions</h3>
              <p className="empty-state">Only the group admin can create a session. You can view and join scheduled sessions.</p>
            </div>
          )}
        </div>

        <div className="slots-column">
          <div className="slots-title-row">
            <h3 className="slots-title">Upcoming Slots</h3>
            {!isLoading && (
              <Badge bg="secondary" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                {sessions.length}
              </Badge>
            )}
          </div>

          {isLoading ? (
            <div className="loading-state">
              <Spinner animation="border" style={{ color: "var(--forest)" }} />
              <p className="mt-2">Loading sessions...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="empty-state">No sessions deployed yet. Fill out the form to schedule one!</div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} onUpdateStatus={updateStatus} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudySessionsPage;
