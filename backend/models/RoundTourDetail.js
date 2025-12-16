const mongoose = require("mongoose");

const RoundTourDetailSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "RoundTour", required: true },
  heroImage: String,
  heroTitle: String,
  heroSubtitle: String,
  highlights: [{ title: String, desc: String, image: String }],
  aboutParagraphs: [String],
  historyTitle: String,
  historyLeftList: [String],
  historyRightList: [String],
  itinerary: [{ day: Number, title: String, desc: String }],
  tourFacts: {
    duration: String,
    difficulty: String,
    groupSize: String,
    bestSeason: String,
    tourType: String,
    languages: String,
  },
  gallerySlides: [{ image: String, title: String, desc: String }],
}, { timestamps: true });

module.exports = mongoose.model("RoundTourDetail", RoundTourDetailSchema);
