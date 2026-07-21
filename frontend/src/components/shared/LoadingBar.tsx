// LoadingBar.tsx — Shared Component
// Concept: useState + useEffect (taught in UseEffectExample1)
// Uses React Bootstrap ProgressBar as the loading animation

import React, { useState, useEffect } from "react";
import { Container, ProgressBar } from "react-bootstrap";

const LoadingBar = () => {
  // Controlled state for progress value (0 -> 100)
  const [progress, setProgress] = useState(0);

  // useEffect runs once on mount and sets up an interval
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50); // increments every 50ms → reaches 100 in ~2.5s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh", gap: "1rem" }}
    >
      <p
        className="mb-2"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.9rem",
          color: "var(--text-secondary, #666)",
          letterSpacing: "0.05em",
        }}
      >
        Loading... {progress}%
      </p>
      <div style={{ width: "300px" }}>
        <ProgressBar
          now={progress}
          animated
          variant="success"
          style={{
            height: "6px",
            borderRadius: "3px",
            background: "rgba(0,0,0,0.08)",
          }}
        />
      </div>
    </Container>
  );
};

export default LoadingBar;
