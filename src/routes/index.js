const express = require("express");
const router = express();
const usersRoute = require("./usersRoute");
const authRoute = require("./authRoute");
const skillRoute = require("./skillRoute");
const experienceRoute = require("./exprRoute");
const portfolioRoute = require("./portfolioRoute");

router.get("/", (req, res) => {
  res.send("HelloJob App Backend");
});

// router.use("/users", verifyToken, usersRoute);
router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/addSkill", skillRoute);
router.use("/addExperience", experienceRoute);
router.use("/addPortfolio", portfolioRoute);

module.exports = router;
