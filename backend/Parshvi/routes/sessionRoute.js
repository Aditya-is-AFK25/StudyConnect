const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/session");
const auth = require("../../vignesh/middleware/auth");

router.post("/", auth, sessionController.create);
router.get("/", auth, sessionController.read);
router.put("/:id", auth, sessionController.update);
router.delete("/:id", auth, sessionController.delete);
// Single standard join/RSVP endpoint — POST /:id/join
router.post("/:id/join", auth, sessionController.join);

module.exports = router;