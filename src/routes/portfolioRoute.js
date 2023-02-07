const express = require("express");
const router = express();
const formUpload = require("../helpers/formUpload");

const portfolioController = require("../controllers/portfolioController");

router.post(
  "/:id",
  formUpload.single("portfolio_image"),
  portfolioController.addPortfolio
);

module.exports = router;
