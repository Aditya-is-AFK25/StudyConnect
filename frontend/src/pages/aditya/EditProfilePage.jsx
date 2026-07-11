// Task: Edit Profile form with validation

import React, { useState, useEffect } from "react";
import "../../styles/aditya.css";
import { getProfile, updateProfile } from "../../services/api";
import LoadingSpinner from "../../components/khushboo/LoadingSpinner";

function EditProfilePage() {
  // 1. STATE MANAGEMENT
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [environment, setEnvironment] = useState("Library");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. DATA FETCHING ON MOUNT (useEffect Hook)
  // useEffect allows us to perform "side effects" in functional components.
  // The empty dependency array [] as the second argument ensures that this
  // hook runs exactly ONCE, right after the page loads (component mounts).
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setErrorMessage("");
        
        // Call the GET /api/auth/profile service
        const response = await getProfile();
        const data = response.data;

        // Populate our state variables with the data returned from MongoDB
        setName(data.name || "");
        setBio(data.bio || "");
        setSelectedSubjects(data.subjects || []);
        setSelectedAvailability(data.availability || []);
        setEnvironment(data.environment || "Library");
        setLoading(false);
      } catch (err) {
        // If the token is invalid/expired or the backend is offline
        setErrorMessage("Failed to load your profile details. Please verify your login session.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const availableSubjects = [
    // Computer Applications (BCA)
    "Database Management",
    "Python",
    "Network Security",
    "Web Development",
    "Data Structures and Algorithms",
    "Software Engineering",
    // Business Administration (BBA)
    "Principles of Management",
    "Financial Accounting",
    "Marketing Management",
    "Organizational Behavior",
    // Economics (BA Eco)
    "Microeconomics",
    "Macroeconomics",
    "Econometrics",
    "Statistics",
    // Common / Languages
    "English",
    "Business Communication",
  ];

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeslots = ["Morning", "Afternoon", "Evening"];

  // 3. DYNAMIC SELECTION TOGGLERS
  const handleSubjectToggle = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleAvailabilityToggle = (slot) => {
    if (selectedAvailability.includes(slot)) {
      setSelectedAvailability(selectedAvailability.filter((s) => s !== slot));
    } else {
      setSelectedAvailability([...selectedAvailability, slot]);
    }
  };

  // 4. FORM SUBMISSION WITH VALIDATION AND BACKEND SAVE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Client-side validations
    if (!name.trim()) {
      setErrorMessage("Student name is mandatory.");
      return;
    }
    if (selectedSubjects.length === 0) {
      setErrorMessage("Please select at least one subject to study.");
      return;
    }
    if (selectedAvailability.length === 0) {
      setErrorMessage("Please select at least one availability slot.");
      return;
    }

    try {
      // POST/PUT the updated user details back to MongoDB
      await updateProfile({
        name,
        bio,
        subjects: selectedSubjects,
        availability: selectedAvailability,
        environment,
      });

      setSuccessMessage("Your peer profile details have been saved successfully!");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to save profile changes. Please try again."
      );
    }
  };

  // Render a loading state if data is still fetching on load
  if (loading) {
    return <LoadingSpinner message="Loading your peer profile details..." />;
  }

  return (
    <div
      className="profile-container"
      style={{ padding: "4rem 5%", maxWidth: "800px", margin: "0 auto" }}
    >
      <style>
        {`
          .profile-card {
            background: var(--card-bg);
            border: 2px solid var(--ink);
            border-radius: 4px;
            box-shadow: 8px 8px 0 var(--ink);
            padding: 2.5rem;
            transition: background-color 0.3s, color 0.3s;
          }
          .profile-title {
            font-family: 'Fraunces', serif;
            font-size: 2.5rem;
            font-weight: 500;
            font-style: italic;
            color: var(--ink);
            margin-bottom: 2rem;
            border-bottom: 1px dashed rgba(35, 40, 31, 0.3);
            padding-bottom: 1rem;
          }
          .form-section {
            margin-bottom: 2rem;
          }
          .form-label {
            display: block;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--forest);
            margin-bottom: 0.75rem;
            font-weight: 600;
          }
          .text-input, .textarea-input {
            width: 100%;
            background: var(--card-bg);
            color: var(--ink);
            border: 1.5px solid var(--ink);
            border-radius: 4px;
            padding: 0.8rem 1rem;
            font-family: inherit;
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.2s;
          }
          .text-input:focus, .textarea-input:focus {
            border-color: var(--gold);
          }
          .subject-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
          }
          .subject-badge {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            background: transparent;
            color: var(--ink);
            border: 1px solid rgba(35, 40, 31, 0.4);
            border-radius: 4px;
            padding: 0.4rem 0.8rem;
            cursor: pointer;
            user-select: none;
            transition: all 0.2s;
          }
          .subject-badge:hover {
            border-color: var(--ink);
          }
          .subject-badge.active {
            background: var(--gold);
            color: var(--card-bg);
            border-color: var(--gold);
          }
          .schedule-grid {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0.5rem;
          }
          .schedule-grid th, .schedule-grid td {
            border: 1px solid rgba(35, 40, 31, 0.15);
            padding: 0.6rem;
            text-align: center;
            font-size: 0.85rem;
          }
          .schedule-grid th {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            text-transform: uppercase;
            background: var(--cream-2);
            color: var(--ink);
          }
          .schedule-checkbox {
            cursor: pointer;
            accent-color: var(--forest);
            width: 16px;
            height: 16px;
          }
          .environment-options {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          .env-radio {
            border: 1.5px solid var(--ink);
            border-radius: 4px;
            padding: 0.8rem;
            text-align: center;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s;
          }
          .env-radio.active {
            background: var(--forest);
            color: var(--cream);
            border-color: var(--forest);
          }
          .save-btn {
            font-size: 1rem;
            font-weight: 600;
            color: var(--cream);
            background: var(--forest);
            border: none;
            border-radius: 999px;
            padding: 1rem 2rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: transform 0.2s, background 0.2s;
          }
          .save-btn:hover {
            background: #2d4333;
            transform: translateY(-2px);
          }
        `}
      </style>

      <form onSubmit={handleSubmit} className="profile-card">
        <h1 className="profile-title">Setup Peer Profile</h1>
        {/* Name Input */}
        <div className="form-section">
          <label className="form-label" htmlFor="nameInput">
            Full Name
          </label>
          <input
            id="nameInput"
            type="text"
            className="text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        {/* Bio Input */}
        <div className="form-section">
          <label className="form-label" htmlFor="bioInput">
            About me (Bio)
          </label>
          <textarea
            id="bioInput"
            className="textarea-input"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell classmates a bit about yourself..."
          />
        </div>
        {/* Subjects list tags selection */}
        <div className="form-section">
          <label className="form-label">Active Subjects</label>
          <div className="subject-grid">
            {availableSubjects.map((subject) => {
              const active = selectedSubjects.includes(subject);
              return (
                <div
                  key={subject}
                  className={`subject-badge ${active ? "active" : ""}`}
                  onClick={() => handleSubjectToggle(subject)}
                >
                  {subject}
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: "0.75rem",
              fontSize: "0.75rem",
              color: "var(--ink)",
              opacity: "0.7",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Is your subject missing? Email us at{" "}
            <a
              href="mailto:Support.studyconnect@gmail.com?subject=Missing Subject Request"
              style={{ color: "var(--coral)", textDecoration: "underline" }}
            >
              Support.studyconnect@gmail.com
            </a>{" "}
            with the subject details, and we'll add it!
          </div>
        </div>
        {/* Availability Schedule Table */}
        <div className="form-section">
          <label className="form-label">Availability Schedule</label>
          <table className="schedule-grid">
            <thead>
              <tr>
                <th>Time</th>
                {weekdays.map((day) => (
                  <th key={day}>{day.substring(0, 3)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeslots.map((time) => (
                <tr key={time}>
                  <td style={{ fontWeight: "600", fontSize: "0.8rem" }}>
                    {time}
                  </td>
                  {weekdays.map((day) => {
                    const slotId = `${day}-${time}`;
                    const isChecked = selectedAvailability.includes(slotId);
                    return (
                      <td key={day}>
                        <input
                          type="checkbox"
                          className="schedule-checkbox"
                          checked={isChecked}
                          onChange={() => handleAvailabilityToggle(slotId)}
                          aria-label={`${day} ${time}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Environment Preference */}
        <div className="form-section">
          <label className="form-label">Preferred Study Environment</label>
          <div className="environment-options">
            {["Library", "Virtual", "Quiet Cafes"].map((env) => {
              const active = environment === env;
              return (
                <div
                  key={env}
                  className={`env-radio ${active ? "active" : ""}`}
                  onClick={() => setEnvironment(env)}
                >
                  {env === "Library" && "🏫 "}
                  {env === "Virtual" && "💻 "}
                  {env === "Quiet Cafes" && "☕ "}
                  {env}
                </div>
              );
            })}
          </div>
        </div>
        {/* Error Alert Display */}
        {errorMessage && (
          <div
            style={{
              padding: "1rem",
              background: "var(--cream-2)",
              border: "1px solid var(--coral)",
              borderRadius: "4px",
              color: "var(--coral)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}
        {/* Success Alert Display */}
        {successMessage && (
          <div
            style={{
              padding: "1rem",
              background: "var(--cream-2)",
              border: "1px solid var(--forest)",
              borderRadius: "4px",
              color: "var(--forest)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
            }}
          >
            ✓ {successMessage}
          </div>
        )}
        {/* Submit Actions */}
        <div style={{ textAlign: "right", marginTop: "2rem" }}>
          <button type="submit" className="save-btn">
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
