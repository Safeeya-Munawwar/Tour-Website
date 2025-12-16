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

// ---------------- CREATE TOUR DETAIL ----------------
router.post("/detail", upload.any(), async (req, res) => {
  try {
    const {
      tourId,
      heroTitle,
      heroSubtitle,
      highlights,
      gallerySlides,
      aboutParagraphs,
      historyTitle,
      historyLeftList,
      historyRightList,
      itinerary,
      tourFacts,
    } = req.body;

    const parsedHighlights = JSON.parse(highlights || "[]");
    const parsedGallery = JSON.parse(gallerySlides || "[]");
    const parsedAbout = JSON.parse(aboutParagraphs || "[]");
    const parsedHistoryLeft = JSON.parse(historyLeftList || "[]");
    const parsedHistoryRight = JSON.parse(historyRightList || "[]");
    const parsedItinerary = JSON.parse(itinerary || "[]");
    const parsedTourFacts = JSON.parse(tourFacts || "{}");

    // Attach images dynamically
    parsedHighlights.forEach((h, idx) => {
      const file = req.files.find(
        (f) => f.fieldname === `highlightImage_${idx}`
      );
      if (file) h.image = file.path;
    });

    parsedGallery.forEach((g, idx) => {
      const file = req.files.find((f) => f.fieldname === `galleryImage_${idx}`);
      if (file) g.image = file.path;
    });

    const heroFile = req.files.find((f) => f.fieldname === "heroImage");

    const newDetail = new RoundTourDetail({
      tourId,
      heroImage: heroFile?.path || "",
      heroTitle,
      heroSubtitle,
      highlights: parsedHighlights,
      aboutParagraphs: parsedAbout,
      historyTitle,
      historyLeftList: parsedHistoryLeft,
      historyRightList: parsedHistoryRight,
      itinerary: parsedItinerary,
      tourFacts: parsedTourFacts,
      gallerySlides: parsedGallery,
    });

    await newDetail.save();
    res.json({ success: true, detail: newDetail });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- UPDATE TOUR DETAIL ----------------
router.put("/detail/:id", upload.any(), async (req, res) => {
  try {
    const {
      heroTitle,
      heroSubtitle,
      highlights,
      gallerySlides,
      aboutParagraphs,
      historyTitle,
      historyLeftList,
      historyRightList,
      itinerary,
      tourFacts,
    } = req.body;

    const parsedHighlights = JSON.parse(highlights || "[]");
    const parsedGallery = JSON.parse(gallerySlides || "[]");
    const parsedAbout = JSON.parse(aboutParagraphs || "[]");
    const parsedHistoryLeft = JSON.parse(historyLeftList || "[]");
    const parsedHistoryRight = JSON.parse(historyRightList || "[]");
    const parsedItinerary = JSON.parse(itinerary || "[]");
    const parsedTourFacts = JSON.parse(tourFacts || "{}");

    // update highlight images
    parsedHighlights.forEach((h, idx) => {
      const file = req.files.find(
        (f) => f.fieldname === `highlightImage_${idx}`
      );
      if (file) h.image = file.path;
    });

    // update gallery images
    parsedGallery.forEach((g, idx) => {
      const file = req.files.find((f) => f.fieldname === `galleryImage_${idx}`);
      if (file) g.image = file.path;
    });

    const heroFile = req.files.find((f) => f.fieldname === "heroImage");

    const updateData = {
      heroImage: heroFile?.path,
      heroTitle,
      heroSubtitle,
      highlights: parsedHighlights,
      gallerySlides: parsedGallery,
      aboutParagraphs: parsedAbout,
      historyTitle,
      historyLeftList: parsedHistoryLeft,
      historyRightList: parsedHistoryRight,
      itinerary: parsedItinerary,
      tourFacts: parsedTourFacts,
    };

    const updatedDetail = await RoundTourDetail.findOneAndUpdate(
      { tourId: req.params.id },
      updateData,
      { new: true, upsert: true }
    );

    res.json({ success: true, detail: updatedDetail });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- GET ALL TOURS ----------------
router.get("/", async (req, res) => {
  try {
    const tours = await RoundTour.find().sort({ createdAt: -1 });
    res.json({ success: true, tours });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- CREATE TOUR ----------------
router.post("/", upload.single("img"), async (req, res) => {
  try {
    if (!req.body.title || !req.body.desc || !req.file)
      return res.status(400).json({
        success: false,
        error: "Title, description, and img are required",
      });

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

// ---------------- GET SINGLE TOUR + DETAILS ----------------
router.get("/:id", async (req, res) => {
  try {
    const tour = await RoundTour.findById(req.params.id);
    const details = await RoundTourDetail.findOne({ tourId: req.params.id });

    if (!tour)
      return res.status(404).json({ success: false, error: "Tour not found" });

    res.json({ success: true, tour, details });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- UPDATE TOUR ----------------
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      days: req.body.days || "",
      location: req.body.location || "",
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
