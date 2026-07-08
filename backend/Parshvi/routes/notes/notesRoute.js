const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes");

router.post("/", notesController.create);
router.get("/", notesController.read);
router.put("/:id", notesController.update);
router.delete("/:id", notesController.delete);

module.exports = router;