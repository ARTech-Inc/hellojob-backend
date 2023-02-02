const express = require("express");
const router = express();
const multer = require ('multer')
const verifyToken = require("../helpers/verifyToken");
const formUpload = require('../helpers/formUpload')

const usersController = require("../controllers/usersController");

router.get("/", usersController.get);
router.get("/:id", usersController.getDetail);
router.patch("/:id", formUpload.single('ava'), usersController.update);
router.post("/", formUpload.single('ava'), usersController.add);
router.delete("/:id", formUpload.single('ava'), usersController.remove);
router.post("/:id", usersController.addExpr);

module.exports = router;
