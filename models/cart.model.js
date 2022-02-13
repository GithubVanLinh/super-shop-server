const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = CartSchema;
