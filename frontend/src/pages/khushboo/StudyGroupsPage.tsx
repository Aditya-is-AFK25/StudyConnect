// StudyGroupsPage.tsx — Khushboo
// React Bootstrap: Container, Row, Col, Card, Form, Button, Modal, Tabs, Tab, Badge, ListGroup
// Concepts:
//   - useState (all form/modal state)
//   - useEffect (fetch groups on mount)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container, Row, Col, Card, Form, Button, Modal, Tabs, Tab, Badge, ListGroup, InputGroup,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import {
  getGroups, createGroup as apiCreateGroup, joinGroup, leaveGroup,
  getGroupMembers, getGroupMessages, postGroupMessage, getNotesByGroup, createNote,
} from "../../services/api";
import GroupCard from "../../components/khushboo/GroupCard";

function StudyGroupsPage() {
  const { user } = useAuth();

  // Create form
  const [groupName, setGroupName]     = useState("");
  const [courseCode, setCourseCode]   = useState("");
  const [description, setDescription] = useState("");

  // Runtime
  const [groups, setGroups]       = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Members modal
  const [showMembersModal, setShowMembersModal]     = useState(false);
  const [activeGroupMembers, setActiveGroupMembers] = useState<any[]>([]);
  const [selectedGroupName, setSelectedGroupName]   = useState("");

  // Forum modal
  const [showForumModal, setShowForumModal]         = useState(false);
  const [activeForumGroup, setActiveForumGroup]     = useState<any>(null);
  const [forumMessages, setForumMessages]           = useState<any[]>([]);
  const [newMsgText, setNewMsgText]                 = useState("");
  const [isForumLoading, setIsForumLoading]         = useState(false);

  // Tabs inside forum modal
  const [forumTab, setForumTab]     = useState("messages");
  const [groupNotes, setGroupNotes] = useState<any[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteTitle, setNoteTitle]   = useState("");
  const [noteSubject, setNoteSubject] = useState("");
  const [noteFile, setNoteFile]     = useState<File | null>(null);
  const [noteUploading, setNoteUploading] = useState(false);

  // useEffect — fetch groups on mount
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const response = await getGroups();
      setGroups(response.data);
    } catch (error) {
      console.error("Database connection failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || !courseCode || !description) {
      alert("Please fill all fields to create a group");
      return;
    }
    try {
      await apiCreateGroup({ groupName, subject: courseCode, description });
      await fetchGroups();
      setGroupName(""); setCourseCode(""); setDescription("");
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const toggleJoin = async (groupId: string, isCurrentlyJoined: boolean) => {
    try {
      if (isCurrentlyJoined) { await leaveGroup(groupId); } else { await joinGroup(groupId); }
      await fetchGroups();
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleViewMembers = async (group: any) => {
    try {
      const response = await getGroupMembers(group.id);
      setActiveGroupMembers(response.data);
      setSelectedGroupName(group.name);
      setShowMembersModal(true);
    } catch {
      alert("Could not pull live session members list.");
    }
  };

  const handleViewForum = async (group: any) => {
    try {
      setActiveForumGroup(group);
      setSelectedGroupName(group.name);
      setForumMessages([]);
      setForumTab("messages");
      setIsForumLoading(true);
      setShowForumModal(true);
      const response = await getGroupMessages(group.id);
      setForumMessages(response.data);
    } catch {
      alert("Could not load forum messages.");
    } finally {
      setIsForumLoading(false);
    }
  };

  const isForumAdmin = Boolean(
    activeForumGroup && activeForumGroup.createdById === (user?._id || user?.id)
  );

  const handleRefreshMessages = async () => {
    if (!activeForumGroup) return;
    try {
      const response = await getGroupMessages(activeForumGroup.id);
      setForumMessages(response.data);
    } catch (err) {
      console.error("Refresh failed:", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    try {
      const response = await postGroupMessage(activeForumGroup.id, newMsgText);
      setForumMessages([...forumMessages, response.data]);
      setNewMsgText("");
    } catch {
      alert("Could not post message.");
    }
  };

  const handleLoadGroupNotes = async (groupId: string) => {
    try {
      setNotesLoading(true);
      const res = await getNotesByGroup(groupId);
      setGroupNotes(res.data);
    } catch (err) {
      console.error("Could not load group notes:", err);
    } finally {
      setNotesLoading(false);
    }
  };

  const handleTabSwitch = (tab: string) => {
    setForumTab(tab);
    if (tab === "notes" && activeForumGroup) handleLoadGroupNotes(activeForumGroup.id);
  };

  const handleUploadGroupNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteSubject.trim() || !noteFile) {
      alert("Fill in title, subject, and choose a file.");
      return;
    }
    try {
      setNoteUploading(true);
      const formData = new FormData();
      formData.append("title", noteTitle.trim());
      formData.append("subject", noteSubject.trim().toUpperCase());
      formData.append("description", "Group note: " + noteFile.name);
      formData.append("file", noteFile);
      formData.append("groupId", activeForumGroup.id);
      const res = await createNote(formData);
      setGroupNotes((prev) => [...prev, res.data]);
      setNoteTitle(""); setNoteSubject(""); setNoteFile(null);
      const fileInput = document.getElementById("group-note-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setNoteUploading(false);
    }
  };

  return (
    <Container style={{ maxWidth: 1200, padding: "2.5rem 1rem" }}>

      {/* Header */}
      <div className="header-section mb-4">
        <span className="header-tagline">👥 COLLABORATIVE LEARNING</span>
        <h1 className="header-title">Study Groups</h1>
        <p className="header-desc">
          Create or join specialized student circles to sync your learning objectives and track modules together.
        </p>
      </div>

      <Row className="g-4">
        {/* Create Group Form */}
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
              <h3 className="form-title">➕ Create Study Group</h3>
              <Form onSubmit={createGroup}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">GROUP NAME</Form.Label>
                  <Form.Control
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g. Java Hackers"
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">COURSE CODE</Form.Label>
                  <Form.Control
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. BCA-301"
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="form-label">DESCRIPTION</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this circle focusing on?"
                    className="form-textarea"
                  />
                </Form.Group>
                <Button type="submit" className="submit-btn w-100">Launch Group</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Groups List */}
        <Col md={8}>
          <h3 className="list-title">
            Active Circles{" "}
            {!isLoading && (
              <Badge bg="secondary" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                {groups.length}
              </Badge>
            )}
          </h3>
          {isLoading ? (
            <p className="loading-state">Syncing with server database...</p>
          ) : groups.length === 0 ? (
            <p className="empty-state">No active circles found. Create one to get started!</p>
          ) : (
            <div className="circles-stack">
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onViewMembers={handleViewMembers}
                  onViewForum={handleViewForum}
                  onToggleJoin={toggleJoin}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* ── MEMBERS MODAL — Bootstrap Modal ── */}
      <Modal show={showMembersModal} onHide={() => setShowMembersModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ background: "var(--card-bg)", color: "var(--ink)", border: "none" }}
        >
          <div>
            <small className="modal-tagline d-block">ROSTER</small>
            <Modal.Title>{selectedGroupName}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--card-bg)", color: "var(--ink)" }}>
          <ListGroup variant="flush">
            {activeGroupMembers.map((member, index) => (
              <ListGroup.Item
                key={index}
                className={`member-item ${member.isCurrentUser ? "current-user" : "other-user"}`}
                style={{ background: "transparent", color: "var(--ink)", borderColor: "rgba(35,40,31,0.1)" }}
              >
                {index + 1}. {member.name || member}{member.isAdmin ? " (Admin)" : ""}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer style={{ background: "var(--card-bg)", border: "none" }}>
          <Button variant="secondary" onClick={() => setShowMembersModal(false)}>Close Roster</Button>
        </Modal.Footer>
      </Modal>

      {/* ── FORUM MODAL — Bootstrap Modal with Tabs ── */}
      <Modal
        show={showForumModal}
        onHide={() => { setShowForumModal(false); setActiveForumGroup(null); }}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ background: "var(--card-bg)", color: "var(--ink)", border: "none" }}
        >
          <div className="w-100 d-flex align-items-center justify-content-between pe-3">
            <div>
              <small className="modal-tagline d-block">💬 DISCUSSION FORUM</small>
              <Modal.Title>{selectedGroupName}</Modal.Title>
            </div>
            {forumTab === "messages" && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleRefreshMessages}
                style={{ fontSize: "0.85rem" }}
              >
                ↻ Refresh
              </Button>
            )}
          </div>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--card-bg)", color: "var(--ink)" }}>
          {/* Bootstrap Tabs */}
          <Tabs
            activeKey={forumTab}
            onSelect={(k) => handleTabSwitch(k || "messages")}
            className="mb-3"
          >
            {/* Messages Tab */}
            <Tab eventKey="messages" title="💬 Messages">
              <div className="forum-messages-container mb-3">
                {isForumLoading ? (
                  <p className="loading-state">Syncing discussions...</p>
                ) : forumMessages.length === 0 ? (
                  <p className="empty-state">No messages posted yet. Start the conversation!</p>
                ) : (
                  <div className="forum-messages-list">
                    {forumMessages.map((msg) => (
                      <div key={msg.id} className="forum-message-bubble">
                        <div className="forum-message-meta">
                          <span className="forum-message-user">👤 {msg.userName}</span>
                          <span className="forum-message-time">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="forum-message-text">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Form onSubmit={handleSendMessage} className="forum-input-form d-flex gap-2">
                <Form.Control
                  type="text"
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  placeholder="Share a message with the group..."
                  className="form-input forum-input-field"
                />
                <Button type="submit" className="submit-btn forum-send-btn">Post</Button>
              </Form>
            </Tab>

            {/* Group Notes Tab */}
            <Tab eventKey="notes" title="📚 Group Notes">
              <Form onSubmit={handleUploadGroupNote} className="d-flex flex-column gap-2 mb-3">
                <Form.Control
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title"
                  className="form-input"
                  size="sm"
                />
                <Form.Control
                  type="text"
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  placeholder="Subject / Course code"
                  className="form-input"
                  size="sm"
                />
                <Form.Control
                  type="file"
                  id="group-note-file"
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                  onChange={(e: any) => setNoteFile(e.target.files[0])}
                  className="form-input"
                  size="sm"
                />
                <Button type="submit" className="submit-btn" disabled={noteUploading} size="sm">
                  {noteUploading ? "Uploading…" : "⬆️ Upload Note to Group"}
                </Button>
              </Form>

              <hr style={{ borderColor: "rgba(35,40,31,0.15)" }} />

              {notesLoading ? (
                <p className="loading-state">Loading group notes...</p>
              ) : groupNotes.length === 0 ? (
                <p className="empty-state">No notes shared in this group yet.</p>
              ) : (
                <ListGroup variant="flush">
                  {groupNotes.map((note) => (
                    <ListGroup.Item
                      key={note._id}
                      className="d-flex justify-content-between align-items-start"
                      style={{ background: "transparent", color: "var(--ink)", borderColor: "rgba(35,40,31,0.1)" }}
                    >
                      <div>
                        <strong style={{ fontSize: "0.9rem" }}>{note.title}</strong>
                        <Badge
                          bg="light"
                          text="dark"
                          className="ms-2"
                          style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--teal)", fontSize: "0.72rem" }}
                        >
                          {note.subject}
                        </Badge>
                        {note.uploadedBy?.name && (
                          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                            by {note.uploadedBy.name}
                          </div>
                        )}
                      </div>
                      {note.file && (
                        <a
                          href={`http://localhost:5001${note.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "0.8rem", color: "var(--teal)", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}
                        >
                          📥 Download
                        </a>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Tab>
          </Tabs>

          {/* Sessions link */}
          {activeForumGroup && (
            <div className="mt-2 text-end">
              <Link
                to={`/sessions?groupId=${activeForumGroup.id}`}
                className="open-sessions-tab-btn"
                onClick={() => setShowForumModal(false)}
              >
                {isForumAdmin ? "Create Session" : "Open Study Sessions"}
              </Link>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default StudyGroupsPage;
