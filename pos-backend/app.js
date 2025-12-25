require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const PORT = config.port;
connectDB();

//Enable CORS
app.use(cors({
  credentials:true, // Allow cookies to be sent in cross-origin requests
  origin:['http://localhost:5173']
}));
//Middleware to parse JSON requests
app.use(express.json());
//Middleware to parse cookies
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the POS Backend" });
});

//User Routes
app.use("/api/user", require("./routes/userRoute"));
//Order Routes
app.use("/api/order", require("./routes/orderRoute"));
//Table Routes
app.use("/api/table", require("./routes/tableRoute"));

//Global Errror Handler Middleware
app.use(globalErrorHandler);

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
