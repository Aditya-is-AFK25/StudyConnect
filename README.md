# StudyConnect

> A MERN stack web app that helps students find and connect with the right study partners — built by a team of students, for students.

---

## What is StudyConnect?

StudyConnect matches students based on their **subjects and availability**, making it easy to find a study partner who's on the same page — literally.

Whether you're cramming for finals or looking for a long-term study buddy, StudyConnect has you covered.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |

---

## Project Status

🚀 **Active Development has started!**

### Progress Checklist:
*   [x] Initial Frontend & Backend Scaffolding
*   [x] Shared Backend Config & Middleware (`shared/`)
*   [x] API Service Layer Integration (`services/api.js`)
*   **Aditya's Tasks (Frontend):**
    *   [x] Landing / Home Page
    *   [x] Navbar Navigation & Theme Toggle
    *   [x] Edit Profile Page UI & Backend API integration
    *   [ ] Register / Login Forms & API integration
    *   [ ] Matching Recommendation UI
*   **Khushboo's Tasks (Frontend):**
    *   [x] Notes Page (in-memory document upload, filter feed, and deletion CRUD complete)
    *   [/] Study Groups Page (UI layout complete, live server endpoints configured, backend database saving pending)
    *   [/] Study Sessions Page (UI layout complete, in-memory scheduling and RSVP flags complete)
    *   [/] Progress Tracker Page (UI layout and task checklist complete)
    *   [x] NotFound Page (complete)
*   **Vignesh's Tasks (Backend):**
    *   [x] Mongoose User Schema
    *   [x] JWT Authentication & Protected Middleware
    *   [x] Auth APIs & Matching Recommendation algorithm
*   **Parshvi's Tasks (Backend):**
    *   [x] Notes CRUD APIs & Note Model
    *   [ ] Groups, Sessions, and Progress APIs

---

## Getting Started

### Prerequisites:
*   Node.js (v18+)
*   MongoDB running locally (`mongodb://127.0.0.1:27017/studyconnect`)

### Installation & Run:
1.  **Start Backend Server**:
    ```bash
    cd backend
    npm install
    npm start
    ```
2.  **Start Frontend Dev Server**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## Team

| Name | Role |
|---|---|
| Aditya Pratap Singh | Frontend |
| Parshvi Jain | Backend |
| Khushboo Joshi | Frontend|
| Vignesh Sriram Iyer | Backend |

---

## License

[MIT](./LICENSE)
