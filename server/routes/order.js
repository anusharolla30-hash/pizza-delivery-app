const router = require("express").Router();
const Order = require("../models/order");

// Place Order
router.post("/place", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order Placed Successfully" });
});

// Get All Orders (Admin)
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update Order Status
router.put("/update/:id", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Status Updated" });
});

module.exports = router;
