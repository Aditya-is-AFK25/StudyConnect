// GroupCard.jsx — Khushboo
// Displays a single study group

import React from "react";

function GroupCard({ group, onViewMembers, onViewForum, onToggleJoin }) {
  return (
    <div className="circle-card">
      <div className="circle-info-side">
        <div className="circle-meta">
          <span className="course-badge">{group.course}</span>
          <button onClick={() => onViewMembers(group)} className="view-members-btn">
            👤 {group.members} Members (View)
          </button>
          {group.joined && (
            <button onClick={() => onViewForum(group)} className="view-forum-btn">
              💬 Forum
            </button>
          )}
        </div>
        <h4 className="circle-name">{group.name}</h4>
        <p className="circle-desc">{group.desc}</p>
      </div>

      <div className="circle-actions-side">
        <button
          onClick={() => onToggleJoin(group.id, group.joined)}
          className={`join-btn ${group.joined ? "joined" : "not-joined"}`}
        >
          {group.joined ? "✓ LEAVE GROUP" : "🤝 JOIN GROUP"}
        </button>
      </div>
    </div>
  );
}

export default GroupCard;
