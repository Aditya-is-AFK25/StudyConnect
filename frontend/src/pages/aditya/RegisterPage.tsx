import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate all form fields
  const validateForm = () => {
    const tempErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!name.trim()) {
      tempErrors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters long.";
    }

    // Email validation
    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    // Password validation (min 6 chars, alphanumeric recommendations)
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    // Password confirmation matching check
    if (!confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        bio: bio.trim(),
      };

      await registerUser(payload);
      setLoading(false);
      navigate("/login"); // Redirect to login page upon successful account creation
    } catch (error) {
      setLoading(false);
      if (!error.response) {
        setErrorMessage(
          "Unable to connect to the backend server. Please verify that the backend is running on port 5001."
        );
      } else {
        setErrorMessage(
          error.response.data?.message ||
            "Failed to register. The email address might already be registered."
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
      <main className="form-card" style={{ maxWidth: "500px", width: "100%" }}>
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="profile-badge">🎓 JOIN US</span>
          <h2 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
            Create Account
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginTop: "0.25rem",
            }}
          >
            Build your profile, share resources, and study together.
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
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div>
            <label className="field-label">Full Name</label>
            <input
              type="text"
              className="field-input"
              placeholder="e.g. Harmeet Singh"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
            />
            {errors.name && (
              <span
                style={{
                  color: "var(--coral)",
                  fontSize: "0.75rem",
                  fontFamily: "JetBrains Mono, monospace",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {errors.name}
              </span>
            )}
          </div>

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
            <label className="field-label">About You (Short Bio)</label>
            <textarea
              className="field-input"
              placeholder="Tell others about your study focus, major, or hobbies..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{
                minHeight: "80px",
                resize: "vertical",
                padding: "0.75rem",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label className="field-label">Password</label>
              <input
                type="password"
                className="field-input"
                placeholder="Choose password"
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

            <div>
              <label className="field-label">Confirm Password</label>
              <input
                type="password"
                className="field-input"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: null }));
                }}
              />
              {errors.confirmPassword && (
                <span
                  style={{
                    color: "var(--coral)",
                    fontSize: "0.75rem",
                    fontFamily: "JetBrains Mono, monospace",
                    marginTop: "0.25rem",
                    display: "block",
                  }}
                >
                  {errors.confirmPassword}
                </span>
              )}
            </div>
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
            {loading ? "Creating Account..." : "Create Account"}
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
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              style={{
                color: "var(--teal)",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
