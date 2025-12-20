require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const app = express();

const PORT = config.port;
connectDB();

//Middleware to parse JSON requests
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the POS Backend" });
});

//User Routes
app.use("/api/user", require("./routes/userRoute"))


//Global Errror Handler Middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
