const express = require("express");
const router = express.Router();
const TourBooking = require("../models/TourBooking");
const adminAuth = require("../middleware/adminAuth");
const sendEmail = require("../utils/mailer");

// ---------------- CREATE BOOKING ----------------
router.post("/", async (req, res) => {
  try {
<<<<<<< HEAD
    const booking = new TourBooking({
      ...req.body,
      startDate: new Date(req.body.startDate),
=======
    const {
      tourType,
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

    if (!tourType || !tourId || !name || !phone || !startDate) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing",
      });
    }

    // Save booking
    const booking = new TourBooking({
      ...req.body,
      tourRef: tourType === "day" ? "DayTour" : "RoundTour",
>>>>>>> 1a57cdd27f89d06ebd72c9fd89c32cce661e4a2c
    });

    await booking.save();

<<<<<<< HEAD
    await createDayBeforeReminder(booking);
=======
    // Populate tour info
    await booking.populate("tourId");
>>>>>>> 1a57cdd27f89d06ebd72c9fd89c32cce661e4a2c

    // ---------------- SEND EMAIL TO ADMIN ----------------
    const adminEmail = process.env.EMAIL_USER;

    const adminSubject = `New ${tourType} Tour Booking`;
    const adminHtml = `
      <h2>New Tour Booking Received</h2>
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
        <div style="font-family: Arial; line-height: 1.6">
          <h2>Thank you for your booking!</h2>
          <p>Dear ${name},</p>
          <p>We have received your booking request. Our team will contact you shortly.</p>

          <h3>Your Booking Details</h3>
          <ul>
            <li><strong>Tour:</strong> ${booking.tourId?.title || "—"}</li>
            <li><strong>Date:</strong> ${startDate}</li>
            <li><strong>Time:</strong> ${startTime}</li>
            <li><strong>Pickup:</strong> ${pickupLocation}</li>
            <li><strong>Adults:</strong> ${adults}</li>
            <li><strong>Children:</strong> ${children}</li>
          </ul>

          <p>Regards,<br/><strong>Net Lanka Travels</strong></p>
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
<<<<<<< HEAD
    console.error("BOOKING ERROR:", err.message);
    res.status(400).json({
      success: false,
      error: err.message,
=======
    console.error("Booking Error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
>>>>>>> 1a57cdd27f89d06ebd72c9fd89c32cce661e4a2c
    });
  }
});

// ---------------- GET ALL BOOKINGS (ADMIN) ----------------
router.get("/", adminAuth, async (req, res) => {
  try {
    const bookings = await TourBooking.find()
      .sort({ createdAt: -1 })
      .populate("tourId", "title location days");

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------------- UPDATE BOOKING STATUS ----------------
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const booking = await TourBooking.findByIdAndUpdate(
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
    await TourBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
