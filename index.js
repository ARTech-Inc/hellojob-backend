require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const router = require("./src/routes/index");
const { urlencoded, json } = require("body-parser");
const cors = require("cors");
// app.use(express.static("public"));
app.use(express.static("public/uploads/images"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api/v1", router);

app.get("*", (req, res) => {
  return res.status(404).send({ message: "Page Not Found" });
});

app.listen(port, () => {
  console.log(`HelloJob App Backend is running on port ${port}. Gasskann!!!`);
});
