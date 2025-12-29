const express = require("express");
const router = express.Router();
const DayTourBooking = require("../models/DayTourBooking");
const adminAuth = require("../middleware/adminAuth");
const sendEmail = require("../utils/mailer");
const { createDayBeforeReminder } = require("../utils/notification");

// ---------------- CREATE DAY TOUR BOOKING ----------------
router.post("/", async (req, res) => {
  try {
    const {
      tourId,
      name,
      email,
      phone,
      adults,
      children,
      pickupLocation,
      startDate,
      startTime,
      message,
    } = req.body;

    if (!tourId || !name || !phone || !startDate) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing",
      });
    }

    // ---------------- SAVE BOOKING ----------------
    const booking = await DayTourBooking.create(req.body);

    // Populate tour details
    await booking.populate("tourId");

    // ---------------- CREATE DAY-BEFORE REMINDER ----------------
    await createDayBeforeReminder(booking, "Day");

    // ---------------- SEND EMAIL TO ADMIN ----------------
    const adminEmail = process.env.EMAIL_USER;

    const adminSubject = "New Day Tour Booking";
    const adminHtml = `
      <h2>New Day Tour Booking Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email || "Not provided"}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Tour:</strong> ${booking.tourId?.title || "—"}</p>
      <p><strong>Location:</strong> ${booking.tourId?.location || "—"}</p>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children:</strong> ${children}</p>
      <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
      <p><strong>Date & Time:</strong> ${startDate} at ${startTime}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;

    await sendEmail({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
    });

    // ---------------- SEND EMAIL TO USER (OPTIONAL) ----------------
    if (email && email.trim() !== "") {
      const userSubject = "Booking Received - Net Lanka Travels";

      const userHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>Booking Received – Thank You!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>We have received your day tour booking request. Our team will contact you shortly.</p>

          <h3>Your Booking Details</h3>
          <ul>
            <li><strong>Tour:</strong> ${booking.tourId?.title || "—"}</li>
            <li><strong>Date:</strong> ${startDate}</li>
            <li><strong>Time:</strong> ${startTime}</li>
            <li><strong>Pickup:</strong> ${pickupLocation}</li>
            <li><strong>Adults:</strong> ${adults}</li>
            <li><strong>Children:</strong> ${children}</li>
          </ul>

          <p>Best Regards,<br/><strong>Net Lanka Travels</strong></p>
        </div>
      `;

      await sendEmail({
        to: email,
        subject: userSubject,
        html: userHtml,
      });
    }

    return res.status(201).json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("Day Tour Booking Error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// ---------------- GET ALL BOOKINGS (ADMIN) ----------------
router.get("/", adminAuth, async (req, res) => {
  try {
    const bookings = await DayTourBooking.find()
      .populate("tourId", "title location")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- UPDATE STATUS ----------------
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const booking = await DayTourBooking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- DELETE BOOKING ----------------
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const booking = await DayTourBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
