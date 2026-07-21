# Backend & New Concepts — StudyConnect

This file documents concepts used in the StudyConnect project that are **outside the React syllabus** taught in class. These were required for the project but not covered in lectures.

---

## 1. React Bootstrap (Third-Party Component Library)

**What it is**: `react-bootstrap` is a library that provides pre-built React components styled with Bootstrap 5. It eliminates the need to write repetitive HTML + CSS for common UI patterns.

**Why used**: Teacher recommended it for extra marks; it demonstrates use of third-party component libraries in React.

**Package**: `npm install react-bootstrap bootstrap`

**Components used in this project**:

| Component | Page/File | Purpose |
|---|---|---|
| `Navbar`, `Nav`, `NavDropdown` | `Navbar.tsx` | Responsive navigation with mobile collapse |
| `Container`, `Row`, `Col` | All pages | CSS Grid system — responsive layout |
| `Card` | All pages | Styled content blocks |
| `Form`, `Form.Group`, `Form.Control`, `Form.Label` | Login, Register, Notes, EditProfile, Sessions, Groups | Bootstrap form inputs with built-in `isInvalid` validation styling |
| `Form.Control.Feedback` | Login, Register, Notes | Shows validation error messages inline |
| `Alert` | Login, Register, Matching, Sessions | Colored alert boxes for errors/success |
| `Button` | All pages | Styled buttons |
| `Spinner` | Login, Register, EditProfile, Sessions | Loading animation |
| `Badge` | Notes, Matching, Groups, Progress | Label/tag chips |
| `Modal` | StudyGroups | Overlay dialog box (replaces custom `.modal-overlay` CSS) |
| `Tabs`, `Tab` | StudyGroups forum modal | Tabbed panels inside a modal |
| `ListGroup`, `ListGroup.Item` | Matching, StudyGroups, Progress | Vertical list of items |
| `ProgressBar` | Progress Tracker, LoadingBar | Animated fill bar |
| `InputGroup` | Notes | Input with prefix/suffix decorators |

---

## 2. Bootstrap CSS Import

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
```

This must be imported **once** in `App.tsx`. It loads Bootstrap's entire CSS stylesheet which provides:
- Grid system (`container`, `row`, `col-*`)
- Utility classes (`d-flex`, `gap-2`, `text-center`, `w-100`, etc.)
- Base typography and spacing resets

**Note**: Our existing brand CSS variables (`--teal`, `--ink`, `--cream`, etc.) still work alongside Bootstrap — Bootstrap does not override CSS custom properties.

---

## 3. React Router `useSearchParams`

**File**: `StudySessionsPage.tsx`

```javascript
const [searchParams] = useSearchParams();
const groupId = searchParams.get("groupId");
```

Used to read query parameters from the URL (e.g., `/sessions?groupId=abc123`). Not taught in class — this is a React Router v6 hook.

---

## 4. `Promise.all` for Parallel API Calls

**File**: `MatchingPage.tsx`

```javascript
const [matchRes, sentRes, incomingRes] = await Promise.all([
  getMatches(), getSentRequests(), getIncomingRequests(),
]);
```

Fires multiple async API calls simultaneously and waits for all to finish. More efficient than sequential `await` calls. This is a JavaScript Promise API concept, not React-specific.

---

## 5. Bootstrap `Modal` vs Custom CSS Overlay

**Old approach** (custom CSS):
```jsx
<div className="modal-overlay">
  <div className="modal-box">...</div>
</div>
```

**New approach** (React Bootstrap Modal):
```jsx
<Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
  <Modal.Header closeButton>...</Modal.Header>
  <Modal.Body>...</Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal>
```

Bootstrap Modal handles: backdrop, keyboard ESC close, focus trapping, animations — automatically.

---

## 6. Bootstrap `Tabs` / `Tab`

**File**: `StudyGroupsPage.tsx`

```jsx
<Tabs activeKey={forumTab} onSelect={(k) => handleTabSwitch(k)} className="mb-3">
  <Tab eventKey="messages" title="💬 Messages">...</Tab>
  <Tab eventKey="notes" title="📚 Group Notes">...</Tab>
</Tabs>
```

The `activeKey` + `onSelect` props make it a **controlled tab** — the parent component manages which tab is shown, same controlled component principle taught in class.

---

## 7. HOC Generic TypeScript Pattern

**File**: `withPageLayout.tsx`

```typescript
function withPageLayout<P extends object>(WrappedComponent: React.ComponentType<P>) {
```

The `<P extends object>` is a **TypeScript generic constraint** — it ensures the HOC works with any props type. This is a TypeScript concept beyond the class syllabus, but it's the standard way to type HOCs in TypeScript.

---

## 8. `NavDropdown` with Custom `title` (JSX as prop)

**File**: `Navbar.tsx`

```jsx
<NavDropdown title={<span className="...">...</span>} id="user-dropdown">
```

React Bootstrap allows passing JSX as the `title` prop instead of just a string — enabling custom avatars/icons in the dropdown trigger.

---

*Last updated: 2026-07-21*
