const mongoose = require("mongoose");

const RoundTourBookingSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "RoundTour", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  members: { type: Number, default: 1 },
  startDate: { type: String },
  startTime: { type: String },
  message: String,
  status: { type: String, enum: ["Pending", "Approved", "Cancelled", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RoundTourBooking", RoundTourBookingSchema);
