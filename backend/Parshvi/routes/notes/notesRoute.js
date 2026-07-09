const express = require("express");
const router = express.Router();

const notesController = require("../../controllers/notes");
const upload = require("../../middleware/upload");

router.post("/", upload.single('file'), notesController.create);
router.get("/", notesController.read);
router.put("/:id", notesController.update);
router.delete("/:id", notesController.delete);

module.exports = router;