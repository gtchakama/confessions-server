const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
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
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// Establishing the port
const PORT = process.env.PORT || 3002;

app.post("/createConfession", async (req, res) => {
  const confession = req.body;
  const newConfession = new ConfessionsModel(confession);
  await newConfession.save();

  res.json(confession);
});
/**
 * /api/deleteConfession/:id
 * DELETE Single Confession
 */

app.delete("/deleteConfession/:id", async (req, res) => {
  let paramID = req.params.id;
  const data = await ConfessionsModel.deleteOne({ _id: paramID });
  res.send(data);
});

app.get("/getConfessions", (req, res) => {
  ConfessionsModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
// // listening
// app.listen(3001, () => {
//   console.log(`listening on 3001..`);
// });
// Executing the server on given port number
app.listen(PORT, console.log(`Server started on port ${PORT}`));
