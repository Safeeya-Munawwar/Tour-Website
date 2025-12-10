const mongoose = require("mongoose");

const ContactFormSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  rating: { type: Number },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ContactForm || mongoose.model("ContactForm", ContactFormSchema);
