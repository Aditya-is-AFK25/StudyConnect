const express = require("express");
const path= require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
const PORT = process.env.PORT || 5001;

const notesRoutes = require("./Parshvi/routes/notesRoute");
app.use("/api/notes", notesRoutes);

const groupRoutes = require("./Parshvi/routes/groupRoute");
app.use("/api/groups",groupRoutes);

const sessionRoutes = require("./Parshvi/routes/sessionRoute");
app.use("/api/sessions", sessionRoutes);

const progressRoutes = require("./Parshvi/routes/progressRoute");
app.use("/api/progress", progressRoutes);

const googleRoutes = require("./Parshvi/routes/googleRoute");
app.use("/api/google", googleRoutes);

app.get("/", (req, res) => {
  res.send("StudyConnect backend is running");
});
app.get("/test-google", (req, res) => {
  res.send("THIS IS THE CORRECT SERVER.JS");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});