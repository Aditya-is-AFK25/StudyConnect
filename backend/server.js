const express = require('express');
const mongoose = require('mongoose');
const cors = require("./shared/middleware/cors");
const express = require('express');
const mongoose = require('mongoose');
const cors = require("./shared/middleware/cors");
const connectDB = require("./shared/config/db")

connectDB();
const app = express();
const PORT = 5000;

app.use(cors);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studyconnect')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./vignesh/routes/authRoutes');
const matchRoutes = require('./vignesh/routes/matchRoutes');

const notesRoutes = require('./Parshvi/routes/notes/notesRoute');
const groupRoutes = require("./Parshvi/routes/groupRoutes");
const sessionRoutes = require("./Parshvi/routes/sessionRoutes");
const progressRoutes = require("./Parshvi/routes/progressRoutes");

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

