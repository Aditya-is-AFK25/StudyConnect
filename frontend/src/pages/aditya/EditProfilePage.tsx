// EditProfilePage.tsx — Aditya
// React Bootstrap: Container, Card, Form, Alert, Button, Badge, Row, Col, Spinner
// Concepts:
//   - useState (controlled inputs for all fields)
//   - useEffect (fetch profile data on mount)

import React, { useState, useEffect } from "react";
import {
  Container, Card, Form, Button, Alert, Badge, Row, Col, Spinner,
} from "react-bootstrap";
import { getProfile, updateProfile } from "../../services/api";

function EditProfilePage() {
  const [name, setName]                         = useState("");
  const [bio, setBio]                           = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [environment, setEnvironment]           = useState("Library");
  const [errorMessage, setErrorMessage]         = useState("");
  const [successMessage, setSuccessMessage]     = useState("");
  const [loading, setLoading]                   = useState(true);
  const [saving, setSaving]                     = useState(false);

  // useEffect — fetch profile on mount (taught in UseEffectExample1)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();
        const data = response.data;
        setName(data.name || "");
        setBio(data.bio || "");
        setSelectedSubjects(data.subjects || []);
        setSelectedAvailability(data.availability || []);
        setEnvironment(data.environment || "Library");
      } catch {
        setErrorMessage("Failed to load your profile details. Please verify your login session.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const availableSubjects = [
    "Database Management", "Python", "Network Security", "Web Development",
    "Data Structures and Algorithms", "Software Engineering",
    "Principles of Management", "Financial Accounting", "Marketing Management",
    "Organizational Behavior", "Microeconomics", "Macroeconomics",
    "Econometrics", "Statistics", "English", "Business Communication",
  ];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeslots = ["Morning", "Afternoon", "Evening"];

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleAvailabilityToggle = (slot: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!name.trim()) { setErrorMessage("Student name is mandatory."); return; }
    if (selectedSubjects.length === 0) { setErrorMessage("Please select at least one subject to study."); return; }
    if (selectedAvailability.length === 0) { setErrorMessage("Please select at least one availability slot."); return; }
    try {
      setSaving(true);
      await updateProfile({ name, bio, subjects: selectedSubjects, availability: selectedAvailability, environment });
      setSuccessMessage("Your peer profile details have been saved successfully!");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Failed to save profile changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: "var(--forest)" }} />
          <p className="mt-3" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--text-secondary)" }}>
            Loading your peer profile details...
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: 800, padding: "3rem 1rem" }}>
      <Card
        style={{
          background: "var(--card-bg)",
          border: "2px solid var(--ink)",
          borderRadius: 8,
          boxShadow: "8px 8px 0 var(--ink)",
          color: "var(--ink)",
        }}
      >
        <Card.Body className="p-4">
          <h1 className="profile-title">Setup Peer Profile</h1>

          {errorMessage && <Alert variant="danger" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem" }}>⚠️ {errorMessage}</Alert>}
          {successMessage && <Alert variant="success" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem" }}>✓ {successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label">Full Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="text-input"
                style={{ background: "var(--card-bg)", color: "var(--ink)", border: "1.5px solid var(--ink)" }}
              />
            </Form.Group>

            {/* Bio */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label">About Me (Bio)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell classmates a bit about yourself..."
                style={{ background: "var(--card-bg)", color: "var(--ink)", border: "1.5px solid var(--ink)" }}
              />
            </Form.Group>

            {/* Subjects — Bootstrap Badge as clickable chips */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label">Active Subjects</Form.Label>
              <div className="d-flex flex-wrap gap-2 mt-1">
                {availableSubjects.map((subject) => {
                  const active = selectedSubjects.includes(subject);
                  return (
                    <Badge
                      key={subject}
                      onClick={() => handleSubjectToggle(subject)}
                      style={{
                        cursor: "pointer",
                        padding: "0.45rem 0.85rem",
                        fontSize: "0.78rem",
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 500,
                        background: active ? "var(--gold, #c9a84c)" : "transparent",
                        color: active ? "var(--card-bg)" : "var(--ink)",
                        border: "1px solid " + (active ? "var(--gold)" : "rgba(35,40,31,0.4)"),
                        transition: "all 0.2s",
                        userSelect: "none",
                      }}
                      bg="light"
                    >
                      {subject}
                    </Badge>
                  );
                })}
              </div>
              <small style={{ color: "var(--text-secondary)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem" }} className="mt-2 d-block">
                Is your subject missing? Email us at{" "}
                <a href="mailto:Support.studyconnect@gmail.com" style={{ color: "var(--coral)" }}>Support.studyconnect@gmail.com</a>
              </small>
            </Form.Group>

            {/* Availability Table */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label">Availability Schedule</Form.Label>
              <div className="table-responsive">
                <table className="schedule-grid w-100">
                  <thead>
                    <tr>
                      <th>Time</th>
                      {weekdays.map((d) => <th key={d}>{d.substring(0, 3)}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {timeslots.map((time) => (
                      <tr key={time}>
                        <td style={{ fontWeight: 600, fontSize: "0.8rem" }}>{time}</td>
                        {weekdays.map((day) => {
                          const slotId = `${day}-${time}`;
                          return (
                            <td key={day} className="text-center">
                              <Form.Check
                                type="checkbox"
                                checked={selectedAvailability.includes(slotId)}
                                onChange={() => handleAvailabilityToggle(slotId)}
                                aria-label={`${day} ${time}`}
                                className="schedule-checkbox"
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Form.Group>

            {/* Environment — Bootstrap Row/Col */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label">Preferred Study Environment</Form.Label>
              <Row className="g-2">
                {["Library", "Virtual", "Quiet Cafes"].map((env) => {
                  const active = environment === env;
                  const icons: Record<string, string> = { Library: "🏫", Virtual: "💻", "Quiet Cafes": "☕" };
                  return (
                    <Col key={env} md={4}>
                      <div
                        className={`env-radio text-center ${active ? "active" : ""}`}
                        onClick={() => setEnvironment(env)}
                        style={{ cursor: "pointer" }}
                      >
                        {icons[env]} {env}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Form.Group>

            <div className="text-end mt-3">
              <Button
                type="submit"
                disabled={saving}
                className="save-btn d-inline-flex align-items-center gap-2"
              >
                {saving && <Spinner size="sm" animation="border" />}
                Save Profile Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditProfilePage;
