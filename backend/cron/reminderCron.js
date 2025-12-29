const DayTourBooking = require("../models/DayTourBooking");
const RoundTourBooking = require("../models/RoundTourBooking");
const EventTourBooking = require("../models/EventTourBooking");
const { createDayBeforeReminder } = require("../utils/notification");

exports.checkBookings = async () => {
  try {
    const dayTours = await DayTourBooking.find();
    const roundTours = await RoundTourBooking.find();
    const eventTours = await EventTourBooking.find();

    for (const b of dayTours) await createDayBeforeReminder(b, "Day");
    for (const b of roundTours) await createDayBeforeReminder(b, "Round");
    for (const b of eventTours) await createDayBeforeReminder(b, "Event");

    console.log("Cron: Notifications checked");
  } catch (err) {
    console.error("Cron error:", err);
  }
};
