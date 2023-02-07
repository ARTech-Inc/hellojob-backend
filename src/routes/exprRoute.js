const express = require("express");
const router = express();

const exprController = require("../controllers/exprController");

router.post("/:id", exprController.addExp);

module.exports = router;
