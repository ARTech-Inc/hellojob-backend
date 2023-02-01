const express = require("express");
const router = express();
const verifyToken = require('../../helper/verifyToken')

const usersController = require("../controllers/usersController");

router.get("/", usersController.get);
router.get("/:id", usersController.getDetail);
router.patch("/:id",verifyToken, usersController.update);
router.post("/",verifyToken, usersController.add);
router.delete("/:id",verifyToken, usersController.remove);

module.exports = router;
