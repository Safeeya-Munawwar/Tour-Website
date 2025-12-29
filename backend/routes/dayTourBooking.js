const express = require("express");
const router = express.Router();
const DayTourBooking = require("../models/DayTourBooking");
const adminAuth = require("../middleware/adminAuth");
const sendEmail = require("../utils/mailer");
const { createDayBeforeReminder } = require("../utils/notification");

// ---------------- CREATE BOOKING ----------------
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

    if (!tourId) {
      return res.status(400).json({
        success: false,
        error: "tourId is required",
      });
    }

    const booking = new DayTourBooking(req.body);
    await booking.save();

    // Populate tourId to get title and location
    await booking.populate("tourId");

    // ---------------- SEND EMAIL TO ADMIN ----------------
    const adminEmail = process.env.EMAIL_USER;
    const adminSubject = `New Day Tour Booking`;
    const adminHtml = `
      <h2>New Day Tour Booking Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Tour:</strong> ${booking.tourId?.title || "—"}</p>
      <p><strong>Location:</strong> ${booking.tourId?.location || "—"}</p>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children:</strong> ${children}</p>
      <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
      <p><strong>Date & Time:</strong> ${startDate} at ${startTime}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;
    sendEmail({ to: adminEmail, subject: adminSubject, html: adminHtml });

    // ---------------- SEND EMAIL TO USER ----------------
    const userSubject = `Booking Received - Net Lanka Travels`;
    const userHtml = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5;">
        <h2 style="color: #0d203a;">Booking Received – Thank You!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for submitting your day tour booking request with <strong>Net Lanka Travels</strong>! We have received your request and our team will review it shortly. We will contact you to confirm your booking and provide further details.</p>

        <h3 style="color: #0d203a;">Your Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Tour</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${
              booking.tourId?.title || "—"
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Adults</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${adults}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Children</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${children}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Pickup Location</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${pickupLocation}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Pickup Date & Time</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${startDate} at ${startTime}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Additional Message</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${
              message || "N/A"
            }</td>
          </tr>
        </table>

        <p style="margin-top: 15px;">If you have any questions, please reply to this email or call us at <strong>+94 771 234 567</strong>.</p>
        <p>We look forward to making your Sri Lankan day tour unforgettable!</p>

        <p>Best Regards,<br/>
        <strong>Net Lanka Travels</strong></p>
      </div>
    `;
    sendEmail({ to: email, subject: userSubject, html: userHtml });

    res.json({ success: true, booking });

    const booking = await DayTourBooking.create(req.body);

    // Call notification helper
    await createDayBeforeReminder(booking, "Day"); // change "Day" to "Round" or "Event" for other routes
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GET ALL BOOKINGS ----------------
router.get("/", adminAuth, async (req, res) => {
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
