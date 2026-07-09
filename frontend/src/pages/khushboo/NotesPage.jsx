// NotesPage.jsx — Khushboo
// Task: Notes Sharing — upload form, list view, filter by subject, delete

import React, { useState, useEffect } from "react";
import "../../styles/khushboo.css";
import { getNotes, createNote, deleteNoteApi } from "../../services/api";

function NotesPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (title.trim() === "" || subject.trim() === "") {
      alert("Please fill all fields");
      return;
    }
    try {
      const payload = {
        title: title,
        subject: subject,
        description: "Custom uploaded peer study notes description."
      };
      const response = await createNote(payload);
      setNotes([...notes, response.data]);
      setTitle("");
      setSubject("");
    } catch (error) {
      alert("Failed to upload note to database: " + (error.response?.data?.message || error.message));
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteApi(id);
      setNotes(notes.filter((note) => note._id !== id && note.id !== id));
    } catch (error) {
      alert("Failed to delete note from database: " + (error.response?.data?.message || error.message));
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="notes-page">
      
      {/* Header Section */}
      <header className="notes-page__header">
        <span className="notes-page__eyebrow">📚 NOTES REPOSITORY</span>
        <h1 className="notes-page__title">Notes Sharing</h1>
        <p className="notes-page__subtitle">
          Upload your study notes, organize them by subject, and help your peers learn together.
        </p>
      </header>

      {/* Statistics Dashboard Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <h2>{notes.length}</h2>
          <p>Total Notes</p>
        </div>
        <div className="stat-card">
          <h2>{new Set(notes.map(n => n.subject.toLowerCase())).size}</h2>
          <p>Unique Subjects</p>
        </div>
      </section>

      {/* Layout Split Structure */}
      <div className="notes-page__layout">
        
        {/* Left Sidebar: Upload Document Form */}
        <aside className="upload-card">
          <h3 className="upload-card__title">📝 Add New Note</h3>
          <div className="upload-card__fields">
            <div>
              <label className="field-label">Note Title</label>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. Computer Networks Basics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">Subject / Course</label>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. BCA-302"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <button onClick={addNote} className="btn-primary">
              ⬆️ Upload Note
            </button>
          </div>
        </aside>

        {/* Right Section: Search and Dynamic Feed */}
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-input"
              placeholder="🔍 Search notes by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h3 className="notes-list__heading">
            <li>📖 All Notes ({filteredNotes.length})</li>
          </h3>

          {filteredNotes.length === 0 ? (
            <p className="notes-list__empty">No notes found matching your search criteria.</p>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <article key={note._id || note.id} className="note-card">
                  <div>
                    <div className="note-card__meta">
                      <span className="note-card__subject-tag">{note.subject}</span>
                      <span className="note-card__date">{note.date || new Date().toISOString().split('T')[0]}</span>
                    </div>
                    <h4 className="note-card__title">{note.title}</h4>
                    <p className="note-card__content">{note.description || note.content || "Custom uploaded peer study notes description."}</p>
                  </div>
                  
                  <div className="note-card__actions">
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert('Downloading file...'); }} 
                      className="btn-download"
                    >
                      📥 DOWNLOAD
                    </a>
                    <button 
                      onClick={() => deleteNote(note._id || note.id)} 
                      className="btn-delete"
                    >
                      DELETE
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default NotesPage;