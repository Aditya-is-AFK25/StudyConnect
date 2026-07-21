// RegisterPage.tsx — Aditya
// React Bootstrap: Form, Alert, Button, Card, Spinner, Row, Col
// Concepts:
//   - Controlled components (useState for each field)
//   - useRef (anti-double-submit — taught in class)
//   - Form validation

import React, { useRef, useState } from "react";
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
import { registerUser } from "../../services/api";

function RegisterPage() {
  // Controlled component state
  const [name, setName]                     = useState("");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio]                       = useState("");
  const [errors, setErrors]                 = useState<any>({});
  const [errorMessage, setErrorMessage]     = useState("");
  const [loading, setLoading]               = useState(false);

  // useRef — prevents double submit (taught in class)
  const isSubmitting = useRef(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const tempErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      tempErrors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters long.";
    }
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
    if (!confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isSubmitting.current) return; // useRef guard
    isSubmitting.current = true;
    setLoading(true);
    setErrorMessage("");
    try {
      await registerUser({ name: name.trim(), email: email.trim(), password, bio: bio.trim() });
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      isSubmitting.current = false;
      setLoading(false);
      if (!error.response) {
        setErrorMessage("Unable to connect to the backend server. Please verify the backend is running on port 5001.");
      } else {
        setErrorMessage(error.response.data?.message || "Failed to register. The email address might already be registered.");
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
          maxWidth: 520,
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
            <span className="profile-badge">🎓 JOIN US</span>
            <h2 className="mt-2" style={{ fontSize: "2rem" }}>Create Account</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Build your profile, share resources, and study together.
            </p>
          </div>

          {errorMessage && (
            <Alert variant="danger" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem" }}>
              ⚠️ {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleRegister}>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label className="field-label">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Harmeet Singh"
                value={name}
                isInvalid={!!errors.name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p: any) => ({ ...p, name: null }));
                }}
                className="field-input"
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="field-label">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@university.edu"
                value={email}
                isInvalid={!!errors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p: any) => ({ ...p, email: null }));
                }}
                className="field-input"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            {/* Bio */}
            <Form.Group className="mb-3">
              <Form.Label className="field-label">About You (Short Bio)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Tell others about your study focus, major, or hobbies..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="field-input"
              />
            </Form.Group>

            {/* Password row — Bootstrap Row/Col grid */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="field-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Choose password"
                    value={password}
                    isInvalid={!!errors.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((p: any) => ({ ...p, password: null }));
                    }}
                    className="field-input"
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="field-label">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    isInvalid={!!errors.confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((p: any) => ({ ...p, confirmPassword: null }));
                    }}
                    className="field-input"
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="btn-primary w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading && <Spinner size="sm" animation="border" />}
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Already have an account? </span>
              <Link to="/login" style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "none" }}>
                Sign In
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
