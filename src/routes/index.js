const express = require("express");
const router = express();
const usersRoute = require("./usersRoute");

router.get("/", (req, res) => {
  res.send("HelloJob App Backend");
});

// router.use("/users", verifyToken, usersRoute);
router.use("/users", usersRoute);

module.exports = router;
