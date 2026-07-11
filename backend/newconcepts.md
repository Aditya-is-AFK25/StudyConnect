# New Backend Concepts — StudyConnect

This file explains the new concepts that were necessary to build StudyConnect but were not covered in our training.

---

## 1. ObjectId References (`ref`)

**What it does:** Relates records together across different MongoDB collections using document identifiers.

**Context of use:** Used in `ConnectRequest.js` (for `fromUser` and `toUser`), `note.js` (for `uploadedBy` and `groupId`), and `group.js` (for `createdBy` and `members`).

```js
const noteSchema = new mongoose.Schema({
    title: String,
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
}); // to be understood
```

---

## 2. Auto-timestamps (`timestamps: true`)

**What it does:** Automatically adds `createdAt` and `updatedAt` date properties to every document created.

**Context of use:** Used in `ConnectRequest.js` and `note.js` to log when items were added.

```js
const noteSchema = new mongoose.Schema({
    title: String
}, { timestamps: true }); // to be understood
```

---

## 3. Mongoose Schema Validation (`enum`)

**What it does:** Restricts a string schema field to only accept predefined options.

**Context of use:** Used in `ConnectRequest.js` to ensure request status is only pending, accepted, or declined.

```js
const requestSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending"
    }
}); // to be understood
```

---

## 4. Multer Upload Middleware

**What it does:** Third-party middleware that parses and handles uploaded files.

**Context of use:** Used in `upload.js`, `notesRoute.js`, and `create.js` to upload file attachments.

```js
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // to be understood
```

---

## 5. JSON Web Tokens (`jsonwebtoken`)

**What it does:** Encrypts and decrypts authentication tokens for client request validation.

**Context of use:** Used in `auth.js` and generateToken utility file to authenticate requests.

```js
const jwt = require("jsonwebtoken");
const decoded = jwt.verify(token, process.env.JWT_SECRET); // to be understood
```
