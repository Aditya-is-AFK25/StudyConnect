import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth to access the user context

function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth(); // Retrieve current user object and logout function

  return (
    <nav className="navbar">
      {/* Done by Aditya: Wrapped the brand logo in a Link to enable returning to Home */}
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
        <a href="#how" className="nav-link">How it works</a>
        <a href="#features" className="nav-link">Features</a>
        
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

        {/* 
          CONDITIONAL NAVIGATION (Basic Ternary expression):
          If the user is logged in, show Profile, Peers, and Logout.
          Otherwise, show Login and Register links.
        */}
        {user ? (
          <>
            <Link to="/profile/edit" className="nav-link">Profile</Link>
            <Link to="/match" className="nav-link">Peers</Link>
            <button 
              onClick={logout} 
              className="nav-button" 
              style={{ background: "var(--coral)", marginLeft: "0.5rem" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
