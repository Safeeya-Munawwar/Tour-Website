const mongoose = require("mongoose");

const SuperAdminNotificationSchema = new mongoose.Schema(
  {
    sections: [String],
    action: String,
    message: String,
    priority: String,

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    status: {
      type: String,
      default: "done",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SuperAdminNotification",
  SuperAdminNotificationSchema
);
