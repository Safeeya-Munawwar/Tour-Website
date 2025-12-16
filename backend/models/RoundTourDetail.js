const mongoose = require("mongoose");

const RoundTourDetailSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoundTour",
    required: true,
    unique: true,
  },

  /* HERO */
  heroImage: String,
  heroTitle: String,
  heroSubtitle: String,

  /* HIGHLIGHTS */
  highlights: [String],

  /* DAILY ITINERARY */
  itinerary: [
    {
      day: Number,
      title: String,
      desc: String,
      activities: [String],
    },
  ],

  /* INCLUSIONS / EXCLUSIONS / OFFERS */
  inclusions: [String],
  exclusions: [String],
  offers: [String],

  /* TOUR FACTS */
  tourFacts: {
    duration: String,
    difficulty: String,
    groupSize: String,
  },

  /* GALLERY */
  gallerySlides: [
    {
      image: String,
      title: String,
      desc: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("RoundTourDetail", RoundTourDetailSchema);
