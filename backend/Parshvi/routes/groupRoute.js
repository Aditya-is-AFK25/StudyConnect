const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group");
const auth = require("../../vignesh/middleware/auth");

router.post("/",auth, groupController.create);
router.get("/", groupController.read);
router.put("/:id/join",auth, groupController.join);
router.put("/:id", auth, groupController.update);
router.delete("/:id", auth, groupController.delete);
module.exports = router;