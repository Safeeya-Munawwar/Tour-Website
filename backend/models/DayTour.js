const mongoose = require("mongoose");

const DayTourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true }, // Cloudinary image URL
});

module.exports = mongoose.model("DayTour", DayTourSchema);
