const mongoose = require("mongoose");

const PopularSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  confession: { type: String, required: true },
  category: { type: String, required: true },
});

const PopularModel = mongoose.model("popular", PopularSchema);

module.exports = PopularModel;
