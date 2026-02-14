const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String
});

module.exports = mongoose.model("Pizza", pizzaSchema);
