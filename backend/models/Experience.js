// models/Experience.js
const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  slug: String,
  title: String,
  subtitle: String,
  heroImg: String,
  mainImg: String,
  mainDesc: String,
  subDesc: String,
  subExperiences: [{ title: String, desc: String }],
  gallery: [String],
  tips: [String],
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
