// ProgressTrackerPage.tsx — Khushboo
// React Bootstrap: Container, Card, ProgressBar, ListGroup, Spinner, Badge
// Concepts: useState, useEffect (fetch on mount)

import React, { useState, useEffect } from "react";
import {
  Container, Card, ProgressBar as BSProgressBar, ListGroup, Spinner, Badge, Row, Col,
} from "react-bootstrap";
import { getProgress, updateProgress } from "../../services/api";

function ProgressTrackerPage() {
  const [tasks, setTasks]     = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect — fetch progress tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getProgress();
        setTasks(response.data);
      } catch (error) {
        console.error("Database connection failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      const response = await updateProgress(id, { done: !task.done });
      const updatedTask = response.data.progress || response.data;
      setTasks(tasks.map((t) => t.id === id ? { ...t, done: updatedTask.done } : t));
    } catch (error) {
      console.error("Failed to update task progress:", error);
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const percentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <Container style={{ maxWidth: 900, padding: "2.5rem 1rem" }}>

      {/* Header */}
      <div className="progress-page__header mb-4">
        <span className="progress-page__eyebrow">📈 PERFORMANCE REPORTING</span>
        <h1 className="progress-page__title">Progress Tracker</h1>
        <p className="progress-page__subtitle">
          Monitor syllabus alignment, milestones, and daily checklist items.
        </p>
      </div>

      {/* Dashboard Card — Bootstrap ProgressBar */}
      <Card
        className="mb-4"
        style={{
          background: "var(--card-bg)", border: "2px solid var(--ink)",
          borderRadius: 8, boxShadow: "4px 4px 0 var(--ink)", color: "var(--ink)",
        }}
      >
        <Card.Body className="p-4">
          <Row className="align-items-center mb-3">
            <Col>
              <h3 className="progress-card__heading mb-0">Syllabus Completion Rate</h3>
            </Col>
            <Col xs="auto">
              <span
                className="progress-card__percentage"
                style={{ fontSize: "2rem", fontFamily: "Fraunces, serif", fontWeight: 700 }}
              >
                {percentage}%
              </span>
            </Col>
          </Row>

          {/* React Bootstrap ProgressBar (replaces custom ProgressBar component) */}
          <BSProgressBar
            now={percentage}
            animated={percentage > 0 && percentage < 100}
            variant={percentage === 100 ? "success" : percentage > 60 ? "info" : "warning"}
            style={{ height: "10px", borderRadius: 5 }}
            className="mb-3"
          />

          <p className="progress-card__summary">
            {completedCount} OF {tasks.length} SYLLABUS GATEWAYS COMPLETED
          </p>
        </Card.Body>
      </Card>

      {/* Checklist */}
      <h3 className="checklist-section-title">📋 Task Status Control Check</h3>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" style={{ color: "var(--forest)" }} />
          <p className="mt-2" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            Loading academic directories...
          </p>
        </div>
      ) : tasks.length === 0 ? (
        <Card
          className="empty-checklist-card text-center"
          style={{ background: "var(--card-bg)", border: "1px solid rgba(35,40,31,0.12)", color: "var(--ink)" }}
        >
          <Card.Body className="p-4">
            <h4>No Active Syllabus Trackers</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Your assigned academic modules and progress metrics will appear here once synchronized with the database.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup variant="flush" className="checklist-stack">
          {tasks.map((task) => (
            <ListGroup.Item
              key={task.id}
              action
              onClick={() => toggleTask(task.id)}
              className={`checklist-item ${task.done ? "checklist-item--done" : ""} d-flex align-items-center gap-3`}
              style={{
                background: task.done ? "rgba(61, 90, 64, 0.06)" : "var(--card-bg)",
                color: "var(--ink)",
                borderColor: "rgba(35,40,31,0.1)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {/* Custom checkbox */}
              <div className={`custom-checkbox ${task.done ? "custom-checkbox--checked" : ""}`}>
                {task.done && "✓"}
              </div>
              <div className="checklist-item__body flex-grow-1">
                <Badge
                  bg="light"
                  text="dark"
                  className="me-2 checklist-item__category-tag"
                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--ink)" }}
                >
                  {task.category?.toUpperCase()}
                </Badge>
                <span className={`checklist-item__text ${task.done ? "checklist-item__text--crossed" : ""}`}>
                  {task.text}
                </span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default ProgressTrackerPage;