const express = require("express");
const router = express();

const authController = require("../controllers/authController");
const formUpload = require("../helpers/formUpload");

// router.post("/register", formUpload.array("ava"), authController.register);
router.post("/register", formUpload.single("ava"), authController.register);
router.post("/login", authController.login);

module.exports = router;
