const express = require("express");
const router = express.Router();
const TourBooking = require("../models/TourBooking");
const adminAuth = require("../middleware/adminAuth");
const { createDayBeforeReminder } = require("../utils/notification");

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new TourBooking({
      ...req.body,
      startDate: new Date(req.body.startDate),
    });

    await booking.save();

    await createDayBeforeReminder(booking);

    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error("BOOKING ERROR:", err.message);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// ---------------- GET ALL BOOKINGS (ADMIN) ----------------
router.get("/", adminAuth, async (req, res) => {
  try {
    const bookings = await TourBooking.find()
      .sort({ createdAt: -1 })
      .populate("tourId", "title location days itinerary");

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- UPDATE BOOKING STATUS ----------------
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await TourBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- DELETE BOOKING ----------------
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await TourBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
