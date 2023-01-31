const express = require("express");
const router = express();

const usersController = require("../controllers/usersController");

router.get("/", usersController.get);
router.get("/:id", usersController.getDetail);
router.patch("/:id", usersController.update);
router.post("/", usersController.add);
router.delete("/:id", usersController.remove);

module.exports = router;
