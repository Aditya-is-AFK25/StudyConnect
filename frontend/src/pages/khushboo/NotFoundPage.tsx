// NotFoundPage.tsx — Khushboo
// Converted to CLASS COMPONENT with lifecycle methods (LifeCycleExample pattern from newapp)
// React Bootstrap: Container, Alert, Button, ProgressBar
// Concepts:
//   - Class Component (extends React.Component)
//   - componentDidMount (start countdown timer on mount)
//   - componentWillUnmount (clear interval on unmount — cleanup)
//   - setState (update countdown every second)

import React from "react";
import { Container, Alert, Button } from "react-bootstrap";

interface State {
  countdown: number;
}

class NotFoundPage extends React.Component<{}, State> {
  // Interval reference stored as class property (not state — same as LifeCycleExample)
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(props: {}) {
    super(props);
    // Initialize state
    this.state = {
      countdown: 10, // seconds before redirect suggestion
    };
  }

  // Lifecycle: runs once after component mounts (like useEffect with [] in hooks)
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.countdown <= 1) {
          clearInterval(this.timer!);
          return { countdown: 0 };
        }
        return { countdown: prevState.countdown - 1 };
      });
    }, 1000);
  }

  // Lifecycle: runs just before component unmounts (cleanup — prevents memory leaks)
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    const { countdown } = this.state;
    const progressNow = ((10 - countdown) / 10) * 100;

    return (
      <Container
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "75vh", maxWidth: 600 }}
      >
        {/* 404 code */}
        <span className="not-found-code" style={{ fontSize: "5rem", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
          404
        </span>

        <h1 className="not-found-title mt-2">Class Dismissed... Early?</h1>

        <p className="not-found-text" style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "1rem", lineHeight: 1.7 }}>
          We checked the syllabus, searched the library stacks, and even asked the smart kid in the front row, but this page seems to have dropped out this semester.
        </p>

        {/* Countdown alert */}
        <Alert
          variant="warning"
          className="mt-4 w-100"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", background: "var(--card-bg)", border: "1px solid var(--gold, #c9a84c)", color: "var(--ink)" }}
        >
          {countdown > 0
            ? `You can go back to Study Hall in ${countdown} seconds...`
            : "Ready to head back? Click the button below!"}
        </Alert>

        <Button
          onClick={this.handleGoHome}
          className="btn-back-home mt-2"
          style={{ fontWeight: 700 }}
        >
          ← Back to Study Hall
        </Button>
      </Container>
    );
  }
}

export default NotFoundPage;