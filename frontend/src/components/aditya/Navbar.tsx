// Navbar.tsx — Aditya
// React Bootstrap: Navbar, Nav, NavDropdown, Container, Button
// Concepts: useState (dropdown), conditional rendering (user logged in/out)

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as BSNavbar,
  Nav,
  NavDropdown,
  Container,
  Button,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

function Navbar({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <BSNavbar
      expand="lg"
      sticky="top"
      className="navbar px-3"
      style={{
        background: "var(--card-bg)",
        borderBottom: "1px solid rgba(35,40,31,0.12)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Container fluid>
        {/* Brand / Logo */}
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src="/Logo.jpeg"
            alt="StudyConnect Logo"
            style={{ height: "36px", borderRadius: "6px" }}
          />
          <div className="d-flex flex-column lh-1">
            <span className="logo">StudyConnect</span>
            <span className="logo-tag" style={{ fontSize: "0.68rem" }}>
              Est. 2026 · Peer Study Matching
            </span>
          </div>
        </BSNavbar.Brand>

        {/* Mobile Toggle */}
        <BSNavbar.Toggle aria-controls="main-navbar" />

        <BSNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-2">

            {/* Show landing links only when logged out */}
            {!user && (
              <>
                <Nav.Link href="#how" className="nav-link">How it works</Nav.Link>
                <Nav.Link href="#features" className="nav-link">Features</Nav.Link>
              </>
            )}

            {/* Dark mode toggle */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              style={{
                borderRadius: "999px",
                fontFamily: "inherit",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: "var(--ink)",
                borderColor: "var(--ink)",
              }}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Button>

            {/* Logged-in links + user dropdown */}
            {user ? (
              <>
                <Nav.Link as={Link} to="/match" className="nav-link">Find Peers</Nav.Link>
                <Nav.Link as={Link} to="/notes" className="nav-link">Notes</Nav.Link>
                <Nav.Link as={Link} to="/groups" className="nav-link">Groups</Nav.Link>

                {/* NavDropdown for profile actions */}
                <NavDropdown
                  title={
                    <span className="d-inline-flex align-items-center gap-2">
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--forest)",
                          color: "var(--cream)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {user.name ? user.name[0] : "U"}
                      </span>
                      <span className="nav-link" style={{ margin: 0, fontWeight: 600 }}>
                        {user.name?.split(" ")[0]}
                      </span>
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                  style={{ color: "var(--ink)" }}
                >
                  <NavDropdown.Item as={Link} to="/profile/edit">
                    👤 Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sessions">
                    📅 Study Sessions
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/progress">
                    📈 Track Progress
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleLogout}
                    style={{ color: "var(--coral)", fontWeight: 600 }}
                  >
                    🚪 Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-button">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
