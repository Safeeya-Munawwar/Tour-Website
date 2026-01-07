const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const SuperAdminNotification = require("../models/SuperAdminNotification");
const Admin = require("../models/Admin");

// --- Middleware: SuperAdmin only ---
const superAdminOnly = async (req, res, next) => {
  await adminAuth(req, res, async () => {
    if (req.admin.role === "superadmin") next();
    else res.status(403).json({ message: "Forbidden: SuperAdmin only" });
  });
};

// --- POST: Create a new admin ---
router.post("/admins", superAdminOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin with this email already exists" });

    // Create new admin
    const newAdmin = new Admin({ name, email, password, role: "admin" });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- GET all admins ---
router.get("/admins", superAdminOnly, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json({ admins }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- PATCH: Toggle admin active/inactive ---
router.patch("/admins/:id/status", superAdminOnly, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Toggle isActive
    admin.isActive = !admin.isActive;
    await admin.save();

    res.json({
      message: `Admin ${admin.isActive ? "activated" : "deactivated"} successfully`,
      admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle admin status" });
  }
});

// --- POST: send notification to all admins ---
router.post("/notifications", superAdminOnly, async (req, res) => {
  try {
    const { sections, action, message, priority } = req.body;

    if (!sections || !Array.isArray(sections) || sections.length === 0)
      return res.status(400).json({ message: "Select at least one section" });

    if (!action) return res.status(400).json({ message: "Action required" });

    const admins = await Admin.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(400).json({ message: "No admins found" });

    const notifications = await SuperAdminNotification.insertMany(
      admins.map((admin) => ({
        sections,
        action,
        message,
        priority: priority || "medium",
        admin: admin._id,
        superAdmin: req.admin._id,
        status: "pending",
        type: "request",
      }))
    );

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- GET super admin notifications ---
router.get("/notifications", superAdminOnly, async (req, res) => {
  try {
    const notifications = await SuperAdminNotification.find()
      .populate("admin", "name email")
      .sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark a super admin notification as read
router.patch("/notifications/:id", superAdminOnly, async (req, res) => {
  try {
    const notification = await SuperAdminNotification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Not found" });

    // Mark as read for Super Admin without changing admin status
    notification.readBySuperAdmin = true;
    await notification.save();

    res.json({ success: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a super admin notification
router.delete("/notifications/:id", superAdminOnly, async (req, res) => {
  try {
    const { superAdminOnly } = req.query;
    if (superAdminOnly === "true") {
      const deleted = await SuperAdminNotification.findByIdAndDelete(
        req.params.id
      );
      if (!deleted)
        return res.status(404).json({ message: "Notification not found" });
      return res.json({ success: true, deletedFrom: "SuperAdminNotification" });
    }

    const deleted = await SuperAdminNotification.findByIdAndDelete(
      req.params.id
    );
    if (!deleted)
      return res.status(404).json({ message: "Notification not found" });

    res.json({ success: true, deletedFrom: "SuperAdminNotification" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete notification" });
  }
});

module.exports = router;
