const express = require("express");
const router = express.Router();

const notesController = require("../../controllers/notes");
const upload = require("../../middleware/upload");
const auth = require("../../../vignesh/middleware/auth");

router.post("/", auth, upload.single('file'), notesController.create);
router.get("/", auth, notesController.read);
router.put("/:id", auth, notesController.update);
router.delete("/:id", auth, notesController.delete);

module.exports = router;