require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
    .connect("mongodb://127.0.0.1:27017/studyconnect")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const authRoutes = require("./vignesh/routes/authRoutes");
const matchRoutes = require("./vignesh/routes/matchRoutes");

const notesRoutes = require("./Parshvi/routes/notesRoute");
const groupRoutes = require("./Parshvi/routes/groupRoute");
const sessionRoutes = require("./Parshvi/routes/sessionRoute");
const progressRoutes = require("./Parshvi/routes/progressRoute");
const googleRoutes = require("./Parshvi/routes/googleRoute");

app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/google", googleRoutes);

app.get("/", (req, res) => {
    res.send("StudyConnect backend is running");
});

app.get("/test-google", (req, res) => {
    res.send("TEST GOOGLE WORKING");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});