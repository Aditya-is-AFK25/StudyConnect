// StudyGroupsPage.jsx — Khushboo
// Items fixed:
//   #2  — toggleJoin re-fetches from server after join/leave (confirms persistence)
//   #3  — auto-poll useEffect REMOVED; only manual ↻ Refresh button remains
//   #4  — Group Notes tab inside forum modal (notes tagged to a group)
//   #5  — createGroup payload now sends { groupName, subject, description }

import React, { useState, useEffect } from "react";
import {
  getGroups,
  createGroup as apiCreateGroup,
  joinGroup,
  leaveGroup,
  getGroupMembers,
  getGroupMessages,
  postGroupMessage,
  getNotesByGroup,
  createNote,
} from "../../services/api";
import "../../styles/khushboo.css";
import GroupCard from "../../components/khushboo/GroupCard";

function StudyGroupsPage() {
  // ── Create form fields ────────────────────────────────────────────────────
  const [groupName, setGroupName]     = useState("");
  const [courseCode, setCourseCode]   = useState("");
  const [description, setDescription] = useState("");

  // ── Runtime states ────────────────────────────────────────────────────────
  const [groups, setGroups]           = useState([]);
  const [isLoading, setIsLoading]     = useState(true);

  // ── Members modal ─────────────────────────────────────────────────────────
  const [activeGroupMembers, setActiveGroupMembers] = useState(null);
  const [selectedGroupName, setSelectedGroupName]   = useState("");

  // ── Forum modal ───────────────────────────────────────────────────────────
  const [activeForumGroup, setActiveForumGroup]       = useState(null); // full group obj
  const [forumMessages, setForumMessages]             = useState([]);
  const [newMsgText, setNewMsgText]                   = useState("");
  const [isForumLoading, setIsForumLoading]           = useState(false);

  // ── Group Notes tab (inside forum modal) ──────────────────────────────────
  const [forumTab, setForumTab]                       = useState("messages"); // "messages" | "notes"
  const [groupNotes, setGroupNotes]                   = useState([]);
  const [notesLoading, setNotesLoading]               = useState(false);
  // Upload a note tagged to this group
  const [noteTitle, setNoteTitle]     = useState("");
  const [noteSubject, setNoteSubject] = useState("");
  const [noteFile, setNoteFile]       = useState(null);
  const [noteUploading, setNoteUploading] = useState(false);

  // ── 1. Fetch all groups from DB on mount ──────────────────────────────────
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

  // ── 2. Create a new group (Item 5: sends groupName/subject/description) ───
  const createGroup = async (e) => {
    e.preventDefault();
    if (!groupName || !courseCode || !description) {
      alert("Please fill all fields to create a group");
      return;
    }

    // Field names now match the DB model exactly — no aliases needed
    const payload = {
      groupName: groupName,
      subject: courseCode,
      description: description,
    };

    try {
      await apiCreateGroup(payload);
      // Re-fetch from server so the new group's joined/member state is accurate
      await fetchGroups();
      setGroupName("");
      setCourseCode("");
      setDescription("");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  // ── 3. Join / Leave — re-fetch from DB after operation (Item 2) ──────────
  //   This confirms the change actually persisted in MongoDB, not just in
  //   local React state. If the API call throws, no state mutation happens.
  const toggleJoin = async (groupId, isCurrentlyJoined) => {
    try {
      if (isCurrentlyJoined) {
        await leaveGroup(groupId);
      } else {
        await joinGroup(groupId);
      }
      // Re-fetch authoritative data from server — this is what proves persistence
      await fetchGroups();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  // ── 4. View members ───────────────────────────────────────────────────────
  const handleViewMembers = async (group) => {
    try {
      const response = await getGroupMembers(group.id);
      setActiveGroupMembers(response.data);
      setSelectedGroupName(group.name);
    } catch (error) {
      alert("Could not pull live session members list.");
    }
  };

  // ── 5. Open forum modal ───────────────────────────────────────────────────
  const handleViewForum = async (group) => {
    try {
      setActiveForumGroup(group);
      setSelectedGroupName(group.name);
      setForumMessages([]);
      setForumTab("messages");
      setIsForumLoading(true);
      const response = await getGroupMessages(group.id);
      setForumMessages(response.data);
    } catch (error) {
      alert("Could not load forum messages.");
    } finally {
      setIsForumLoading(false);
    }
  };

  // ── 6. Manual refresh for messages (no auto-poll — Item 3) ───────────────
  const handleRefreshMessages = async () => {
    if (!activeForumGroup) return;
    try {
      const response = await getGroupMessages(activeForumGroup.id);
      setForumMessages(response.data);
    } catch (err) {
      console.error("Refresh failed:", err);
    }
  };

  // ── 7. Post a message ─────────────────────────────────────────────────────
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    try {
      const response = await postGroupMessage(activeForumGroup.id, newMsgText);
      setForumMessages([...forumMessages, response.data]);
      setNewMsgText("");
    } catch (error) {
      alert("Could not post message.");
    }
  };

  // ── 8. Load group notes (Item 4) ──────────────────────────────────────────
  const handleLoadGroupNotes = async (groupId) => {
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

  const handleTabSwitch = (tab) => {
    setForumTab(tab);
    if (tab === "notes" && activeForumGroup) {
      handleLoadGroupNotes(activeForumGroup.id);
    }
  };

  // ── 9. Upload a note tagged to this group (Item 4) ────────────────────────
  const handleUploadGroupNote = async (e) => {
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
      setNoteTitle("");
      setNoteSubject("");
      setNoteFile(null);
      document.getElementById("group-note-file").value = "";
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setNoteUploading(false);
    }
  };

  return (
    <div className="study-groups-container">
      {/* Header Grid Section */}
      <div className="header-section">
        <span className="header-tagline">👥 COLLABORATIVE LEARNING</span>
        <h1 className="header-title">Study Groups</h1>
        <p className="header-desc">
          Create or join specialized student circles to sync your learning objectives and track modules together.
        </p>
      </div>

      <div className="main-layout-grid">
        {/* Input Interactive Panel */}
        <div className="form-card">
          <h3 className="form-title">➕ Create Study Group</h3>
          <form onSubmit={createGroup} className="group-form">
            <div>
              <label className="form-label">GROUP NAME</label>
              <input
                type="text"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="e.g. Java Hackers"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">COURSE CODE</label>
              <input
                type="text"
                value={courseCode}
                onChange={e => setCourseCode(e.target.value)}
                placeholder="e.g. BCA-301"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">DESCRIPTION</label>
              <textarea
                rows="3"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What is this circle focusing on?"
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Launch Group</button>
          </form>
        </div>

        {/* Dynamic Display Stack Engine */}
        <div>
          <h3 className="list-title">
            Active Circles {isLoading ? "" : `(${groups.length})`}
          </h3>

          {isLoading ? (
            <div className="loading-state">Syncing with server database...</div>
          ) : groups.length === 0 ? (
            <div className="empty-state">No active circles found. Create one to get started!</div>
          ) : (
            <div className="circles-stack">
              {groups.map(group => (
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
        </div>
      </div>

      {/* Members Modal Overlay */}
      {activeGroupMembers && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <span className="modal-tagline">ROSTER</span>
                <h3 className="modal-title">{selectedGroupName}</h3>
              </div>
              <button onClick={() => setActiveGroupMembers(null)} className="close-x-btn">✕</button>
            </div>

            <ul className="members-list">
              {activeGroupMembers.map((member, index) => (
                <li
                  key={index}
                  className={`member-item ${member.isCurrentUser ? "current-user" : "other-user"}`}
                >
                  {index + 1}. {member.name || member}
                </li>
              ))}
            </ul>

            <button onClick={() => setActiveGroupMembers(null)} className="close-modal-btn">
              Close Roster
            </button>
          </div>
        </div>
      )}

      {/* Forum Modal Overlay */}
      {activeForumGroup && (
        <div className="modal-overlay">
          <div className="modal-box forum-modal">
            <div className="modal-header">
              <div>
                <span className="modal-tagline">💬 DISCUSSION FORUM</span>
                <h3 className="modal-title">{selectedGroupName}</h3>
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {/* Manual refresh — no auto-poll (Item 3) */}
                {forumTab === "messages" && (
                  <button
                    onClick={handleRefreshMessages}
                    className="view-members-btn"
                    style={{ textDecoration: "none", fontSize: "0.85rem", cursor: "pointer" }}
                  >
                    ↻ Refresh
                  </button>
                )}
                <button onClick={() => setActiveForumGroup(null)} className="close-x-btn">✕</button>
              </div>
            </div>

            {/* Tab switcher (Item 4) */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <button
                onClick={() => handleTabSwitch("messages")}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  backgroundColor: forumTab === "messages" ? "var(--teal)" : "rgba(255,255,255,0.08)",
                  color: forumTab === "messages" ? "#fff" : "var(--text-secondary)",
                  transition: "all 0.2s"
                }}
              >
                💬 Messages
              </button>
              <button
                onClick={() => handleTabSwitch("notes")}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  backgroundColor: forumTab === "notes" ? "var(--teal)" : "rgba(255,255,255,0.08)",
                  color: forumTab === "notes" ? "#fff" : "var(--text-secondary)",
                  transition: "all 0.2s"
                }}
              >
                📚 Group Notes
              </button>
            </div>

            {/* ── MESSAGES TAB ── */}
            {forumTab === "messages" && (
              <>
                <div className="forum-messages-container">
                  {isForumLoading ? (
                    <div className="loading-state">Syncing discussions...</div>
                  ) : forumMessages.length === 0 ? (
                    <div className="empty-state">No messages posted yet. Start the conversation!</div>
                  ) : (
                    <div className="forum-messages-list">
                      {forumMessages.map(msg => (
                        <div key={msg.id} className="forum-message-bubble">
                          <div className="forum-message-meta">
                            <span className="forum-message-user">👤 {msg.userName}</span>
                            <span className="forum-message-time">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="forum-message-text">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="forum-input-form">
                  <input
                    type="text"
                    value={newMsgText}
                    onChange={e => setNewMsgText(e.target.value)}
                    placeholder="Share a message with the group..."
                    className="form-input forum-input-field"
                  />
                  <button type="submit" className="submit-btn forum-send-btn">Post</button>
                </form>
              </>
            )}

            {/* ── GROUP NOTES TAB (Item 4) ── */}
            {forumTab === "notes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Upload a note tagged to this group */}
                <form onSubmit={handleUploadGroupNote} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={e => setNoteTitle(e.target.value)}
                    placeholder="Note title"
                    className="form-input"
                    style={{ fontSize: "0.85rem" }}
                  />
                  <input
                    type="text"
                    value={noteSubject}
                    onChange={e => setNoteSubject(e.target.value)}
                    placeholder="Subject / Course code"
                    className="form-input"
                    style={{ fontSize: "0.85rem" }}
                  />
                  <input
                    type="file"
                    id="group-note-file"
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                    onChange={e => setNoteFile(e.target.files[0])}
                    className="form-input"
                    style={{ fontSize: "0.85rem", padding: "0.4rem" }}
                  />
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={noteUploading}
                    style={{ padding: "0.5rem", fontSize: "0.85rem" }}
                  >
                    {noteUploading ? "Uploading…" : "⬆️ Upload Note to Group"}
                  </button>
                </form>

                <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />

                {/* List of notes tagged to this group */}
                {notesLoading ? (
                  <div className="loading-state">Loading group notes...</div>
                ) : groupNotes.length === 0 ? (
                  <div className="empty-state">No notes shared in this group yet.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {groupNotes.map(note => (
                      <div
                        key={note._id}
                        style={{
                          padding: "0.75rem 1rem",
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderRadius: "6px",
                          border: "1px solid rgba(255,255,255,0.08)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <strong style={{ fontSize: "0.9rem" }}>{note.title}</strong>
                            <span style={{
                              marginLeft: "0.5rem",
                              fontSize: "0.75rem",
                              color: "var(--teal)",
                              fontFamily: "JetBrains Mono, monospace"
                            }}>
                              {note.subject}
                            </span>
                            {note.uploadedBy?.name && (
                              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                                by {note.uploadedBy.name}
                              </div>
                            )}
                          </div>
                          {note.file && (
                            <a
                              href={`http://localhost:5000${note.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--teal)",
                                textDecoration: "none",
                                fontWeight: "600",
                                whiteSpace: "nowrap"
                              }}
                            >
                              📥 Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyGroupsPage;