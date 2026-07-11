const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes");
const auth = require("../../vignesh/middleware/auth");

router.post("/", auth, notesController.create);
router.get("/", auth, notesController.read);
router.put("/:id",auth,  notesController.update);
router.delete("/:id", auth, notesController.delete);

module.exports = router;