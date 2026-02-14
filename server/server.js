// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/pizzaDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Pizza Schema
const pizzaSchema = new mongoose.Schema({
  name: String,
  category: String,
  size: [String],
  price: Object,
  image: String,
  description: String
});

const Pizza = mongoose.model("Pizza", pizzaSchema, "pizzas");

// API endpoint
app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.json(pizzas);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
