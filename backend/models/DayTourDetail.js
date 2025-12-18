const mongoose = require("mongoose");

const DayTourDetailSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DayTour",
    required: true,
  },

  heroImage: String,
  heroTitle: String,
  heroSubtitle: String,

  aboutParagraphs: [String],

  historyTitle: String,
  historyLeftList: [String],
  historyRightList: [String],

  gallerySlides: [
    {
      image: String,
      title: String,
      desc: String,
    },
  ],

  // ✅ New Fields
  highlights: [String],          // e.g., ["Galle Face Green", "Colombo Fort"]
  duration: String,              // e.g., "Full day"
  includes: [String],            // e.g., ["Transport", "Water Bottle", "King Coconut"]
  startLocation: String,         // e.g., "Colombo, Downsouth"
});

module.exports = mongoose.model("DayTourDetail", DayTourDetailSchema);
