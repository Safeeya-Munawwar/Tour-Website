// routes/roundTours.js
const express = require("express");
const router = express.Router();
const RoundTour = require("../models/RoundTour");
const RoundTourDetail = require("../models/RoundTourDetail");

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ---------------- Cloudinary Setup ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "round-tours" },
});
const upload = multer({ storage });

// ---------------- GET ALL TOURS ----------------
router.get("/", async (req, res) => {
  try {
    const tours = await RoundTour.find().sort({ createdAt: -1 });
    res.json({ success: true, tours });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- GET SINGLE TOUR + DETAIL ----------------
router.get("/:id", async (req, res) => {
  try {
    const tour = await RoundTour.findById(req.params.id);
    const details = await RoundTourDetail.findOne({ tourId: req.params.id });

    if (!tour) return res.status(404).json({ success: false, error: "Tour not found" });

    res.json({ success: true, tour, details });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- CREATE TOUR (CARD) ----------------
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const newTour = new RoundTour({
      title: req.body.title,
      days: req.body.days,
      location: req.body.location,
      desc: req.body.desc,
      img: req.file?.path || "",
    });

    await newTour.save();
    res.json({ success: true, tour: newTour });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- CREATE TOUR DETAIL (HERO + GALLERY) ----------------
router.post("/detail", upload.fields([
  { name: "heroImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 20 }
]), async (req, res) => {
  try {
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Attach uploaded gallery images
    (req.files["galleryImages"] || []).forEach((file, idx) => {
      if (gallerySlides[idx]) gallerySlides[idx].image = file.path;
    });

    const heroFile = req.files["heroImage"]?.[0];

    const newDetail = new RoundTourDetail({
      tourId: req.body.tourId,
      heroImage: heroFile?.path || "",
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      highlights: JSON.parse(req.body.highlights || "[]"),
      itinerary: JSON.parse(req.body.itinerary || "[]"),
      inclusions: JSON.parse(req.body.inclusions || "[]"),
      exclusions: JSON.parse(req.body.exclusions || "[]"),
      offers: JSON.parse(req.body.offers || "[]"),
      tourFacts: JSON.parse(req.body.tourFacts || "{}"),
      gallerySlides,
    });

    await newDetail.save();
    res.json({ success: true, detail: newDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- UPDATE TOUR (CARD) ----------------
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      days: req.body.days,
      location: req.body.location,
      desc: req.body.desc,
    };
    if (req.file) updateData.img = req.file.path;

    const updated = await RoundTour.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, tour: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- UPDATE TOUR DETAIL (HERO + GALLERY) ----------------
router.put("/detail/:id", upload.fields([
  { name: "heroImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 20 }
]), async (req, res) => {
  try {
    const existingDetail = await RoundTourDetail.findOne({ tourId: req.params.id });

    let gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Preserve old images if no new image uploaded
    gallerySlides = gallerySlides.map((slide, idx) => ({
      ...slide,
      image:
        (req.files?.galleryImages && req.files.galleryImages[idx]?.path) ||
        existingDetail?.gallerySlides?.[idx]?.image ||
        "",
    }));

    const heroFile = req.files?.heroImage?.[0];

    const updateData = {
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      highlights: JSON.parse(req.body.highlights || "[]"),
      itinerary: JSON.parse(req.body.itinerary || "[]"),
      inclusions: JSON.parse(req.body.inclusions || "[]"),
      exclusions: JSON.parse(req.body.exclusions || "[]"),
      offers: JSON.parse(req.body.offers || "[]"),
      tourFacts: JSON.parse(req.body.tourFacts || "{}"),
      gallerySlides,
    };

    if (heroFile) updateData.heroImage = heroFile.path;
    else if (existingDetail?.heroImage) updateData.heroImage = existingDetail.heroImage;

    const updatedDetail = await RoundTourDetail.findOneAndUpdate(
      { tourId: req.params.id },
      updateData,
      { new: true, upsert: true }
    );

    res.json({ success: true, detail: updatedDetail });
  } catch (err) {
    console.error("UPDATE DETAIL ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ---------------- DELETE TOUR + DETAIL ----------------
router.delete("/:id", async (req, res) => {
  try {
    await RoundTour.findByIdAndDelete(req.params.id);
    await RoundTourDetail.deleteOne({ tourId: req.params.id });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
