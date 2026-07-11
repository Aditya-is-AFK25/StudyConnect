# StudyConnect - Project Summary

StudyConnect is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to match university students with compatible study partners based on shared subjects and availability schedules. It is a collaborative student project built on a tight timeline to demonstrate core full-stack capabilities, data modeling, authentication, API design, and interactive frontend interfaces.

---

## 1. Project Folder Structure & File Status

Below is the directory structure of the repository. Each file includes a status marker:
*   ✅ **done:** Fully implemented and wired up.
*   🟡 **partially done/placeholder:** Exists in the codebase but has minimal implementation, is a placeholder stub, or is not wrapped/active.
*   ❌ **not started:** Scheduled but does not contain functional code.

### 📁 Frontend (`frontend/`)

```
frontend/
├── index.html                     ✅ done
├── package.json                   ✅ done
├── vite.config.js                 ✅ done
└── src/
    ├── App.jsx                    ✅ done
    ├── main.jsx                   ✅ done
    ├── pages/
    │   ├── aditya/
    │   │   ├── HomePage.jsx       ✅ done
    │   │   ├── RegisterPage.jsx   ✅ done
    │   │   ├── LoginPage.jsx      ✅ done
    │   │   ├── EditProfilePage.jsx ✅ done
    │   │   └── MatchingPage.jsx   ✅ done
    │   └── khushboo/
    │       ├── NotFoundPage.jsx   ✅ done
    │       ├── NotesPage.jsx      ✅ done
    │       ├── StudyGroupsPage.jsx ✅ done
    │       ├── StudySessionsPage.jsx ✅ done
    │       └── ProgressTrackerPage.jsx ✅ done
    ├── components/
    │   ├── aditya/
    │   │   ├── MatchCard.jsx      🟡 placeholder stub
    │   │   └── Navbar.jsx         ✅ done
    │   ├── khushboo/
    │   │   ├── NoteCard.jsx       🟡 placeholder stub
    │   │   ├── GroupCard.jsx      🟡 placeholder stub
    │   │   ├── SessionCard.jsx    🟡 placeholder stub
    │   │   ├── ProgressBar.jsx    🟡 placeholder stub
    │   │   ├── LoadingSpinner.jsx 🟡 placeholder stub
    │   │   └── ErrorMessage.jsx   🟡 placeholder stub
    │   └── shared/
    │       ├── Button.jsx         ✅ done
    │       ├── InputField.jsx     ✅ done
    │       └── Layout.jsx         🟡 placeholder stub
    ├── context/
    │   └── AuthContext.jsx        ✅ done
    ├── services/
    │   └── api.js                 ✅ done
    └── styles/
        ├── aditya.css             ✅ done
        └── khushboo.css           ✅ done
```

### 📁 Backend (`backend/`)

```
backend/
├── package.json                   ✅ done
├── server.js                      ✅ done
├── shared/
│   ├── config/
│   │   └── db.js                  ✅ done
│   └── middleware/
│       ├── errorHandler.js        ✅ done
│       └── cors.js                ✅ done
├── vignesh/
│   ├── models/
│   │   └── User.js                ✅ done
│   ├── controllers/
│   │   ├── authController.js      ✅ done
│   │   └── matchController.js     ✅ done
│   ├── routes/
│   │   ├── authRoutes.js          ✅ done
│   │   └── matchRoutes.js         ✅ done
│   ├── middleware/
│   │   └── auth.js                ✅ done
│   └── utils/
│       └── generateToken.js       ✅ done
└── parshvi/
    ├── models/
    │   ├── Note.js                ✅ done
    │   ├── Group.js               ✅ done
    │   ├── Session.js             ✅ done
    │   ├── Progress.js            ✅ done
    │   └── Message.js             ✅ done
    ├── controllers/
    │   ├── notes/
    │   │   ├── create.js          ✅ done
    │   │   ├── read.js            ✅ done
    │   │   ├── update.js          ✅ done
    │   │   └── delete.js          ✅ done
    │   ├── group/
    │   │   ├── create.js          ✅ done
    │   │   ├── read.js            ✅ done
    │   │   ├── update.js          ✅ done
    │   │   ├── delete.js          ✅ done
    │   │   ├── join.js            ✅ done
    │   │   ├── leave.js           ✅ done
    │   │   ├── members.js         ✅ done
    │   │   ├── getMessages.js     ✅ done
    │   │   └── postMessage.js     ✅ done
    │   ├── session/
    │   │   ├── create.js          ✅ done
    │   │   ├── read.js            ✅ done
    │   │   ├── update.js          ✅ done
    │   │   ├── delete.js          ✅ done
    │   │   └── join.js            ✅ done
    │   ├── progress/
    │   │   ├── index.js           ✅ done
    │   │   ├── create.js          ✅ done
    │   │   ├── read.js            ✅ done
    │   │   ├── update.js          ✅ done
    │   │   └── delete.js          ✅ done
    │   └── notesController.js     ✅ done
    ├── routes/
    │   ├── notesRoute.js          ✅ done
    │   ├── groupRoute.js          ✅ done
    │   ├── sessionRoute.js        ✅ done
    │   └── progressRoute.js       ✅ done
    ├── middleware/
    │   └── upload.js              ✅ done
    └── uploads/
        └── .gitkeep               ✅ done
```

