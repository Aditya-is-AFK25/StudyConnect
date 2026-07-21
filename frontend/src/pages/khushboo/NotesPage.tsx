// NotesPage.tsx — Khushboo
// React Bootstrap: Container, Row, Col, Card, Form, Alert, Badge, Button, ListGroup
// Concepts:
//   - useState (controlled form inputs)
//   - useEffect (fetch notes on mount)

import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Form, Button, Alert, Badge, InputGroup,
} from "react-bootstrap";
import { getNotes, createNote, deleteNoteApi } from "../../services/api";
import NoteCard from "../../components/khushboo/NoteCard";

function NotesPage() {
  const [title, setTitle]               = useState("");
  const [subject, setSubject]           = useState("");
  const [searchQuery, setSearchQuery]   = useState("");
  const [notes, setNotes]               = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors]             = useState<any>({});
  const [uploading, setUploading]       = useState(false);
  const [uploadError, setUploadError]   = useState("");

  // useEffect — fetch all notes on mount (UseEffectExample1 pattern)
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
    const tempErrors: any = {};
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
      const allowedExtensions = ["pdf", "doc", "docx", "txt", "ppt", "pptx"];
      const fileExt = selectedFile.name.split(".").pop()?.toLowerCase();
      if (!fileExt || !allowedExtensions.includes(fileExt)) {
        tempErrors.file = "Allowed formats: PDF, DOCX, DOC, TXT, PPT, PPTX.";
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        tempErrors.file = "File size must be less than 10MB.";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setUploading(true);
      setUploadError("");
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subject", subject.trim().toUpperCase());
      formData.append("description", "Uploaded notes document: " + selectedFile!.name);
      formData.append("file", selectedFile!);
      const response = await createNote(formData);
      setNotes((prev) => [...prev, response.data]);
      setTitle("");
      setSubject("");
      setSelectedFile(null);
      setErrors({});
      const fileInput = document.getElementById("note-file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
      setUploadError("Failed to upload note: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await deleteNoteApi(id);
      setNotes((prev) => prev.filter((note) => note._id !== id && note.id !== id));
    } catch (error: any) {
      alert("Failed to delete note: " + (error.response?.data?.message || error.message));
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ maxWidth: 1200, padding: "2.5rem 1rem" }}>

      {/* Header */}
      <div className="mb-4">
        <span className="notes-page__eyebrow">📚 NOTES REPOSITORY</span>
        <h1 className="notes-page__title">Notes Sharing</h1>
        <p className="notes-page__subtitle">
          Upload your study notes, organize them by subject, and help your peers learn together.
        </p>
      </div>

      {/* Stats Row — Bootstrap Cards */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <Card
            className="text-center stat-card"
            style={{ background: "var(--card-bg)", border: "1px solid rgba(35,40,31,0.12)", color: "var(--ink)" }}
          >
            <Card.Body>
              <h2 className="mb-0" style={{ fontFamily: "Fraunces, serif", fontSize: "2rem" }}>{notes.length}</h2>
              <p className="mb-0" style={{ fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace" }}>Total Notes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card
            className="text-center stat-card"
            style={{ background: "var(--card-bg)", border: "1px solid rgba(35,40,31,0.12)", color: "var(--ink)" }}
          >
            <Card.Body>
              <h2 className="mb-0" style={{ fontFamily: "Fraunces, serif", fontSize: "2rem" }}>
                {new Set(notes.map((n) => n.subject?.toLowerCase())).size}
              </h2>
              <p className="mb-0" style={{ fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace" }}>Unique Subjects</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Upload Sidebar */}
        <Col md={4}>
          <Card
            style={{
              background: "var(--card-bg)",
              border: "2px solid var(--ink)",
              borderRadius: 8,
              boxShadow: "4px 4px 0 var(--ink)",
              color: "var(--ink)",
              position: "sticky",
              top: "80px",
            }}
          >
            <Card.Body className="p-4">
              <h3 className="upload-card__title">📝 Add New Note</h3>

              {uploadError && (
                <Alert variant="danger" style={{ fontSize: "0.82rem", fontFamily: "JetBrains Mono, monospace" }}>
                  {uploadError}
                </Alert>
              )}

              <Form onSubmit={addNote}>
                <Form.Group className="mb-3">
                  <Form.Label className="field-label">Note Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Computer Networks Basics"
                    value={title}
                    isInvalid={!!errors.title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors((p: any) => ({ ...p, title: null }));
                    }}
                    className="field-input"
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="field-label">Subject / Course</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. BCA-302"
                    value={subject}
                    isInvalid={!!errors.subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors((p: any) => ({ ...p, subject: null }));
                    }}
                    className="field-input"
                  />
                  <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="field-label">Notes Document</Form.Label>
                  <Form.Control
                    type="file"
                    id="note-file-input"
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                    isInvalid={!!errors.file}
                    onChange={(e: any) => {
                      setSelectedFile(e.target.files[0]);
                      if (errors.file) setErrors((p: any) => ({ ...p, file: null }));
                    }}
                    className="field-input"
                  />
                  <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
                  <Form.Text muted style={{ fontSize: "0.73rem" }}>PDF, DOCX, TXT, PPT · Max 10MB</Form.Text>
                </Form.Group>

                <Button type="submit" className="btn-primary w-100" disabled={uploading}>
                  {uploading ? "Uploading..." : "⬆️ Upload Note"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Notes Feed */}
        <Col md={8}>
          {/* Search */}
          <InputGroup className="mb-4">
            <InputGroup.Text style={{ background: "var(--card-bg)", border: "1.5px solid var(--ink)", color: "var(--ink)" }}>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search notes by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              style={{ border: "1.5px solid var(--ink)", background: "var(--card-bg)", color: "var(--ink)" }}
            />
          </InputGroup>

          <h3 className="notes-list__heading">
            📖 All Notes{" "}
            <Badge bg="secondary" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
              {filteredNotes.length}
            </Badge>
          </h3>

          {filteredNotes.length === 0 ? (
            <p className="notes-list__empty">No notes found matching your search criteria.</p>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <NoteCard key={note._id || note.id} note={note} onDelete={deleteNote} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NotesPage;