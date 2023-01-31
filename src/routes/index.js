const express = require("express");
const router = express();
const usersRoute = require("./usersRoute");
const authRoute = require("./authRoute");

router.get("/", (req, res) => {
  res.send("HelloJob App Backend");
});

// router.use("/users", verifyToken, usersRoute);
router.use("/users", usersRoute);
router.use("/auth", authRoute);

module.exports = router;
