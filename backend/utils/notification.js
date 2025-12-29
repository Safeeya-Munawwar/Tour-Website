const AdminNotification = require("../models/AdminNotification");

const getDateOnly = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

exports.createDayBeforeReminder = async (booking, type = "Custom") => {
  try {
    if (!booking?.startDate) return;

    const bookingDate = getDateOnly(booking.startDate);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = getDateOnly(tomorrow);

    if (bookingDate.getTime() !== tomorrowDate.getTime()) return;

    const exists = await AdminNotification.findOne({
      bookingId: booking._id,
      bookingType: type,
    });

    if (!exists) {
      await AdminNotification.create({
        title: "Tour Reminder",
        message: `${type} tour booked by ${booking.name} is scheduled for tomorrow.`,
        bookingId: booking._id,
        bookingType: type,
      });
    }
  } catch (err) {
    console.error("Notification error:", err);
  }
};
