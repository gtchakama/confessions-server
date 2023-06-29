// server.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Connect to MongoDB
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3002;

    const confessionRoutes = require("./routes/confessionsRoutes");

app.use("/confessions", confessionRoutes);


    // Start the server
    app.listen(PORT, console.log(`Server started on port... ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

