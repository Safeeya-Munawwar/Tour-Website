const express = require("express");
const router = express.Router();
const RoundTourBooking = require("../models/RoundTourBooking");
const adminAuth = require("../middleware/adminAuth");

// POST: create booking
router.post("/", async (req, res) => {
  try {
    const booking = new RoundTourBooking(req.body);
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET: fetch all bookings with tour info
router.get("/", async (req, res) => {
  try {
    const bookings = await RoundTourBooking.find()
      .sort({ createdAt: -1 })
      .populate("tourId", "title location"); 

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// PATCH: update status
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await RoundTourBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// DELETE: delete booking
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await RoundTourBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
