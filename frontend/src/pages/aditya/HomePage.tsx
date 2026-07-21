// HomePage.tsx — Aditya
// React Bootstrap: Container, Row, Col, Card, Badge, Button
// Concepts: Functional component, JSX, conditional rendering, map()

import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import "../../styles/aditya.css";

function HomePage() {
  const features = [
    {
      icon: "📝",
      title: "Shared Course Resources",
      desc: "Organize lecture notes, study guides, and practice materials by course code and topic.",
      className: "feature-notes",
    },
    {
      icon: "👥",
      title: "Study Groups & Circles",
      desc: "Easily scale up from one-on-one partnerships to group study sessions for midterms and finals.",
      className: "feature-groups",
    },
    {
      icon: "📅",
      title: "Structured Study Sessions",
      desc: "Schedule specific times, topics, and virtual or campus study locations without back-and-forth messaging.",
      className: "feature-sessions",
    },
    {
      icon: "📊",
      title: "Interactive Goal Tracking",
      desc: "Set study milestones for each subject and track task completion rates as a group.",
      className: "feature-progress",
    },
  ];

  const steps = [
    { num: "01", title: "Create your profile", desc: "Add your specific course codes, schedule availability, and preferred study environments." },
    { num: "02", title: "Discover matches", desc: "View classmates taking the same courses, ranked by schedule alignment and shared subjects." },
    { num: "03", title: "Start collaborating", desc: "Message your matches, share files, coordinate sessions, and work together on course concepts." },
  ];

  const subjects = [
    "Database Management", "Python", "Web Development", "English",
    "Econometrics", "Data Structures and Algorithms", "AI & Machine Learning", "Statistics",
  ];

  return (
    <div className="home-page">

      {/* ── HERO SECTION ── */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">COLLABORATIVE STUDY NETWORK</div>
          <h1 className="hero-title">
            Find <span className="accent">classmates</span> who share your{" "}
            <span className="underline">courses</span>.
          </h1>
          <p className="hero-subtitle">
            Select your course sections, find compatible classmates, share resources, and keep each other accountable throughout the semester.
          </p>
          <div className="hero-actions">
            <a href="#register" className="hero-cta">
              Find Classmates <span className="arrow">→</span>
            </a>
            <span className="hero-meta">Quick setup · Free for students</span>
          </div>
        </div>

        {/* Sample Student Cards */}
        <div className="cards-visual" aria-hidden="true">
          <div className="index-card card-one">
            <div className="card-header">
              <span className="card-name">Sargun</span>
              <span className="card-id">#A-014</span>
            </div>
            <div className="card-label">Subjects</div>
            <div className="subject-tags">
              <span className="tag match">Econometrics</span>
              <span className="tag">Organizational Behavior</span>
              <span className="tag match">Marketing</span>
            </div>
          </div>
          <div className="spark">✶</div>
          <div className="index-card card-two">
            <div className="card-header">
              <span className="card-name">Harsh</span>
              <span className="card-id">#B-072</span>
            </div>
            <div className="card-label">Subjects</div>
            <div className="subject-tags">
              <span className="tag match">Python</span>
              <span className="tag">Web Development</span>
              <span className="tag match">Database Management</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── SCROLLING TICKER ── */}
      <section className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <div className="ticker-item" key={i}>
              {subjects.map((s) => <span key={s}>{s}</span>)}
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS — Bootstrap Row/Col ── */}
      <section className="how-it-works" id="how">
        <div className="section-label">§ 01 — The system</div>
        <h2 className="section-title">
          Simple peer-to-peer connection in <em>three</em> steps.
        </h2>
        <Container fluid>
          <Row className="g-4">
            {steps.map((step) => (
              <Col key={step.num} md={4}>
                <Card
                  className="step h-100"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid rgba(35,40,31,0.12)",
                    borderRadius: 8,
                  }}
                >
                  <Card.Body>
                    <span className="step-number">{step.num}</span>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── FEATURES — Bootstrap Row/Col Bento Grid ── */}
      <section className="features" id="features">
        <div className="section-label">§ 02 — Platform capabilities</div>
        <h2 className="section-title">
          Tools designed for <em>academic</em> success.
        </h2>
        <Container fluid>
          <Row className="g-4">
            {features.map((f) => (
              <Col key={f.title} md={6}>
                <Card
                  className={`feature-card ${f.className} h-100`}
                  style={{
                    border: "1px solid rgba(35,40,31,0.1)",
                    borderRadius: 10,
                  }}
                >
                  <Card.Body className="d-flex align-items-start gap-3">
                    <div className="feature-icon">{f.icon}</div>
                    <div>
                      <h3 className="feature-title">{f.title}</h3>
                      <p className="feature-description">{f.desc}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="pull-quote">
        <p className="pull-quote-text">
          "Peer-led collaboration improves comprehension, builds confidence, and fosters active learning—transforming individual study into shared academic success."
        </p>
        <div className="pull-quote-attr">— Center for Teaching and Learning Research</div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <div className="cta-box">
          <div className="cta-stamp">✦ JOIN YOUR CLASSMATES ✦</div>
          <h2 className="cta-title">
            Find your <em>study group</em> today.
          </h2>
          <p className="cta-subtitle">
            Sign up in minutes with your student email and connect with classmates in your courses.
          </p>
          <Button href="/register" className="cta-button" style={{ textDecoration: "none" }}>
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-text">© 2026 StudyConnect</span>
        <span className="footer-text">Built for students, by students</span>
      </footer>
    </div>
  );
}

export default HomePage;
