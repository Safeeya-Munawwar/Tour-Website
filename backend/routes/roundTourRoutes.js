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
// GET ALL TOURS
// ------------------------

// GET ALL TOURS (cards + details)
router.get("/", async (req, res) => {
  try {
    const tours = await RoundTour.find();

    // fetch details for each tour
    const toursWithDetails = await Promise.all(
      tours.map(async (tour) => {
        const details = await RoundTourDetail.findOne({ tourId: tour._id });
        return { ...tour.toObject(), details: details || {} };
      })
    );

    res.json({ success: true, tours: toursWithDetails });
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
    if (!tour) return res.status(404).json({ success: false, error: "Tour not found" });

    const details = await RoundTourDetail.findOne({ tourId: req.params.id }) || null;
    res.json({ success: true, tour, details });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// CREATE TOUR
// ------------------------
router.post("/", upload.single("img"), async (req, res) => {
  try {
    if (!req.body.title || !req.body.days || !req.body.desc) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newTour = new RoundTour({
      title: req.body.title,
      days: req.body.days,
      desc: req.body.desc,
      img: req.file ? req.file.path : "",
    });

    await newTour.save();
    res.json({ success: true, tour: newTour });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// CREATE TOUR DETAIL
// ------------------------
// ------------------------
// CREATE TOUR DETAIL (Dynamic Gallery)
// ------------------------
router.post("/detail", upload.any(), async (req, res) => {
  try {
    if (!req.body.tourId || !req.body.heroTitle || !req.body.heroSubtitle) {
      return res.status(400).json({ success: false, error: "Missing required detail fields" });
    }

    // Parse gallerySlides from body or default empty array
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Map uploaded gallery images dynamically
    const galleryFiles = req.files.filter(f => f.fieldname.startsWith("galleryImage_"));
    galleryFiles.forEach(file => {
      const idx = parseInt(file.fieldname.split("_")[1], 10);
      if (gallerySlides[idx]) gallerySlides[idx].image = file.path;
    });

    const heroFile = req.files.find(f => f.fieldname === "heroImage");

    const newDetail = new RoundTourDetail({
      tourId: req.body.tourId,
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      heroImage: heroFile ? heroFile.path : "",
      highlights: JSON.parse(req.body.highlights || "[]"),
      itinerary: JSON.parse(req.body.itinerary || "[]"),
      tourFacts: JSON.parse(req.body.tourFacts || "{}"),
      gallerySlides,
    });

    await newDetail.save();
    res.json({ success: true, detail: newDetail });
  } catch (err) {
    console.error("Create RoundTourDetail error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// UPDATE TOUR DETAIL (Dynamic Gallery)
// ------------------------
router.put("/detail/:id", upload.any(), async (req, res) => {
  try {
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Update gallery images dynamically
    const galleryFiles = req.files.filter(f => f.fieldname.startsWith("galleryImage_"));
    galleryFiles.forEach(file => {
      const idx = parseInt(file.fieldname.split("_")[1], 10);
      if (gallerySlides[idx]) gallerySlides[idx].image = file.path;
    });

    const heroFile = req.files.find(f => f.fieldname === "heroImage");

    const updateData = {
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      highlights: JSON.parse(req.body.highlights || "[]"),
      itinerary: JSON.parse(req.body.itinerary || "[]"),
      tourFacts: JSON.parse(req.body.tourFacts || "{}"),
      gallerySlides,
      ...(heroFile && { heroImage: heroFile.path }),
    };

    const updatedDetail = await RoundTourDetail.findOneAndUpdate(
      { tourId: req.params.id },
      updateData,
      { new: true, upsert: true }
    );

    if (!updatedDetail) return res.status(404).json({ success: false, error: "Detail not found" });

    res.json({ success: true, detail: updatedDetail });
  } catch (err) {
    console.error("Update RoundTourDetail error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// UPDATE TOUR
// ------------------------
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      days: req.body.days,
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
// DELETE TOUR + DETAIL
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
