const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// ✅ Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Place order
router.post("/", async (req, res) => {
  try {
    console.log("📦 Incoming Order:", req.body); // 👈 ADD THIS

    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json({ message: "Order placed" });
  } catch (error) {
    console.error("❌ ERROR:", error); // 👈 ADD THIS
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update order status
router.put("/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;