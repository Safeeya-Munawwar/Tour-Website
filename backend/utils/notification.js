// utils/notification.js
const AdminNotification = require("../models/AdminNotification");
const TourBooking = require("../models/TourBooking");
const { getDateOnly } = require("./date");

// Create day-before notification for a single booking
exports.createDayBeforeReminder = async (booking) => {
  try {
    const bookingDate = getDateOnly(booking.startDate);

    const tomorrow = getDateOnly(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (bookingDate.getTime() === tomorrow.getTime()) {
      const exists = await AdminNotification.findOne({ bookingId: booking._id });
      if (!exists) {
        await AdminNotification.create({
          title: "Tour Reminder",
          message: `Tour booked by ${booking.name} is scheduled for tomorrow.`,
          bookingId: booking._id,
          bookingType: "Custom",
        });
      }
    }
  } catch (err) {
    console.error("Notification creation error:", err);
  }
};

// Check all bookings for tomorrow
exports.checkBookings = async () => {
  try {
    const bookings = await TourBooking.find();
    for (const b of bookings) await exports.createDayBeforeReminder(b);
    console.log("Cron: Notifications checked");
  } catch (err) {
    console.error("Cron error:", err);
  }
};
