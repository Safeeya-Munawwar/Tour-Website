const express = require("express");
const router = express.Router();
const TourBooking = require("../models/TourBooking");
const adminAuth = require("../middleware/adminAuth");

// ---------------- CREATE BOOKING ----------------
router.post("/", async (req, res) => {
  try {
    const { tourType, tourId } = req.body;

    if (!tourType || !tourId) {
      return res.status(400).json({
        success: false,
        error: "tourType and tourId are required",
      });
    }

    const booking = new TourBooking({
      ...req.body,
      tourRef: tourType === "day" ? "DayTour" : "RoundTour",
    });

    await booking.save();

    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- GET ALL BOOKINGS (ADMIN) ----------------
router.get("/", adminAuth, async (req, res) => {
  try {
    const bookings = await TourBooking.find()
      .sort({ createdAt: -1 })
      .populate("tourId", "title location days itinerary"); // populate more fields if needed

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
