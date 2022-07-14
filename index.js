const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ConfessionsModel = require("./models/Confessions");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://george:chakama@ac-xaiwvv6-shard-00-00.vscsf1s.mongodb.net:27017,ac-xaiwvv6-shard-00-01.vscsf1s.mongodb.net:27017,ac-xaiwvv6-shard-00-02.vscsf1s.mongodb.net:27017/?ssl=true&replicaSet=atlas-ee85j1-shard-0&authSource=admin&retryWrites=true&w=majority"
);

// Getting Request
app.get("/", (req, res) => {
  // Sending the response
  res.send("Hello World!❤..");

  // Ending the response
  res.end();
});

// Establishing the port
const PORT = process.env.PORT || 3002;

app.post("/createConfession", async (req, res) => {
  const confession = req.body;
  const newConfession = new ConfessionsModel(confession);
  await newConfession.save();

  res.json(confession);
});
app.delete("/deleteConfession", (req, res) => {
  const confessionId = req.body;
  ConfessionsModel.deleteOne({ confessionId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
// app.delete("/cars/:id", async (req, res) => {
//   const confessionId = req.params.id;
//   const query = { _id: ObjectId(confessionId) };
//   const result = await ConfessionsModel.deleteOne(query);
//   res.send(result);
// });

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
