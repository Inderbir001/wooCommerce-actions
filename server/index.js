const express = require("express");
const cors = require("cors");
require("dotenv").config;

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

//Test Route
app.get("/", (req, res) => {
  res.send("Api running ...");
});

//Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
