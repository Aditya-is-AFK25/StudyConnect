const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group");
const auth = require("../../vignesh/middleware/auth");

router.post("/", auth, groupController.create);
router.get("/", auth, groupController.read);
router.post("/:id/join", auth, groupController.join);
router.post("/:id/leave", auth, groupController.leave);
router.get("/:id/members", auth, groupController.members);
router.get("/:id/messages", auth, groupController.getMessages);
router.post("/:id/messages", auth, groupController.postMessage);
router.put("/:id", auth, groupController.update);
router.delete("/:id", auth, groupController.delete);

module.exports = router;