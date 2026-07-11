require('dotenv').config();

// ── Startup guard: fail fast if required env vars are missing ──────────────
const REQUIRED_ENV = ["JWT_SECRET", "MONGO_URI"];
const missingVars = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(
    `\n[StudyConnect] ❌ Server cannot start — missing required environment variable(s):\n` +
    missingVars.map((v) => `  • ${v}`).join("\n") +
    `\n\nCreate a backend/.env file based on backend/.env.example and set all values.\n`
  );
  process.exit(1);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://127.0.0.1:27017/studyconnect')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./vignesh/routes/authRoutes');
const matchRoutes = require('./vignesh/routes/matchRoutes');

const notesRoutes = require('./Parshvi/routes/notes/notesRoute');
const groupRoutes = require("./Parshvi/routes/groupRoute");
const sessionRoutes = require("./Parshvi/routes/sessionRoute");
const progressRoutes = require("./Parshvi/routes/progressRoute");

app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/notes', notesRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/progress", progressRoutes);

app.get('/', (req, res) => {
  res.send('StudyConnect backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

