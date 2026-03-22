// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/pizzaDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* =========================
   🍕 PIZZA MODEL
========================= */
const pizzaSchema = new mongoose.Schema({
  name: String,
  category: String,
  size: [String],
  price: Object,
  image: String,
  description: String
});

const Pizza = mongoose.model("Pizza", pizzaSchema, "pizzas");

/* =========================
   📦 ORDER MODEL
========================= */
const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

/* =========================
   🍕 PIZZA API
========================= */

// Get all pizzas
app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.json(pizzas);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* =========================
   📦 ORDER API
========================= */

// Place Order
app.post("/api/order", async (req, res) => {
  try {
    console.log("📦 Incoming Order:", req.body);

    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get All Orders (Admin)
app.get("/api/order", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update Order Status (Admin)
app.put("/api/order/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({ message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   🚀 SERVER START
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});