const mongoose = require("mongoose");

const DayTourBookingSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "DayTour", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  pickupLocation: { type: String },

  members: { type: Number, default: 1 },
  startDate: { type: String },
  startTime: { type: String },
  message: String,
  status: { type: String, enum: ["Pending", "Approved", "Cancelled", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

// Optional: auto calculate members
DayTourBookingSchema.pre("save", function (next) {
  this.members = (this.adults || 0) + (this.children || 0);
  next();
});

module.exports = mongoose.model("DayTourBooking", DayTourBookingSchema);
