const express = require("express");
const QuickTaxi = require("../models/QuickTaxi");
const QuickTaxiBooking = require("../models/QuickTaxiBooking");
const adminAuth = require("../middleware/adminAuth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

/* ---------------- CLOUDINARY STORAGE ---------------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quick-taxi/vehicles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const parser = multer({ storage });

/* ---------------- GET ALL TAXIS ---------------- */
router.get("/taxis", async (req, res) => {
  try {
    const taxis = await QuickTaxi.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      taxis
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/* ---------------- CREATE TAXI ---------------- */
router.post(
  "/taxis",
  adminAuth,
  parser.single("imageFile"),
  async (req, res) => {
    try {
      const { name, transmission, seats, luggage, capacity, ac } = req.body;

      const image = req.file.path;

      const taxi = new QuickTaxi({
        name,
        transmission,
        seats,
        luggage,
        capacity,
        ac,
        image,
      });

      await taxi.save();
      res.status(201).json(taxi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* ---------------- UPDATE TAXI ---------------- */
router.put(
  "/taxis/:id",
  adminAuth,
  parser.single("imageFile"),
  async (req, res) => {
    try {
      const { name, transmission, seats, luggage, capacity, ac } = req.body;

      const updateData = {
        name,
        transmission,
        seats,
        luggage,
        capacity,
        ac,
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const updatedTaxi = await QuickTaxi.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedTaxi) {
        return res.status(404).json({ error: "Taxi not found" });
      }

      res.json(updatedTaxi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* ---------------- DELETE TAXI ---------------- */
router.delete("/taxis/:id", adminAuth, async (req, res) => {
  try {
    const deletedTaxi = await QuickTaxi.findByIdAndDelete(req.params.id);
    if (!deletedTaxi) return res.status(404).json({ error: "Taxi not found" });

    res.json({ message: "Taxi deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
