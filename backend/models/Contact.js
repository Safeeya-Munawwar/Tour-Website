const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    phones: { type: [String], default: ["+94 XXX XXX XXX"] },
    emails: { type: [String], default: ["example@gmail.com"] },
    offices: [
      {
        name: { type: String, default: "Head Office" },
        address: { type: String, default: "Address here" },
        coords: { type: [Number], default: [0, 0] },
      },
    ],
    workingHours: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "17:00" },
    },
    socialMedia: [
      {
        platform: { type: String },
        icon: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
