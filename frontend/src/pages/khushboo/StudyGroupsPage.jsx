// StudyGroupsPage.jsx — Khushboo
// Task: Study Groups — Pure Production Setup (No Mock Data)

import React, { useState, useEffect } from "react";
import "../../styles/khushboo.css";

const API_URL = "http://localhost:5000/api";

function StudyGroupsPage() {
  // Input fields for form submission
  const [groupName, setGroupName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");

  // Production runtime states 
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGroupMembers, setActiveGroupMembers] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState("");

  // 1. GET: Fetch groups from server database on mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        // Replace with your real API endpoint string e.g., "/api/groups"
        const response = await fetch(`${API_URL}/groups`);
        if (!response.ok) throw new Error("Server error fetching groups");
        
        const data = await response.json();
        setGroups(data); // Expecting an array of group objects
      } catch (error) {
        console.error("Database connection failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // 2. POST: Create a brand new active learning circle
  const createGroup = async (e) => {
    e.preventDefault();
    if (!groupName || !courseCode || !description) {
      alert("Please fill all fields to create a group");
      return;
    }

    const payload = {
      name: groupName,
      course: courseCode,
      desc: description
    };

    try {
      const response = await fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error("Failed to store new circle");
      
      const newGroupCreated = await response.json();
      
      // Prepend the saved backend record right into local state array
      setGroups([newGroupCreated, ...groups]);
      
      // Reset form controls
      setGroupName("");
      setCourseCode("");
      setDescription("");
    } catch (error) {
      alert(error.message);
    }
  };

  // 3. POST/PATCH: Sync join or leave operations safely on server
  const toggleJoin = async (groupId, isCurrentlyJoined) => {
    // Determine target execution route contextually based on active state flag
    const actionEndpoint = isCurrentlyJoined ? "leave" : "join";

    try {
      const response = await fetch(`${API_URL}/groups/${groupId}/${actionEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Server rejected state sync action");

      // UI re-sync update logic based on backend authorization success
      setGroups(groups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            joined: !group.joined,
            members: group.joined ? group.members - 1 : group.members + 1
          };
        }
        return group;
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  // 4. GET: Query specific user array mapping for targeted display
  const handleViewMembers = async (group) => {
    try {
      const response = await fetch(`${API_URL}/groups/${group.id}/members`);
      if (!response.ok) throw new Error("Roster fetch breakdown");

      const membersList = await response.json(); // Expecting array string parsing: ["User A", "User B"]
      
      setActiveGroupMembers(membersList);
      setSelectedGroupName(group.name);
    } catch (error) {
      alert("Could not pull live session members list.");
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
                <div key={group.id} className="circle-card">
                  <div className="circle-info-side">
                    <div className="circle-meta">
                      <span className="course-badge">{group.course}</span>
                      <button onClick={() => handleViewMembers(group)} className="view-members-btn">
                        👤 {group.members} Members (View)
                      </button>
                    </div>
                    <h4 className="circle-name">{group.name}</h4>
                    <p className="circle-desc">{group.desc}</p>
                  </div>

                  <div className="circle-actions-side">
                    <button 
                      onClick={() => toggleJoin(group.id, group.joined)}
                      className={`join-btn ${group.joined ? "joined" : "not-joined"}`}
                    >
                      {group.joined ? "✓ LEAVE GROUP" : "🤝 JOIN GROUP"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Target Audience Overlay Roster */}
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
    </div>
  );
}

export default StudyGroupsPage;