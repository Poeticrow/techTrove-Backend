const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const productRoutes = require("./routes/productRoutes");
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

app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
