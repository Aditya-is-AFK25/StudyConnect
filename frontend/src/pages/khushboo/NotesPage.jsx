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
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const tempErrors = {};
    if (!title || title.trim().length < 3 || title.trim().length > 100) {
      tempErrors.title = "Note title must be between 3 and 100 characters.";
    }
    const courseRegex = /^[A-Za-z]{2,5}[-\s]?\d{3,4}$/;
    if (!subject || !courseRegex.test(subject.trim())) {
      tempErrors.subject = "Enter a valid course code (e.g. BCA-301, CS101).";
    }
    if (!selectedFile) {
      tempErrors.file = "Please select a notes document to upload.";
    } else {
      const allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx'];
      const fileExt = selectedFile.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExt)) {
        tempErrors.file = "Allowed formats: PDF, DOCX, DOC, TXT, PPT, PPTX.";
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        tempErrors.file = "File size must be less than 10MB.";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const addNote = async () => {
    if (!validateForm()) return;
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subject", subject.trim().toUpperCase());
      formData.append("description", "Uploaded notes document: " + selectedFile.name);
      formData.append("file", selectedFile);

      const response = await createNote(formData);
      setNotes([...notes, response.data]);
      setTitle("");
      setSubject("");
      setSelectedFile(null);
      setErrors({});
      document.getElementById("note-file-input").value = "";
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
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }));
                }}
              />
              {errors.title && (
                <span style={{ color: "var(--coral)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", marginTop: "0.25rem", display: "block" }}>
                  {errors.title}
                </span>
              )}
            </div>

            <div>
              <label className="field-label">Subject / Course</label>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. BCA-302"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) setErrors(prev => ({ ...prev, subject: null }));
                }}
              />
              {errors.subject && (
                <span style={{ color: "var(--coral)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", marginTop: "0.25rem", display: "block" }}>
                  {errors.subject}
                </span>
              )}
            </div>

            <div>
              <label className="field-label">Notes Document (.pdf, .docx, .txt, .ppt)</label>
              <input
                type="file"
                id="note-file-input"
                className="field-input"
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  if (errors.file) setErrors(prev => ({ ...prev, file: null }));
                }}
                style={{ padding: "0.5rem" }}
              />
              {errors.file && (
                <span style={{ color: "var(--coral)", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace", marginTop: "0.25rem", display: "block" }}>
                  {errors.file}
                </span>
              )}
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
                    {note.file ? (
                      <a 
                        href={`http://localhost:5000${note.file}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-download"
                      >
                        📥 DOWNLOAD
                      </a>
                    ) : (
                      <span className="btn-download" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                        NO FILE
                      </span>
                    )}
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