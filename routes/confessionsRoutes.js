// confessionsRoutes.js

const express = require("express");
const router = express.Router();
const Confession = require("../models/confession");

// Define API route for submitting confessions
router.post("/", async (req, res) => {
    
  const confession = new Confession();

  confession.title = req.body.title,
  confession.body =req.body.body

  try {

    confession.save()
    .then(() => {
      res.json({ message: 'Confession created!' });
    })
    .catch((err) => {
      res.send(err);
    });
    // const createdConfession = await Confession.create({ confession });
    res.json(confession);
  } catch (err) {
    console.error("Failed to insert confession:", err);
    res.status(500).json({ error: "Failed to insert confession." });
  }
});

// Define API route for verifying confessions
router.post("/admin/verify", async (req, res) => {
  const { confessionId, password } = req.body;

  if (password !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const updatedConfession = await Confession.findByIdAndUpdate(
      confessionId,
      { verified: true },
      { new: true }
    );

    if (!updatedConfession) {
      res.status(404).json({ error: "Confession not found." });
      return;
    }

    res.json(updatedConfession);
  } catch (err) {
    console.error("Failed to verify confession:", err);
    res.status(500).json({ error: "Failed to verify confession." });
  }
});

// Define API route for retrieving verified confessions sent within the last 30 days
router.get("/last30days", async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const confessions = await Confession.find({
      timestamp: { $gte: thirtyDaysAgo },
      verified: true,
    });

    res.json(confessions);
  } catch (err) {
    console.error("Failed to retrieve confessions:", err);
    res.status(500).json({ error: "Failed to retrieve confessions." });
  }
});

// Define API route for retrieving unverified confessions sent within the last 30 days
router.get("/unverified", async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const confessions = await Confession.find({
      timestamp: { $gte: thirtyDaysAgo },
      verified: false,
    });

    res.json(confessions);
  } catch (err) {
    console.error("Failed to retrieve unverified confessions:", err);
    res
      .status(500)
      .json({ error: "Failed to retrieve unverified confessions." });
  }
});

// Define API route for retrieving a single confession by ID
router.get("/:id", async (req, res) => {
  const confessionId = req.params.id;

  try {
    const confession = await Confession.findById(confessionId);

    if (!confession) {
      res.status(404).json({ error: "Confession not found." });
      return;
    }

    res.json(confession);
  } catch (err) {
    console.error("Failed to retrieve confession:", err);
    res.status(500).json({ error: "Failed to retrieve confession." });
  }
});

module.exports = router;
