import React from 'react';
import '../../styles/aditya.css';

//HOMEPAGE 

function HomePage() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">COLLABORATIVE STUDY NETWORK</div>
          <h1 className="hero-title">
            Find <span className="accent">classmates</span> who share your{' '}
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

        {/* OVERLAPPING CARDS */}
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
              <span className="tag">Project Management</span>
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
              <span className="tag">Data Structures and Algorithms</span>
            </div>
          </div>
        </div>
      </header>

      {/* THE SCROLLING SUBJECTS */}
      <section className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <div className="ticker-item" key={i}>
              <span>Database Management</span>
              <span>Python</span>
              <span>Web Development</span>
              <span>English</span>
              <span>Econometrics</span>
              <span>Data Structures and Algorithms</span>
              <span>AI & Machine Learning</span>
              <span>Statistics</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how">
        <div className="section-label">§ 01 — The system</div>
        <h2 className="section-title">
          Simple peer-to-peer connection in <em>three</em> steps.
        </h2>
        <div className="steps-grid">
          <div className="step">
            <span className="step-number">01</span>
            <h3 className="step-title">Create your profile</h3>
            <p className="step-description">
              Add your specific course codes, schedule availability, and preferred study environments.
            </p>
          </div>
          <div className="step">
            <span className="step-number">02</span>
            <h3 className="step-title">Discover matches</h3>
            <p className="step-description">
              View classmates taking the same courses, ranked by schedule alignment and shared subjects.
            </p>
          </div>
          <div className="step">
            <span className="step-number">03</span>
            <h3 className="step-title">Start collaborating</h3>
            <p className="step-description">
              Message your matches, share files, coordinate sessions, and work together on course concepts.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-label">§ 02 — Platform capabilities</div>
        <h2 className="section-title">
          Tools designed for <em>academic</em> success.
        </h2>

        <div className="features-bento">
          <div className="feature-card feature-notes">
            <div className="feature-icon">📝</div>
            <div>
              <h3 className="feature-title">Shared Course Resources</h3>
              <p className="feature-description">
                Organize lecture notes, study guides, and practice materials by course code and topic.
              </p>
            </div>
          </div>

          <div className="feature-card feature-groups">
            <div className="feature-icon">👥</div>
            <div>
              <h3 className="feature-title">Study Groups & Circles</h3>
              <p className="feature-description">
                Easily scale up from one-on-one partnerships to group study sessions for midterms and finals.
              </p>
            </div>
          </div>

          <div className="feature-card feature-sessions">
            <div className="feature-icon">📅</div>
            <div>
              <h3 className="feature-title">Structured Study Sessions</h3>
              <p className="feature-description">
                Schedule specific times, topics, and virtual or campus study locations without back-and-forth messaging.
              </p>
            </div>
          </div>

          <div className="feature-card feature-progress">
            <div className="feature-icon">📊</div>
            <div>
              <h3 className="feature-title">Interactive Goal Tracking</h3>
              <p className="feature-description">
                Set study milestones for each subject and track task completion rates as a group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="pull-quote">
        <p className="pull-quote-text">
          "Peer-led collaboration improves comprehension, builds confidence, and fosters active learning—transforming individual study into shared academic success."
        </p>
        <div className="pull-quote-attr">— Center for Teaching and Learning Research</div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-box">
          <div className="cta-stamp">✦ JOIN YOUR CLASSMATES ✦</div>
          <h2 className="cta-title">
            Find your <em>study group</em> today.
          </h2>
          <p className="cta-subtitle">
            Sign up in minutes with your student email and connect with classmates in your courses.
          </p>
          <a href="#register" className="cta-button">Get Started for Free</a>
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
