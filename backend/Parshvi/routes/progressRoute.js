const express = require("express");
const router = express.Router();

const progressController = require("../controllers/progress");
const auth = require("../../vignesh/middleware/auth");

router.post("/", auth, progressController.create);
router.get("/", auth, progressController.read);
router.put("/:id", auth, progressController.update);
router.delete("/:id", auth, progressController.delete);

module.exports = router;