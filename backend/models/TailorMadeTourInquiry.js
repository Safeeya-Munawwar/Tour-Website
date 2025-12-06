const mongoose = require("mongoose");

const TailorMadeTourInquirySchema = new mongoose.Schema({
  title: String,
  fullName: String,
  nationality: String,
  email: String,
  phone: String,
  destination: String,
  travelDates: String,
  travelers: Number,
  status: { type: String, enum: ["Pending","Approved","Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TailorMadeTourInquiry", TailorMadeTourInquirySchema);
