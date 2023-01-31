const express = require("express");
const router = express();

const usersController = require("../controllers/usersController");

router.get("/", usersController.get);
router.get("/:id", usersController.getDetail);

module.exports = router;
