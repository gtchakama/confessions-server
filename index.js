const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PopularModel = require("./models/popular");
const ConfessionsModel = require("./models/Confessions");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://george:chakama@ac-xaiwvv6-shard-00-00.vscsf1s.mongodb.net:27017,ac-xaiwvv6-shard-00-01.vscsf1s.mongodb.net:27017,ac-xaiwvv6-shard-00-02.vscsf1s.mongodb.net:27017/?ssl=true&replicaSet=atlas-ee85j1-shard-0&authSource=admin&retryWrites=true&w=majority"
);

// Getting Request
app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// Establishing the port
const PORT = process.env.PORT || 3002;
/**
 * /api/createConfession
 * Create a Single Confession
 * Client Side
 */
app.post("/api/createConfession", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const confession = req.body;
  const newConfession = new ConfessionsModel(confession);
  await newConfession.save();

  res.json(confession);
});
/**
 * /api/SendPopular
 * Create a Single Confession
 * Admin Side
 */
app.post("/api/SendPopular", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const confession = req.body;
  const newConfession = new PopularModel(confession);
  await newConfession.save();

  if (res.statusCode === 200) {
    res.json(confession);
  } else {
    res.json({ err: "Error creating new Popular Confession" });
  }
});

/**
 * /api/deleteConfession/:id
 * Create a Single Confession
 * Admin Side
 */

app.delete("/api/deleteConfession/:id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let paramID = req.params.id;
  const data = await ConfessionsModel.deleteOne({ _id: paramID });
  res.send(data);
});

/**
 * /api/getConfessions
 * Get a Single Confession
 * Client Side
 */

app.get("/api/getConfessions", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  ConfessionsModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

/**
 * /api/getConfessions
 * Get popular Confessions
 * Client Side
 */

app.get("/api/getpopularConfessions", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  PopularModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
// Executing the server on given port number
app.listen(PORT, console.log(`Server started on port ${PORT}`));
