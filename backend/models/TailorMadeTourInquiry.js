const mongoose = require("mongoose");

const TailorMadeTourInquirySchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  tourType: {
    type: String,
    enum: ["Budget", "Luxury"],
    default: "Budget",
    required: true,
  },  

  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  adults: { type: Number, required: true },
  children: { type: Number },

  selectedDestinations: {
    type: [String],
    default: [],
  },

  selectedExperiences: {
    type: [String],
    default: []
  },
  
  travelStyle: {
    type: String,
    default: null
  },
  
  budget: {
    type: Number,
    default: null,
  },

  currency: {
    type: String,
    default: "No Idea",
  },

  notes: {
    type: String,
    default: "",
  },

  hearAboutUs: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "TailorMadeTourInquiry",
  TailorMadeTourInquirySchema
);
