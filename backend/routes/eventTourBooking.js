const express = require("express");
const router = express.Router();
const EventTourBooking = require("../models/EventTourBooking");
const sendEmail = require("../utils/mailer");
const { createDayBeforeReminder } = require("../utils/notification");
const adminAuth = require("../middleware/adminAuth");

// Convert date to YYYY-MM-DD string
const getDateOnly = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// ---------------- CREATE EVENT BOOKING ----------------
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
      });
    }

    // Save booking
    const booking = new EventTourBooking({
      eventId,
      name,
      email,
      phone,
      adults: adults || 1,
      children: children || 0,
      startDate: new Date(startDate),
      startTime,
      message,
    });

    await booking.save();
    await booking.populate("eventId", "title location date");

    // ---------------- SEND EMAIL TO ADMIN ----------------
    const adminEmail = process.env.EMAIL_USER;
    const adminSubject = `New Event Booking`;
    const adminHtml = `
      <h2>New Event Booking Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event:</strong> ${booking.eventId?.title || "—"}</p>
      <p><strong>Location:</strong> ${booking.eventId?.location || "—"}</p>
      <p><strong>Date:</strong> ${getDateOnly(startDate)}</p>
      <p><strong>Time:</strong> ${startTime}</p>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children:</strong> ${children}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;
    await sendEmail({ to: adminEmail, subject: adminSubject, html: adminHtml });

    // ---------------- SEND EMAIL TO USER ----------------
    const userSubject = `Booking Received - Net Lanka Travels`;
    const userHtml = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5;">
        <h2 style="color: #0d203a;">Booking Received – Thank You!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for submitting your event booking request with <strong>Net Lanka Travels</strong>! We have received your request and will contact you shortly to confirm your booking.</p>

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
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Date & Time</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${getDateOnly(startDate)} at ${startTime}</td>
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
            <td style="border: 1px solid #1a354e; padding: 8px; font-weight: bold;">Additional Message</td>
            <td style="border: 1px solid #1a354e; padding: 8px;">${message || "N/A"}</td>
          </tr>
        </table>

        <p style="margin-top: 15px;">If you have any questions, please reply to this email or call us at <strong>+94 771 234 567</strong>.</p>
        <p>We look forward to making your event unforgettable!</p>

        <p>Best Regards,<br/>
        <strong>Net Lanka Travels</strong></p>
      </div>
    `;
    await sendEmail({ to: email, subject: userSubject, html: userHtml });

    // ---------------- CREATE DAY-BEFORE REMINDER ----------------
    await createDayBeforeReminder(booking, "Event");

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

// ---------------- GET ALL EVENT BOOKINGS ----------------
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

// ---------------- UPDATE BOOKING STATUS ----------------
router.patch("/:id", adminAuth, async (req, res) => {
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

// ---------------- DELETE EVENT BOOKING ----------------
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const booking = await EventTourBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
