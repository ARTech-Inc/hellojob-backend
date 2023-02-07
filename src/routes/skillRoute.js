const express = require("express");
const router = express();

const skillController = require("../controllers/skillController");

router.post("/:id", skillController.addSk);

module.exports = router;
