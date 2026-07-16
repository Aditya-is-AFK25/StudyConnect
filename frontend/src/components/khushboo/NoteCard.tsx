// NoteCard.jsx — Khushboo
// Displays a single note item

import React from "react";

function NoteCard({ note, onDelete }) {
  const noteDate = note.date || (note.createdAt ? new Date(note.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  
  return (
    <article className="note-card">
      <div>
        <div className="note-card__meta">
          <span className="note-card__subject-tag">{note.subject}</span>
          <span className="note-card__date">{noteDate}</span>
        </div>
        <h4 className="note-card__title">{note.title}</h4>
        <p className="note-card__content">{note.description || note.content || "Custom uploaded peer study notes description."}</p>
      </div>
      
      <div className="note-card__actions">
        {note.file ? (
          <a 
            href={`http://localhost:5001${note.file}`} 
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
          onClick={() => onDelete(note._id || note.id)} 
          className="btn-delete"
        >
          DELETE
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
