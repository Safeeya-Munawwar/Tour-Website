// routes/roundTours.js
const express = require("express");
const router = express.Router();
const RoundTour = require("../models/RoundTour");
const RoundTourDetail = require("../models/RoundTourDetail");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ------------------------
// Cloudinary Upload Setup
// ------------------------
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "round-tours" },
});
const upload = multer({ storage });

// ------------------------
// GET ALL TOURS (cards)
// ------------------------
router.get("/", async (req, res) => {
  try {
    const tours = await RoundTour.find();
    res.json({ success: true, tours });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// GET SINGLE TOUR + DETAILS
// ------------------------
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

// ------------------------
// ADMIN — CREATE TOUR
// ------------------------
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const newTour = new RoundTour({
      title: req.body.title,
      days: req.body.days,
      location: req.body.location,
      desc: req.body.desc,
      img: req.file.path,
    });
    await newTour.save();
    res.json({ success: true, tour: newTour });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// ADMIN — CREATE TOUR DETAIL
// ------------------------
router.post("/detail", upload.any(), async (req, res) => {
  try {
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Attach uploaded gallery images
    gallerySlides.forEach((slide, idx) => {
      const fileKey = `galleryImage_${idx}`;
      const uploadedFile = req.files.find(f => f.fieldname === fileKey);
      slide.image = uploadedFile ? uploadedFile.path : slide.image || "";
    });

    const heroFile = req.files.find(f => f.fieldname === "heroImage");

    const newDetail = new RoundTourDetail({
      tourId: req.body.tourId,
      heroImage: heroFile ? heroFile.path : "",
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

// ------------------------
// ADMIN — UPDATE TOUR
// ------------------------
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      days: req.body.days,
      location: req.body.location,
      desc: req.body.desc,
    };
    if (req.file) updateData.img = req.file.path;

    const updatedTour = await RoundTour.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedTour) return res.status(404).json({ success: false, error: "Tour not found" });

    res.json({ success: true, tour: updatedTour });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// ADMIN — UPDATE TOUR DETAIL
// ------------------------
router.put("/detail/:id", upload.any(), async (req, res) => {
  try {
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Attach uploaded gallery images
    gallerySlides.forEach((slide, idx) => {
      const fileKey = `galleryImage_${idx}`;
      const uploadedFile = req.files.find(f => f.fieldname === fileKey);
      slide.image = uploadedFile ? uploadedFile.path : slide.image || "";
    });

    const heroFile = req.files.find(f => f.fieldname === "heroImage");

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

    const updatedDetail = await RoundTourDetail.findOneAndUpdate(
      { tourId: req.params.id },
      updateData,
      { new: true, upsert: true } // create if not exists
    );

    if (!updatedDetail) return res.status(404).json({ success: false, error: "Detail not found" });

    res.json({ success: true, detail: updatedDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// ADMIN — DELETE TOUR + DETAIL
// ------------------------
router.delete("/:id", async (req, res) => {
  try {
    const tour = await RoundTour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ success: false, error: "Tour not found" });

    await RoundTourDetail.deleteOne({ tourId: req.params.id });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
