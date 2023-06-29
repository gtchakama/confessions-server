// confession.js

const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema({
  title: {type : String, required: true},
  body:  {type : String, required: true},
  verified: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Confession = mongoose.model("Confession", confessionSchema);

module.exports = Confession;
