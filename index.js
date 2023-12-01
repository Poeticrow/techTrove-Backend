const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
// FUNCTION CALLS
const app = express();
app.use(express.json());
connectDB();
dotenv.config();

const port = process.env.PORT || 8080;

// TEST ENDPOINT
app.get("/api/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to my backend App",
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific HTTP headers
  next();
});

app.use("/api", productRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
