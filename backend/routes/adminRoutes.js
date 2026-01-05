const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const AllowedSection = require("../models/AllowedSection");
const Notification = require("../models/Notification");

// GET sections allowed for this admin
router.get("/sections", adminAuth, async (req, res) => {
  const sections = await AllowedSection.find({
    admins: req.admin._id,
    active: true,
  });
  res.json(sections);
});

// POST notification when admin edits content
router.post("/notifications", adminAuth, async (req, res) => {
    const { section, action, message } = req.body;
  
    if (!section || !action) {
      return res.status(400).json({ message: "Missing fields" });
    }
  
    const notification = await Notification.create({
      section,
      action,
      message,
      admin: req.admin._id,
      type: "request",
    });
  
    res.json(notification);
  });  

module.exports = router;
