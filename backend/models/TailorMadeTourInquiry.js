const mongoose = require("mongoose");

const TailorMadeTourInquirySchema = new mongoose.Schema({
  title: String,
  fullName: String,
  nationality: String,
  email: String,
  phone: String,
  pickupLocation: String,
  dropLocation: String,
  startDate: { type: Date },
  endDate: { type: Date },
  travelers: Number,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "TailorMadeTourInquiry",
  TailorMadeTourInquirySchema
);
