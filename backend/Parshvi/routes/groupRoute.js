const express = require("express");
const router = express.Router();

const create = require("../controllers/group/create");

router.post("/",create);
module.exports = router;