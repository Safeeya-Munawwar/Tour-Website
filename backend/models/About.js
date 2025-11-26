const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    subtitle: { type: String, default: "ABOUT NETLANKA TOURS" },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String }, // for READ MORE
    imageHeader: { type: String }, // '/images/about-header.jpg'
    imageFull: { type: String }, // '/images/about-desc.jpg'
    features: [
      {
        title: String,
        description: String,
        image: String,
      },
    ],
    teamMembers: [
      {
        name: String,
        role: String,
        image: String,
      },
    ],
    gallery: [String],
    cta: {
      text: String,
      buttonText: String,
      buttonLink: String,
      buttonIcon: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