---

## 2. Code Description (Done & Partially Done Files)

### 🖥️ Frontend Files

#### Pages
*   **[HomePage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/aditya/HomePage.jsx):** Welcomes visitors and describes the matching service. Styled using a warm academic palette (cream, forest green, gold).
*   **[RegisterPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/aditya/RegisterPage.jsx):** Handles user registration, capturing name, email, password, and verifying matching inputs via client-side validation before sending data to backend.
*   **[LoginPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/aditya/LoginPage.jsx):** Authenticates existing students. Saves returned JWT tokens and redirects users to matchmaking dashboards.
*   **[EditProfilePage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/aditya/EditProfilePage.jsx):** Allows users to select enrolled subjects, availability time slots, study bio, and environment preferences, saving changes to the profile API.
*   **[MatchingPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/aditya/MatchingPage.jsx):** Recommends classmate matches by filtering database users who share subject overlaps and availability times.
*   **[NotesPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/khushboo/NotesPage.jsx):** Allows students to upload files (via Multer backend integration) and browse/download notes uploaded by others, filtered by course code.
*   **[StudyGroupsPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/khushboo/StudyGroupsPage.jsx):** Renders study groups directory. Allows group creations, joining/leaving, viewing member list rosters, and opens chat modals to post updates.
*   **[StudySessionsPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/khushboo/StudySessionsPage.jsx):** Displays meetups calendar. Allows scheduling dates, times, goals, and lets students RSVP as attending/declined.
*   **[ProgressTrackerPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/khushboo/ProgressTrackerPage.jsx):** Tracks subject milestones. Retrieves checklist items (auto-seeded by subject) and lets students mark topics completed, updating completion percentage.
*   **[NotFoundPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/khushboo/NotFoundPage.jsx):** Fallback page for non-existent routes.

