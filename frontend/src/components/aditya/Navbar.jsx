import React from "react";
import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <div className="logo-block" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
        <img src="/Logo.jpeg" alt="StudyConnect Logo" style={{ height: '36px', borderRadius: '6px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
          <span className="logo">StudyConnect</span>
          <span className="logo-tag">Est. 2026 · Peer Study Matching</span>
        </div>
      </div>
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
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-button">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
