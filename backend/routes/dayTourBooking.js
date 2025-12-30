const express = require("express");
const router = express.Router();
const DayTourBooking = require("../models/DayTourBooking");
const adminAuth = require("../middleware/adminAuth");
const { createDayBeforeReminder } = require("../utils/notification");

// ---------------- CREATE BOOKING ----------------
router.post("/", async (req, res) => {
  try {
    const booking = await DayTourBooking.create(req.body);

   await createDayBeforeReminder(booking, "Day");
 // change "Day" to "Round" or "Event" for other routes

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});


// ---------------- GET ALL BOOKINGS ----------------
router.get("/", async (req, res) => {
  try {
    const bookings = await DayTourBooking.find()
      .populate("tourId", "title location")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- UPDATE STATUS ----------------
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await DayTourBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking)
      return res
        .status(404)
        .json({ success: false, error: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- DELETE BOOKING ----------------
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const booking = await DayTourBooking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, error: "Booking not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