#### Components
*   **[Navbar.jsx](file:///c:/jims/StudyConnect/frontend/src/components/aditya/Navbar.jsx):** Sticky main navigation bar. Handles authentication links and includes a light/dark mode theme toggle button.
*   **[MatchCard.jsx](file:///c:/jims/StudyConnect/frontend/src/components/aditya/MatchCard.jsx):** 🟡 Placeholder component stub (matching layouts are currently rendered inline in `MatchingPage.jsx`).
*   **NoteCard / GroupCard / SessionCard / ProgressBar / LoadingSpinner / ErrorMessage:** 🟡 Placeholder stubs in `components/khushboo/` (the actual production layouts and logic are handled inline inside Khushboo's page files).
*   **[Button.jsx](file:///c:/jims/StudyConnect/frontend/src/components/shared/Button.jsx):** Done. Standard reuse button.
*   **[InputField.jsx](file:///c:/jims/StudyConnect/frontend/src/components/shared/InputField.jsx):** Done. Generic form text input field.
*   **[Layout.jsx](file:///c:/jims/StudyConnect/frontend/src/components/shared/Layout.jsx):** 🟡 Placeholder component stub.

#### Services & Context
*   **[AuthContext.jsx](file:///c:/jims/StudyConnect/frontend/src/context/AuthContext.jsx):** Exposes `AuthProvider` and `useAuth` to store and distribute active user objects. Includes a `ProtectedRoute` wrapper (not yet connected to routing).
*   **[api.js](file:///c:/jims/StudyConnect/frontend/src/services/api.js):** Centrally configures `axios` with automatic JWT Authorization interceptor attachments and exports named requests for all backend APIs.

---

### 💾 Backend Files

*   **[server.js](file:///c:/jims/StudyConnect/backend/server.js):** Primary startup file. Configures MongoDB, initializes Express, parses JSON payloads, handles `/uploads` static file mounts, and registers all routers on `/api` sub-paths.
*   **[db.js](file:///c:/jims/StudyConnect/backend/shared/config/db.js):** Establishes connections to MongoDB.
*   **[errorHandler.js](file:///c:/jims/StudyConnect/backend/shared/middleware/errorHandler.js):** Catches errors and formats them into JSON messages.
*   **[cors.js](file:///c:/jims/StudyConnect/backend/shared/middleware/cors.js):** Configures request origins.
*   **[User.js](file:///c:/jims/StudyConnect/backend/vignesh/models/User.js):** Defines model for user accounts, containing subjects (String arrays), availability slots (String arrays), bio, and bcrypt hashed passwords.
*   **[authController.js](file:///c:/jims/StudyConnect/backend/vignesh/controllers/authController.js):** Processes registration, login validation, user authentication verification, and handles user profile updates.
*   **[matchController.js](file:///c:/jims/StudyConnect/backend/vignesh/controllers/matchController.js):** Computes classmates matching recommendation list based on overlap scores.
*   **[auth.js](file:///c:/jims/StudyConnect/backend/vignesh/middleware/auth.js):** JWT protection middleware. Decodes token headers, extracts user IDs, and attaches user info to `req.user`.
*   **[generateToken.js](file:///c:/jims/StudyConnect/backend/vignesh/utils/generateToken.js):** Generates signed JWT tokens.
*   **[Note.js](file:///c:/jims/StudyConnect/backend/Parshvi/models/Note.js):** Notes schema: title, description, fileUrl, courseCode, and uploader ID.
*   **[Group.js](file:///c:/jims/StudyConnect/backend/Parshvi/models/Group.js):** Group circle schema: groupName, subject, description, createdBy, and members user ID list.
*   **[Session.js](file:///c:/jims/StudyConnect/backend/Parshvi/models/session.js):** Meetup schema: subject, topic, location, date, time, createdBy, and participants user ID list.
*   **[Progress.js](file:///c:/jims/StudyConnect/backend/Parshvi/models/progress.js):** Milestones schema: user ID reference, subject name, topic checklist name, and status ("Pending", "In Progress", "Completed").
*   **[Message.js](file:///c:/jims/StudyConnect/backend/Parshvi/models/Message.js):** Forum messages schema: group reference ID, user reference ID, text, and timestamp.
*   **CRUD Controllers (notes, group, session, progress directories):** Express handlers performing MongoDB CRUD searches, creation writes, updates (`findByIdAndUpdate`), and deletion pulls (`findByIdAndDelete`).

---

## 3. Backend Endpoints (API Routes)

The Express backend exposes the following endpoints (all prefixed with `/api`):

| Method | Route Path | Protected? | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/register` | No | Registers new user and returns JWT token. |
| **POST** | `/auth/login` | No | Authenticates credentials and returns JWT token. |
| **GET** | `/auth/profile` | Yes | Fetches the logged-in user's profile details. |
| **PUT** | `/auth/profile` | Yes | Updates user subjects, availability, bio, and environment. |
| **GET** | `/match/recommendations` | Yes | Runs classmate matchmaking recommendations. |
| **GET** | `/match/matches` | Yes | Secondary router prefix for classmate matchmaking recommendations. |
| **GET** | `/notes` | No | Fetches uploaded files, optionally filtered by `courseCode`. |
| **POST** | `/notes` | Yes | Uploads notes file (handles Multipart FormData via Multer). |
| **PUT** | `/notes/:id` | Yes | Updates note details. |
| **DELETE** | `/notes/:id` | Yes | Deletes note document from MongoDB. |
| **GET** | `/groups` | Yes | Fetches list of all study groups with member details. |
| **POST** | `/groups` | Yes | Creates a new study group (adds creator as first member). |
| **PUT** | `/groups/:id` | Yes | Updates study group info. |
| **DELETE** | `/groups/:id` | Yes | Deletes a study group by ID. |
| **POST** | `/groups/:id/join` | Yes | Adds the authenticated user to the group's members. |
| **PUT** | `/groups/:id/join` | Yes | Alias router endpoint to join a study group. |
| **POST** | `/groups/:id/leave` | Yes | Removes the authenticated user from group members. |
| **GET** | `/groups/:id/members` | Yes | Returns a populated array of user details enrolled in the group. |
| **GET** | `/groups/:id/messages` | Yes | Fetches chronological chat messages posted in the group. |
| **POST** | `/groups/:id/messages`| Yes | Posts a chat message to the group's discussion forum. |
| **GET** | `/sessions` | Yes | Fetches scheduled meetups, flagging user RSVP statuses. |
| **POST** | `/sessions` | Yes | Schedules a study meetup slot (assigns creator ID). |
| **PUT** | `/sessions/:id` | Yes | Updates session parameters. |
| **DELETE** | `/sessions/:id` | Yes | Deletes scheduled session meetup. |
| **PUT** | `/sessions/:id/join` | Yes | Toggles session RSVP status (attending / declined). |
| **POST** | `/sessions/:id/join` | Yes | Alias endpoint to join session/meetup. |
| **POST** | `/sessions/:id/rsvp` | Yes | Sets session RSVP status based on payload `status`. |
| **GET** | `/progress` | Yes | Fetches progress tasks. Auto-seeds default milestones if none exist. |
| **POST** | `/progress` | Yes | Adds new progress milestone checkpoint. |
| **PUT** | `/progress/:id` | Yes | Updates task state (converts done boolean to backend status enum). |
| **DELETE** | `/progress/:id` | Yes | Deletes progress checklist checkpoint. |

---

## 4. Features Added Beyond Original Plan

### 💬 Group Discussion Boards (Forum System)
To keep students engaged inside the app instead of forcing them to use external messaging tools, a discussion forum system has been built:
*   **Database Schema:** A custom `Message` model was created to record group IDs, user IDs, message texts, and timestamps.
*   **Endpoints:** Added `GET /api/groups/:id/messages` and `POST /api/groups/:id/messages` routes.
*   **Auto-Polling Engine:** A 3-second background polling timer was implemented in [StudyGroupsPage.jsx](file:///c:/jims/StudyConnect/frontend/src/pages/khushboo/StudyGroupsPage.jsx) that automatically fetches new posts while the forum modal is open, mimicking real-time chat.
*   **Manual Refresh:** Included a `↻ Refresh` button in the modal header to let students query updates instantly.

---

## 5. Current Gaps & Unfinished Tasks

*   **ProtectedRoute Integration:** The `ProtectedRoute` component is defined in [AuthContext.jsx](file:///c:/jims/StudyConnect/frontend/src/context/AuthContext.jsx) but is not wrapped around pages in [App.jsx](file:///c:/jims/StudyConnect/frontend/src/App.jsx). Anyone can currently access the matching page, study groups, sessions, and progress pages without logging in.
*   **Component Refactoring:** The card elements (NoteCard, GroupCard, SessionCard, MatchCard) in `components/` are placeholder stubs. The production rendering is currently done inline inside the main page components.
*   **Notes Page Auth Guard:** The `GET /api/notes` routes do not enforce authentication middleware protecting lists, unlike groups and sessions.
*   **Environment Configs:** Sensitive keys (like MongoDB Connection URIs and JWT Secrets) are managed via a local `.env` configuration template, which must be kept gitignored in production.
