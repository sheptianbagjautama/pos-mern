require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const app = express();

const PORT = config.port
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the POS Backend" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
