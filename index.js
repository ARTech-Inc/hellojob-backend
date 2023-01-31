require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const router = require("./src/routes/index");

app.use("/api/v1", router);

app.get("*", (req, res) => {
  return res.status(404).send({ message: "Page Not Found" });
});

app.listen(port, () => {
  console.log(`HelloJob App Backend is running on port ${port}. Gasskann!!!`);
});
