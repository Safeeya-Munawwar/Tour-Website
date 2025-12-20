const express = require("express");
const ContactForm = require("../models/ContactForm");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// POST a new form submission
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, rating, message } = req.body;

    const newForm = new ContactForm({
      firstName,
      lastName,
      email,
      rating,
      message,
    });
    await newForm.save();

    res
      .status(201)
      .json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all form submissions
router.get("/", async (req, res) => {
  try {
    const forms = await ContactForm.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a form submission by ID
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await ContactForm.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
