import React, { useState, useEffect } from "react";
import { getSessions, createSession as apiCreateSession, rsvpSession } from "../../services/api";
import "../../styles/khushboo.css";
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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");

  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await getSessions();
        setSessions(response.data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !subject || !topic) {
      alert("Please supply all metrics (Date, Time, Subject, and Topic) for scheduling.");
      return;
    }
    
    const payload = {
      date,
      time,
      subject,
      topic,
      location: location || "Google Meet"
    };

    try {
      const response = await apiCreateSession(payload);
      
      const created = response.data.session || response.data;
      const newSession: SessionType = {
        id: created._id || created.id,
        _id: created._id || created.id,
        date: created.date ? new Date(created.date).toISOString().split('T')[0] : date,
        time: created.time || time,
        location: created.location || location || "Google Meet",
        goal: created.topic || topic,
        meetingLink: created.meetingLink,
        status: "attending"
      };

      setSessions([newSession, ...sessions]);
      setDate("");
      setTime("");
      setSubject("");
      setTopic("");
      setLocation("");
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await rsvpSession(id, { status: newStatus });
      setSessions(sessions.map(s => s.id === id ? { ...s, status: newStatus } : s));
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="study-sessions-container">
      {/* Header with Google Auth sync */}
      <div className="sessions-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="sync-tag">⏱️ CALENDAR SYNC</span>
          <h1 className="main-title">Study Sessions</h1>
          <p className="subtitle">
            Lock in event parameters, state targets, and handle swift RSVPs for synchronous peer reviews.
          </p>
        </div>
        <a 
          href="http://localhost:5001/api/google/auth" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#4285F4",
            color: "#ffffff",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: "600",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            transition: "background-color 0.2s",
            fontFamily: "inherit"
          }}
        >
          📅 Connect Google Calendar
        </a>
      </div>

      <div className="sessions-grid">
        {/* Form */}
        <div className="form-card">
          <h3 className="form-title">📅 Schedule Session</h3>
          <form onSubmit={handleCreateSession} className="session-form">
            <div className="form-row">
              <div className="form-group">
                <label>DATE</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>TIME</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>SUBJECT / COURSE</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. CS101, BCA-302" />
            </div>
            <div className="form-group">
              <label>STUDY GOAL / TOPIC</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Review Module 2 concepts..." />
            </div>
            <div className="form-group">
              <label>LOCATION (OR LEAVE BLANK FOR GOOGLE MEET)</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Room 402, Library, etc." />
            </div>
            <button type="submit" className="submit-btn">
              🗓️ Deploy Session
            </button>
          </form>
        </div>

        {/* Sessions Render */}
        <div className="slots-column">
          <h3 className="slots-title">Upcoming Slots</h3>

          {isLoading ? (
            <p className="empty-state">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <p className="empty-state">No sessions deployed yet. Fill out the form to schedule one!</p>
          ) : (
            sessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onUpdateStatus={updateStatus}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudySessionsPage;