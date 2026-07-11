const express = require("express");
const router = express.Router();

const notesController = require("../../controllers/notes");
const upload = require("../../middleware/upload");
const auth = require("../../../vignesh/middleware/auth");

// POST requires auth so uploadedBy and groupId can be trusted
router.post("/", auth, upload.single('file'), notesController.create);
router.get("/", notesController.read);
router.put("/:id", auth, notesController.update);
router.delete("/:id", auth, notesController.delete);

module.exports = router;