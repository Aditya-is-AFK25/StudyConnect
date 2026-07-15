import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext"; // 1. Import useAuth hook

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Retrieve login function from auth context

  // Validate email format and check password presence
  const validateForm = () => {
    const tempErrors = {};
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await loginUser({ email, password });

      // Store token and user details in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || response.data),
      );

      // 3. Notify the AuthContext to update the global user state
      login(response.data.user || response.data);

      setLoading(false);
      navigate("/"); // Redirect to home page upon successful login
    } catch (error) {
      setLoading(false);
      if (!error.response) {
        setErrorMessage(
          "Unable to connect to the backend server. Please verify that the backend is running on port 5000."
        );
      } else {
        setErrorMessage(
          error.response.data?.message ||
            "Failed to sign in. Please verify your credentials and try again."
        );
      }
    }
  };

  return (
    <div
      className="edit-profile-page"
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <main className="form-card" style={{ maxWidth: "450px", width: "100%" }}>
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="profile-badge">🔑 SIGN IN</span>
          <h2 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
            Welcome Back
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginTop: "0.25rem",
            }}
          >
            Connect with your peers and access your notes repo.
          </p>
        </div>

        {/* Global Error Message */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: "rgba(224, 86, 86, 0.08)",
              border: "1px solid rgba(224, 86, 86, 0.2)",
              color: "var(--coral)",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Form Inputs */}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div>
            <label className="field-label">Email Address</label>
            <input
              type="email"
              className="field-input"
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: null }));
              }}
            />
            {errors.email && (
              <span
                style={{
                  color: "var(--coral)",
                  fontSize: "0.75rem",
                  fontFamily: "JetBrains Mono, monospace",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="field-label">Password</label>
            <input
              type="password"
              className="field-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: null }));
              }}
            />
            {errors.password && (
              <span
                style={{
                  color: "var(--coral)",
                  fontSize: "0.75rem",
                  fontFamily: "JetBrains Mono, monospace",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Navigation Helper */}
          <div
            style={{
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "0.9rem",
            }}
          >
            <span style={{ color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              style={{
                color: "var(--teal)",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
