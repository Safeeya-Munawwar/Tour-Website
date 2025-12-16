const mongoose = require("mongoose");

const TourBookingSchema = new mongoose.Schema(
  {
    tourType: {
      type: String,
      enum: ["day", "round"],
      required: true,
    },

    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "tourRef",
    },

    tourRef: {
      type: String,
      required: true,
      enum: ["DayTour", "RoundTour"],
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    members: { type: Number, default: 1 },
    startDate: String,
    startTime: String,
    message: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourBooking", TourBookingSchema);
