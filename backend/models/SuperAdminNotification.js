// models/SuperAdminNotification.js
const mongoose = require("mongoose");

const SuperAdminNotificationSchema = new mongoose.Schema(
  {
    sections: [String],
    action: String,
    message: String,
    priority: { type: String, default: "medium" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    superAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    status: { type: String, default: "pending" }, // admin status
    readBySuperAdmin: { type: Boolean, default: false }, // NEW FIELD
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SuperAdminNotification",
  SuperAdminNotificationSchema
);
