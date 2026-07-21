// LoginPage.tsx — Aditya
// React Bootstrap: Form, Form.Group, Form.Control, Alert, Button, Card, Container
// Concepts:
//   - Controlled components (useState for each field — like ControlledComp.tsx)
//   - Form validation (like validateForm pattern)
//   - useContext via useAuth

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  // Controlled component state — one useState per field (ControlledComp pattern)
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading]   = useState(false);

  const navigate   = useNavigate();
  const { login }  = useAuth();

  // Client-side validation
  const validateForm = () => {
    const tempErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user || response.data));
      login(response.data.user || response.data);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      if (!error.response) {
        setErrorMessage("Unable to connect to the backend server. Please verify the backend is running on port 5001.");
      } else {
        setErrorMessage(error.response.data?.message || "Failed to sign in. Please verify your credentials.");
      }
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh", padding: "2rem 1rem" }}
    >
      <Card
        style={{
          maxWidth: 450,
          width: "100%",
          background: "var(--card-bg)",
          border: "2px solid var(--ink)",
          borderRadius: 8,
          boxShadow: "6px 6px 0 var(--ink)",
          color: "var(--ink)",
        }}
      >
        <Card.Body className="p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <span className="profile-badge">🔑 SIGN IN</span>
            <h2 className="mt-2" style={{ fontSize: "2rem" }}>Welcome Back</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Connect with your peers and access your notes repo.
            </p>
          </div>

          {/* Global error alert — Bootstrap Alert component */}
          {errorMessage && (
            <Alert variant="danger" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem" }}>
              ⚠️ {errorMessage}
            </Alert>
          )}

          {/* Form — controlled inputs */}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="field-label">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@university.edu"
                value={email}
                isInvalid={!!errors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev: any) => ({ ...prev, email: null }));
                }}
                className="field-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="field-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                isInvalid={!!errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev: any) => ({ ...prev, password: null }));
                }}
                className="field-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              className="btn-primary w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading && <Spinner size="sm" animation="border" />}
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Don't have an account? </span>
              <Link to="/register" style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "none" }}>
                Sign Up
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
