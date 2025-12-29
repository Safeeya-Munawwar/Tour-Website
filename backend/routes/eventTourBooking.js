const express = require("express");
const router = express.Router();
const EventTourBooking = require("../models/EventTourBooking");
const adminAuth = require("../middleware/adminAuth"); // optional if you want admin auth
const sendEmail = require("../utils/mailer");

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

    // Populate eventId to get title, location, date
    await booking.populate("eventId");

    // Format date as YYYY-MM-DD
const formattedDate = booking.eventId?.date
? new Date(booking.eventId.date).toLocaleDateString("en-GB") // dd/mm/yyyy
: startDate;

    // ---------------- SEND EMAIL TO ADMIN ----------------
    const adminEmail = process.env.EMAIL_USER;
    const adminSubject = `New Event Booking: ${booking.eventId?.title || "Event"}`;
    const adminHtml = `
      <h2>New Event Booking Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event:</strong> ${booking.eventId?.title || "—"}</p>
      <p><strong>Location:</strong> ${booking.eventId?.location || "—"}</p>
      <p><strong>Date:</strong>${formattedDate}</p>
      <p><strong>Adults:</strong> ${adults || 1}</p>
      <p><strong>Children:</strong> ${children || 0}</p>
      <p><strong>Start Time:</strong> ${startTime}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;
    sendEmail({ to: adminEmail, subject: adminSubject, html: adminHtml });

    // ---------------- SEND EMAIL TO USER ----------------
    const userSubject = `Event Booking Received - Net Lanka Travels`;
    const userHtml = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5;">
        <h2 style="color: #0d203a;">Booking Received – Thank You!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for submitting your event booking request with <strong>Net Lanka Travels</strong>! We have received your request and our team will review it shortly. We will contact you to confirm your booking and provide further details.</p>

        <h3 style="color: #0d203a;">Your Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Event</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${booking.eventId?.title || "—"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Location</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${booking.eventId?.location || "—"}</td>
          </tr>
          <tr>
  <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Date</td>
  <td style="border: 1px solid #1a354e; padding: 8px;">${formattedDate}</td>
</tr>

          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Start Time</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${startTime}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Adults</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${adults || 1}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Children</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${children || 0}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Additional Message</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${message || "N/A"}</td>
          </tr>
        </table>

        <p style="margin-top: 15px;">If you have any questions, please reply to this email or call us at <strong>+94 771 234 567</strong>.</p>
        <p>We look forward to making your event experience unforgettable!</p>

        <p>Best Regards,<br/>
        <strong>Net Lanka Travels</strong></p>
      </div>
    `;
    sendEmail({ to: email, subject: userSubject, html: userHtml });

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
      error: error.message,
    });
  }
});

/* GET ALL EVENT BOOKINGS */
router.get("/", adminAuth, async (req, res) => {
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
router.put("/:id/status", adminAuth, async (req, res) => {
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
