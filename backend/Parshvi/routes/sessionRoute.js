const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/session");
const auth = require("../../vignesh/middleware/auth");

router.post("/", auth, sessionController.create);
router.get("/", sessionController.read);
router.put("/:id", auth, sessionController.update);
router.delete("/:id", auth, sessionController.delete);
router.put("/:id/join",auth, sessionController.join);

module.exports = router;