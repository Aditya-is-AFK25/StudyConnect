# StudyConnect — API Contract

> **Last updated:** 2026-07-11  
> Base URL: `http://localhost:5000/api`  
> All protected routes require `Authorization: Bearer <jwt>` header.

---

## Auth (`/api/auth`)

| Method | Path | Auth | Body | Returns |
|--------|------|------|------|---------|
| POST | `/auth/register` | No | `{ name, email, password }` | `{ token, user }` |
| POST | `/auth/login` | No | `{ email, password }` | `{ token, user }` |
| GET | `/auth/profile` | ✅ | — | User object |
| PUT | `/auth/profile` | ✅ | `{ name, bio, subjects[], availability[], environment }` | Updated user |

---

## Matching (`/api/match`)

| Method | Path | Auth | Body / Params | Returns |
|--------|------|------|---------------|---------|
| GET | `/match/matches` | ✅ | — | Ranked array of user objects with `score`, `sharedSubjects`, `sharedAvailability` |
| POST | `/match/connect/:userId` | ✅ | — | `{ message, request }` |
| GET | `/match/requests` | ✅ | — | Array of pending requests sent **to** me (with `fromUser` populated) |
| GET | `/match/requests/sent` | ✅ | — | Array of requests I sent (`{ toUser, status }`) |
| PUT | `/match/requests/:id/accept` | ✅ | — | Updated request |
| PUT | `/match/requests/:id/decline` | ✅ | — | Updated request |

### ConnectRequest object
```json
{
  "_id": "...",
  "fromUser": "...",
  "toUser": "...",
  "status": "pending | accepted | declined",
  "createdAt": "ISO8601"
}
```

---

## Groups (`/api/groups`)

**Canonical field names** (match the DB schema — no aliases):

| Field | DB field | Frontend sends | Returned as |
|-------|----------|----------------|-------------|
| Group name | `groupName` | `groupName` | `name` (mapped in read controller) |
| Course code | `subject` | `subject` | `course` (mapped in read controller) |
| Description | `description` | `description` | `desc` (mapped in read controller) |

> Note: The read controller maps DB names → UI names for the frontend display layer.  
> The write (POST) endpoint expects the DB canonical names.

| Method | Path | Auth | Body | Returns |
|--------|------|------|------|---------|
| GET | `/groups` | ✅ | — | Array of `{ id, name, course, desc, members, joined }` |
| POST | `/groups` | ✅ | `{ groupName, subject, description }` | Raw group document |
| POST | `/groups/:id/join` | ✅ | — | `{ message, group }` |
| POST | `/groups/:id/leave` | ✅ | — | `{ message, group }` |
| GET | `/groups/:id/members` | ✅ | — | Array of member objects |
| GET | `/groups/:id/messages` | ✅ | — | Array of message objects |
| POST | `/groups/:id/messages` | ✅ | `{ text }` | New message object |
| PUT | `/groups/:id` | ✅ | `{ groupName?, subject?, description? }` | Updated group |
| DELETE | `/groups/:id` | ✅ | — | `{ message }` |

---

## Notes (`/api/notes`)

| Method | Path | Auth | Body / Query | Returns |
|--------|------|------|--------------|---------|
| GET | `/notes` | No | `?subject=BCA-301` or `?groupId=<id>` | Array of note objects |
| POST | `/notes` | ✅ | FormData: `{ title, subject, description, file, groupId? }` | New note object |
| PUT | `/notes/:id` | ✅ | `{ title?, subject?, description? }` | Updated note |
| DELETE | `/notes/:id` | ✅ | — | `{ message }` |

### Note object
```json
{
  "_id": "...",
  "title": "...",
  "subject": "BCA-301",
  "description": "...",
  "file": "/uploads/filename.pdf",
  "uploadedBy": { "_id": "...", "name": "..." },
  "groupId": "... | null",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

---

## Sessions (`/api/sessions`)

| Method | Path | Auth | Body | Returns |
|--------|------|------|------|---------|
| GET | `/sessions` | No | — | Array of sessions |
| POST | `/sessions` | ✅ | `{ title, date, time, location, description }` | New session |
| POST | `/sessions/:id/rsvp` | ✅ | `{ status }` | Updated session |

---

## Progress (`/api/progress`)

| Method | Path | Auth | Body | Returns |
|--------|------|------|------|---------|
| GET | `/progress` | No | — | Array of progress records |
| PUT | `/progress/:id` | ✅ | `{ completed?, notes? }` | Updated record |

---

## Error format

All errors return:
```json
{ "message": "Human-readable error description" }
```

HTTP status codes follow REST conventions: `400` bad input, `401` not authenticated, `403` not authorised, `404` not found, `409` conflict (duplicate), `500` server error.
