// require mongoose
const mongoose = require("mongoose");
const CartSchema = require("./cart.model");

// define User Schema
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    type: [CartSchema],
    required: true,
    default: [],
  },
  phone_number: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: false,
  },
  refresh_token: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "deleted"],
    default: "active",
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

// export User model
module.exports = mongoose.model("User", UserSchema);
