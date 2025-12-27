const express = require("express");
const router = express.Router();
const EventTourBooking = require("../models/EventTourBooking");

/* CREATE EVENT BOOKING */
router.post("/", async (req, res) => {
  try {
    const {
      eventId,
      name,
      email,
      phone,
      adults,
      children,
      startDate,
      startTime,
      message,
    } = req.body;

    // Validate required fields
    if (!eventId || !name || !email || !phone || !startDate || !startTime) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
        bodyReceived: req.body, // for debugging
      });
    }

    const booking = new EventTourBooking({
      eventId,
      name,
      email,
      phone,
      adults: adults || 1,
      children: children || 0,
      startDate,
      startTime,
      message,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Event booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Event booking error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message, // detailed error
    });
  }
});

/* GET ALL EVENT BOOKINGS */
router.get("/", async (req, res) => {
  try {
    const bookings = await EventTourBooking.find()
      .populate("eventId", "title location date")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* UPDATE BOOKING STATUS */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await EventTourBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
