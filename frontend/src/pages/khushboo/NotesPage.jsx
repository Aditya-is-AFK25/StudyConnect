// NotesPage.jsx — Khushboo
// Task: Notes Sharing — upload form, list view, filter by subject, delete

import React, { useState } from "react";
import NoteCard from "../../components/khushboo/NoteCard";
import LoadingSpinner from "../../components/khushboo/LoadingSpinner";
import ErrorMessage from "../../components/khushboo/ErrorMessage";
import "../../styles/khushboo.css";

function NotesPage() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  const [notes, setNotes] = useState([
    { id: 1, title: "Java Notes", subject: "Java", content: "Core concepts of OOPs.", date: "2026-07-07" },
    { id: 2, title: "React Notes", subject: "React", content: "Understanding components and states.", date: "2026-07-07" }
  ]);

  // Test functions
  const triggerLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // 3 second baad spinner apne aap hat jayega
  };

  const addNote = () => {
    if (title === "" || subject === "") {
      alert("Please fill all fields");
      return;
    }
    const newNote = {
      id: Date.now(),
      title: title,
      subject: subject,
      content: "Custom uploaded note description.",
      date: "2026-07-07"
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setSubject("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // 1. if state of loading is true 
  if (loading) {
    return <LoadingSpinner />;
  }

  // 2. if state of error is true
  if (error) {
    return <ErrorMessage message="Server failure! Note fetch nahi ho paya." onRetry={() => setError(false)} />;
  }

  return (
    <div className="notes-page-container">
      <h1>Notes Sharing</h1>

      
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={triggerLoadingTest} style={{ backgroundColor: "#e2e8f0", padding: "8px" }}>
          Test Loading Spinner (3s)
        </button>
        <button onClick={() => setError(true)} style={{ backgroundColor: "#fed7d7", padding: "8px", color: "#c53030" }}>
          Test Error Page
        </button>
      </div>

      <h3>Add Note</h3>
      <input type="text" placeholder="Enter Note Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" style={{ marginBottom: "10px", display: "block" }} />
      <input type="text" placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-input" style={{ marginBottom: "10px", display: "block" }} />
      <button onClick={addNote} className="upload-submit-btn">Upload Note</button>

      <hr className="section-divider" />

      <h3>All Notes</h3>
      <div className="notes-grid-layout">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;