const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  desc: { type: String }, // short description
  img: { type: String, required: true }, // main image
});

module.exports = mongoose.model("Event", EventSchema);
