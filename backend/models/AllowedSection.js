const mongoose = require("mongoose");

const AllowedSectionSchema = new mongoose.Schema({
  section: { type: String, required: true }, // e.g., "Home Content", "Blogs"
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }], // admins allowed
  active: { type: Boolean, default: true }, // toggle on/off
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.AllowedSection || mongoose.model("AllowedSection", AllowedSectionSchema);
