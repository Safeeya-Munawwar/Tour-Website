const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  section: { type: String, required: true },

  action: {
    type: String,
    enum: ["add", "edit", "delete"],
    required: true,
  },

  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  superAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" },

  message: { type: String },

  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
