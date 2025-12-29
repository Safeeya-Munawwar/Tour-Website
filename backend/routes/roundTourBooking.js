const express = require("express");
const router = express.Router();
const RoundTourBooking = require("../models/RoundTourBooking");
const adminAuth = require("../middleware/adminAuth");
const AdminNotification = require("../models/AdminNotification");

// Convert date to YYYY-MM-DD string in local time
const getDateOnly = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// Create day-before reminder
const createDayBeforeReminder = async (booking, type) => {
  const bookingDateStr = getDateOnly(booking.startDate);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = getDateOnly(tomorrow);

  if (bookingDateStr === tomorrowStr) {
    const exists = await AdminNotification.findOne({ bookingId: booking._id });
    if (!exists) {
      await AdminNotification.create({
        title: "Tour Reminder",
        message: `${type} tour booked by ${booking.name} is scheduled for tomorrow.`,
        bookingId: booking._id,
        bookingType: type,
      });
    }
  }
};

// POST: create booking
router.post("/", async (req, res) => {
  try {
    const booking = new RoundTourBooking(req.body);
    await booking.save();

    // Create day-before reminder
    await createDayBeforeReminder(booking, "Round");

    res.status(201).json({ success: true, booking });
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
    const booking = await RoundTourBooking.findByIdAndUpdate(
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
