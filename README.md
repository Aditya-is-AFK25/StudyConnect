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
    *   [x] Register / Login Forms & API integration
    *   [x] Matching Recommendation UI with Connection Requests
*   **Khushboo's Tasks (Frontend):**
    *   [x] Notes Page (with category filters and download links)
    *   [x] Study Groups Page (with Discussion Forum and Group Notes integration)
    *   [x] Study Sessions Page (with RSVP statuses and schedule posting)
    *   [x] Progress Tracker Page (interactive progress checklist)
    *   [x] NotFound Page (complete)
*   **Vignesh's Tasks (Backend):**
    *   [x] Mongoose User Schema & Auth controller logic
    *   [x] JWT Authentication & Protected Middleware
    *   [x] Auth APIs & Matching Recommendation algorithm
    *   [x] Connection Requests controller & routes
*   **Parshvi's Tasks (Backend):**
    *   [x] Notes CRUD APIs & Note Model (with Group notes support)
    *   [x] Frontend-to-Backend Notes Integration
    *   [x] Groups, Sessions, and Progress APIs
    *   [x] Route optimization and cleanup

---

## Getting Started

### Prerequisites:
*   Node.js (v18+)
*   MongoDB running locally (`mongodb://127.0.0.1:27017/studyconnect`)

### Installation & Run:
1.  **Start Backend Server**:
    * Copy the `backend/.env.example` file to `backend/.env` (default values are already pre-filled for local development):
      ```bash
      cp backend/.env.example backend/.env
      ```
    * Install dependencies and start the server:
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
