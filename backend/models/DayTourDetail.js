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

  aboutParagraphs: [String], // 2 paragraphs

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
});

module.exports = mongoose.model("DayTourDetail", DayTourDetailSchema);
