const express = require("express");
const router = express.Router();
const QuickTaxi = require("../models/QuickTaxi");
const QuickTaxiBooking = require("../models/QuickTaxiBooking");
const adminAuth = require("../middleware/adminAuth");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

/* ---------------- CLOUDINARY CONFIG (SAME AS JOURNEY) ---------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------- MULTER STORAGE ---------------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quick-taxi/vehicles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/* ======================================================
   TAXI CRUD
====================================================== */

// ---------------- GET ALL TAXIS (PUBLIC / ADMIN) ----------------
router.get("/taxis", async (req, res) => {
  try {
    const taxis = await QuickTaxi.find().sort({ createdAt: -1 });
    res.json({ success: true, taxis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- CREATE TAXI (ADMIN) ----------------
router.post(
  "/taxis",
  adminAuth,
  upload.single("imageFile"),
  async (req, res) => {
    try {
      const taxi = new QuickTaxi({
        name: req.body.name,
        transmission: req.body.transmission || "Manual",
        seats: req.body.seats,
        luggage: req.body.luggage,
        capacity: req.body.capacity,
        ac: req.body.ac === "true" || req.body.ac === true,
        image: req.file ? req.file.path : "",
      });

      await taxi.save();
      res.json({ success: true, taxi });
    } catch (err) {
      console.error("CREATE TAXI:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ---------------- UPDATE TAXI (ADMIN) ----------------
router.put(
  "/taxis/:id",
  adminAuth,
  upload.single("imageFile"),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        transmission: req.body.transmission || "Manual",
        seats: req.body.seats,
        luggage: req.body.luggage,
        capacity: req.body.capacity,
        ac: req.body.ac === "true" || req.body.ac === true,
      };

      if (req.file) updateData.image = req.file.path;

      const taxi = await QuickTaxi.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({ success: true, taxi });
    } catch (err) {
      console.error("UPDATE TAXI:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ---------------- DELETE TAXI (ADMIN) ----------------
router.delete("/taxis/:id", adminAuth, async (req, res) => {
  try {
    await QuickTaxi.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ======================================================
   BOOKINGS
====================================================== */

// ---------------- CREATE BOOKING (PUBLIC) ----------------
router.post("/bookings", async (req, res) => {
  try {
    const booking = new QuickTaxiBooking(req.body);
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- GET ALL BOOKINGS (ADMIN) ----------------
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const bookings = await QuickTaxiBooking.find()
      .sort({ createdAt: -1 })
      .populate("taxiId", "name image");

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- UPDATE BOOKING STATUS (ADMIN) ----------------
// PATCH /bookings/:id
router.patch("/bookings/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, error: "Status is required" });
    }

    const booking = await QuickTaxiBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, error: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- DELETE BOOKING (ADMIN) ----------------
router.delete("/bookings/:id", adminAuth, async (req, res) => {
  try {
    await QuickTaxiBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
