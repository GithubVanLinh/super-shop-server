const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = HistorySchema;
