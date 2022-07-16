const mongoose = require("mongoose");

const ConfessionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  confession: { type: String, required: true },
});

const ConfessionsModel = mongoose.model("confessions", ConfessionsSchema);

module.exports = ConfessionsModel;
