const mongoose = require("mongoose");

const impactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // can be paragraph or full text
  images: [{ type: String }], // multiple images per impact
});

const communitySchema = new mongoose.Schema({
  impacts: [impactSchema],
  description: { type: String },
});

module.exports = mongoose.model("CommunityImpact", communitySchema);
