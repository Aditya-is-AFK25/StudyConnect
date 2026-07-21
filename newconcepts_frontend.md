# Frontend & New Concepts — StudyConnect

This file documents frontend concepts used in the StudyConnect project that are **outside the React syllabus** taught in class. These concepts were required for the project but were not covered in the class lectures or the repository's taught concept list.

---

## 1. Axios API service layer with interceptors

**What it is**: `axios` is a popular HTTP client library for JavaScript and TypeScript. It simplifies API requests, error handling, and supports request/response interceptors.

**Where used**:
- `frontend/src/services/api.ts`
- `frontend/src/pages/aditya/LoginPage.tsx`
- `frontend/src/pages/aditya/RegisterPage.tsx`
- `frontend/src/pages/khushboo/NotesPage.tsx`
- `frontend/src/pages/khushboo/StudyGroupsPage.tsx`
- `frontend/src/pages/khushboo/StudySessionsPage.tsx`
- `frontend/src/pages/aditya/MatchingPage.tsx`

**Why it is new**: The class syllabus covers basic `fetch()` and async calls, but not `axios` and its interceptor pattern for attaching auth headers automatically.

---

## 2. Browser `localStorage` for auth persistence

**What it is**: `window.localStorage` stores persistent key/value pairs in the browser.

**Where used**:
- `frontend/src/context/AuthContext.tsx`
- `frontend/src/pages/aditya/LoginPage.tsx`
- `frontend/src/services/api.ts`
- `frontend/src/components/aditya/Navbar.tsx`

**Why it is new**: The syllabus teaches React state and effects, but not browser storage patterns for persisting tokens/users across page reloads.

---

## 3. React Router advanced routing patterns and URL helpers

**What it is**: React Router v6 provides route-based navigation, route guarding, query params, and programmatic navigation.

**Where used**:
- `frontend/src/App.tsx` — `BrowserRouter`, `Routes`, `Route`
- `frontend/src/context/AuthContext.tsx` — `Navigate` for protected routes
- `frontend/src/components/aditya/Navbar.tsx` — `Link`, `useNavigate`
- `frontend/src/pages/khushboo/StudySessionsPage.tsx` — `useSearchParams`
- `frontend/src/pages/aditya/LoginPage.tsx` / `RegisterPage.tsx` — `useNavigate`

**Why it is new**: The class concept list does not include React Router or route protection / URL query handling.

---

## 4. React Context API for auth state

**What it is**: `createContext` and `useContext` provide global state shared across components without prop drilling.

**Where used**:
- `frontend/src/context/AuthContext.tsx`
- `frontend/src/components/shared/withPageLayout.tsx`
- `frontend/src/components/aditya/Navbar.tsx`
- `frontend/src/pages/aditya/LoginPage.tsx`
- `frontend/src/pages/aditya/RegisterPage.tsx`
- `frontend/src/pages/khushboo/StudySessionsPage.tsx`

**Why it is new**: The class documents controlled components, hooks, and HOCs, but not the Context API as an app-wide auth provider.

---

## 5. `FormData` for file uploads

**What it is**: `FormData` is a browser API that lets JavaScript construct multipart form data for file upload endpoints.

**Where used**:
- `frontend/src/pages/khushboo/NotesPage.tsx`
- `frontend/src/pages/khushboo/StudyGroupsPage.tsx`

**Why it is new**: File upload handling with multipart form data is usually beyond the standard React syllabus.

---

## 6. `Promise.all` for parallel API requests

**What it is**: `Promise.all()` runs multiple promises in parallel and waits until all of them settle.

**Where used**:
- `frontend/src/pages/aditya/MatchingPage.tsx`

**Why it is new**: This is a JavaScript concurrency optimization pattern not covered in the React syllabus.

---

## 7. `useRef` for mutable refs and anti-double-submit behavior

**What it is**: `useRef` stores a mutable object that persists across renders without triggering re-renders.

**Where used**:
- `frontend/src/pages/aditya/RegisterPage.tsx`

**Why it is new**: The class notes do not list `useRef` as a taught concept.

---

## 8. Vite environment variables via `import.meta.env`

**What it is**: Vite exposes env variables through `import.meta.env` for client-side configuration.

**Where used**:
- `frontend/src/services/api.ts`

**Why it is new**: This is a build-tool-specific front-end concept and not part of the React syllabus.

---

## 9. TypeScript typings in React components

**What it is**: TypeScript adds static type annotations for props, state, and API data structures.

**Where used**:
- `frontend/src/components/shared/withPageLayout.tsx`
- `frontend/src/pages/khushboo/StudySessionsPage.tsx`
- `frontend/src/context/AuthContext.tsx`
- `frontend/src/services/api.ts`

**Examples**:
- `function withPageLayout<P extends object>(WrappedComponent: React.ComponentType<P>)`
- `const [sessions, setSessions] = useState<SessionType[]>([]);`
- `export function AuthProvider({ children }: any)`

**Why it is new**: The class concept list does not include TypeScript-specific typing patterns for React.

---

## 10. Programmatic navigation and protected route guards

**What it is**: `useNavigate` allows code-driven route changes, while route guarding uses `Navigate` to redirect unauthorized users.

**Where used**:
- `frontend/src/components/aditya/Navbar.tsx`
- `frontend/src/context/AuthContext.tsx`
- `frontend/src/pages/aditya/LoginPage.tsx`

**Why it is new**: This routing guard pattern is a practical application of React Router not described in the taught concept list.

---

## Concepts already taught in class (not included here)

These frontend features are present in the project but are already covered by the class concept list:
- Controlled components and form handling (`useState`, `onChange`, `e.preventDefault()`)
- Side effects and async data fetching (`useEffect`)
- Higher-order components (HOC)
- Code splitting and lazy loading (`React.lazy`, `<Suspense>`)
- React Bootstrap UI components and CSS import

---

*Last updated: 2026-07-21*