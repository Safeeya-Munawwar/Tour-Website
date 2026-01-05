const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const AllowedSection = require("../models/AllowedSection");
const Notification = require("../models/Notification");
const Admin = require("../models/Admin");

// Middleware: SuperAdmin only
const superAdminOnly = async (req, res, next) => {
  await adminAuth(req, res, async () => {
    if (req.admin.role === "superadmin") next();
    else res.status(403).json({ message: "Forbidden: SuperAdmin only" });
  });
};

// GET all admins
router.get("/admins", superAdminOnly, async (req, res) => {
  const admins = await Admin.find().select("-password");
  res.json(admins);
});

// GET all allowed sections
router.get("/sections", superAdminOnly, async (req, res) => {
  const sections = await AllowedSection.find().populate("admins", "name email");
  res.json(sections);
});

// POST: add/edit allowed section
router.post("/sections", superAdminOnly, async (req, res) => {
  const { section, adminIds } = req.body;
  try {
    let sec = await AllowedSection.findOne({ section });
    if (sec) {
      sec.admins = adminIds;
      await sec.save();
    } else {
      sec = await AllowedSection.create({ section, admins: adminIds });
    }
    res.json(sec);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET notifications (pending)
router.get("/notifications", superAdminOnly, async (req, res) => {
  const notifications = await Notification.find({ status: "pending" })
    .populate("admin", "name email");
  res.json(notifications);
});

// PATCH: mark notification as done
router.patch("/notifications/:id", superAdminOnly, async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) return res.status(404).json({ message: "Not found" });
  notification.status = "done";
  await notification.save();
  res.json(notification);
});

module.exports = router;
