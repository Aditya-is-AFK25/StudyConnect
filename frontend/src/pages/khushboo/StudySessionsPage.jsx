// StudySessionsPage.jsx — Khushboo
// Task: Study Sessions — create session, list sessions, join session

import React, { useState, useEffect } from "react";
import { getSessions, createSession as apiCreateSession, rsvpSession } from "../../services/api";
import "../../styles/khushboo.css";
import SessionCard from "../../components/khushboo/SessionCard";


function StudySessionsPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [goal, setGoal] = useState("");

  // Starting with no dummy data as requested
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch sessions on mount
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

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!date || !time || !location || !goal) {
      alert("Please supply all metrics for scheduling.");
      return;
    }
    
    const payload = {
      date,
      time,
      location,
      goal
    };

    try {
      const response = await apiCreateSession(payload);
      
      // Format the newly created session to match frontend format
      const created = response.data.session || response.data;
      const newSession = {
        id: created._id || created.id,
        _id: created._id || created.id,
        date: created.date ? new Date(created.date).toISOString().split('T')[0] : date,
        time: created.time || time,
        location: created.location || location,
        goal: created.topic || goal,
        status: "attending"
      };

      setSessions([newSession, ...sessions]);
      setDate("");
      setTime("");
      setLocation("");
      setGoal("");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await rsvpSession(id, { status: newStatus });
      setSessions(sessions.map(s => s.id === id ? { ...s, status: newStatus } : s));
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="study-sessions-container">
      {/* Header */}
      <div className="sessions-header">
        <span className="sync-tag">⏱️ CALENDAR SYNC</span>
        <h1 className="main-title">Study Sessions</h1>
        <p className="subtitle">
          Lock in event parameters, state targets, and handle swift RSVPs for synchronous peer reviews.
        </p>
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
              <label>LOCATION / LINK</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Room 402 or Digital Hub URL" />
            </div>
            <div className="form-group">
              <label>STUDY GOAL</label>
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Review Module 2 concepts..." />
            </div>
            <button type="submit" className="submit-btn">
              🗓️ Deploy Session
            </button>
          </form>
        </div>

        {/* Sessions Render */}
        <div className="slots-column">
          <h3 className="slots-title">Upcoming Slots</h3>

          {sessions.length === 0 ? (
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