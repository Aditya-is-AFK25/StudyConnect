const express = require("express");
const path= require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
const PORT = process.env.PORT || 5000;

const notesRoutes = require("./parshvi/routes/notesRoute");
app.use("/notes", notesRoutes);
app.use("/api/notes", notesRoutes);

const groupRoutes = require("./parshvi/routes/groupRoute");
app.use("/api/groups",groupRoutes);

const sessionRoutes = require("./parshvi/routes/sessionRoute");
app.use("/api/sessions", sessionRoutes);

const progressRoutes = require("./parshvi/routes/progressRoute");
app.use("/api/progress", progressRoutes);

app.get("/", (req, res) => {
  res.send("StudyConnect backend is running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});