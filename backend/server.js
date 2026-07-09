const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studyconnect')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./vignesh/routes/authRoutes');
const matchRoutes = require('./vignesh/routes/matchRoutes');
const notesRoutes = require('./Parshvi/routes/notes/notesRoute');

app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('StudyConnect backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
