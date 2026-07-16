import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth to access the user context

function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Brand logo link */}
      <Link 
        to="/" 
        className="logo-block" 
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: '0.75rem',
          textDecoration: 'none' 
        }}
      >
        <img src="/Logo.jpeg" alt="StudyConnect Logo" style={{ height: '36px', borderRadius: '6px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
          <span className="logo">StudyConnect</span>
          <span className="logo-tag">Est. 2026 · Peer Study Matching</span>
        </div>
      </Link>
      
      <div className="nav-actions">
        {/* Hide landing page details when logged in */}
        {!user && (
          <>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#features" className="nav-link">Features</a>
          </>
        )}
        
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="nav-button"
          style={{ 
            background: 'transparent',
            color: 'var(--ink)',
            border: '1px solid var(--ink)',
            padding: '0.4rem 1rem',
            cursor: 'pointer',
            borderRadius: '999px',
            fontFamily: 'inherit',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <Link to="/match" className="nav-link">Find Peers</Link>
            <Link to="/notes" className="nav-link">Notes</Link>
            <Link to="/groups" className="nav-link">Groups</Link>
            
            {/* User Profile Dropdown Container */}
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  fontFamily: "inherit",
                  padding: 0
                }}
              >
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  backgroundColor: "var(--forest)",
                  color: "var(--cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  textTransform: "uppercase"
                }}>
                  {user.name ? user.name[0] : "U"}
                </div>
                <span className="nav-link" style={{ margin: 0, fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  {user.name?.split(" ")[0]} <span style={{ fontSize: "0.7rem" }}>▼</span>
                </span>
              </button>

              {/* Floating Dropdown Card */}
              {dropdownOpen && (
                <>
                  <div 
                    onClick={() => setDropdownOpen(false)} 
                    style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "125%",
                    right: 0,
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid rgba(35,40,31,0.15)",
                    borderRadius: "8px",
                    padding: "0.5rem 0",
                    minWidth: "170px",
                    boxShadow: "0 10px 25px rgba(35,40,31,0.08)",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    <Link 
                      to="/profile/edit" 
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        padding: "0.6rem 1.25rem",
                        color: "var(--ink)",
                        textDecoration: "none",
                        fontSize: "0.88rem",
                        textAlign: "left",
                        transition: "background 0.2s"
                      }}
                      className="dropdown-item-hover"
                    >
                      👤 Edit Profile
                    </Link>
                    <Link 
                      to="/sessions" 
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        padding: "0.6rem 1.25rem",
                        color: "var(--ink)",
                        textDecoration: "none",
                        fontSize: "0.88rem",
                        textAlign: "left",
                        transition: "background 0.2s"
                      }}
                      className="dropdown-item-hover"
                    >
                      📅 Study Sessions
                    </Link>
                    <Link 
                      to="/progress" 
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        padding: "0.6rem 1.25rem",
                        color: "var(--ink)",
                        textDecoration: "none",
                        fontSize: "0.88rem",
                        textAlign: "left",
                        transition: "background 0.2s"
                      }}
                      className="dropdown-item-hover"
                    >
                      📈 Track Progress
                    </Link>
                    
                    <div style={{ borderTop: "1px solid rgba(35,40,31,0.1)", margin: "0.4rem 0" }} />
                    
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
                      style={{
                        padding: "0.6rem 1.25rem",
                        color: "var(--coral)",
                        background: "none",
                        border: "none",
                        fontSize: "0.88rem",
                        textAlign: "left",
                        cursor: "pointer",
                        fontWeight: "600",
                        width: "100%"
                      }}
                      className="dropdown-item-hover"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
