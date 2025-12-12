const express = require("express");
const router = express.Router();
const DayTourBooking = require("../models/DayTourBooking");

// ---------------- CREATE BOOKING ----------------
router.post("/", async (req, res) => {
  try {
    const booking = new DayTourBooking(req.body);
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- GET ALL BOOKINGS ----------------
// GET: fetch all bookings with tour info
router.get("/", async (req, res) => {
  try {
    // Populate tourId to get title & location
    const bookings = await DayTourBooking.find()
      .populate("tourId", "title location") // select only title and location
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- UPDATE STATUS ----------------
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await DayTourBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // <- this is important!
    );
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- DELETE BOOKING ----------------
router.delete("/:id", async (req, res) => {
  try {
    const booking = await DayTourBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
