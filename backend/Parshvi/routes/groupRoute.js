const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group");

router.post("/", groupController.create);
router.get("/", groupController.read);
// router.put("/:id", notesController.update);
// router.delete("/:id", notesController.delete);

module.exports = router;