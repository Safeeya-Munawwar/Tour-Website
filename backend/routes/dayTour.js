const express = require("express");
const router = express.Router();
const DayTour = require("../models/DayTour");
const DayTourDetail = require("../models/DayTourDetail");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ------------------------
// Cloudinary Upload Setup
// ------------------------
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "day-tours" },
});
const upload = multer({ storage });

// ------------------------
// GET ALL TOURS (cards)
// ------------------------
router.get("/", async (req, res) => {
  try {
    const tours = await DayTour.find();
    res.json({ success: true, tours }); // always returns an array
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// GET SINGLE TOUR + DETAILS
// ------------------------
router.get("/:id", async (req, res) => {
  try {
    const tour = await DayTour.findById(req.params.id);
    const details = await DayTourDetail.findOne({ tourId: req.params.id });
    if (!tour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }
    res.json({ success: true, tour, details });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// ADMIN — CREATE LIST ITEM
// ------------------------
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const newTour = new DayTour({
      title: req.body.title,
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
// ADMIN — CREATE DETAIL ITEM
// ------------------------
router.post("/detail", upload.fields([
  { name: "heroImage", maxCount: 1 },
  { name: "galleryImage_0" },
  { name: "galleryImage_1" },
  { name: "galleryImage_2" }, // Add more if needed or handle dynamically
]), async (req, res) => {
  try {
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Attach uploaded images if any
    gallerySlides.forEach((slide, idx) => {
      const fileKey = `galleryImage_${idx}`;
      if (req.files[fileKey] && req.files[fileKey][0]) {
        slide.image = req.files[fileKey][0].path; // Cloudinary URL
      } else {
        slide.image = slide.image || ""; // fallback
      }
    });

    const newDetail = new DayTourDetail({
      tourId: req.body.tourId,
      heroImage: req.files.heroImage ? req.files.heroImage[0].path : "",
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      aboutParagraphs: JSON.parse(req.body.aboutParagraphs || "[]"),
      historyTitle: req.body.historyTitle,
      historyLeftList: JSON.parse(req.body.historyLeftList || "[]"),
      historyRightList: JSON.parse(req.body.historyRightList || "[]"),
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
// ADMIN — UPDATE LIST ITEM
// ------------------------
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      location: req.body.location,
      desc: req.body.desc,
    };
    if (req.file) updateData.img = req.file.path;

    const updatedTour = await DayTour.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }

    res.json({ success: true, tour: updatedTour });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/detail/:id", upload.any(), async (req, res) => {
  try {
    const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

    // Attach uploaded images dynamically
    gallerySlides.forEach((slide, idx) => {
      const fileKey = `galleryImage_${idx}`;
      const uploadedFile = req.files.find(f => f.fieldname === fileKey);
      if (uploadedFile) slide.image = uploadedFile.path;
      else slide.image = slide.image || "";
    });

    const updateData = {
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      aboutParagraphs: JSON.parse(req.body.aboutParagraphs || "[]"),
      historyTitle: req.body.historyTitle,
      historyLeftList: JSON.parse(req.body.historyLeftList || "[]"),
      historyRightList: JSON.parse(req.body.historyRightList || "[]"),
      gallerySlides,
    };

    const heroFile = req.files.find(f => f.fieldname === "heroImage");
    if (heroFile) updateData.heroImage = heroFile.path;

    // ⚠️ Find by tourId instead of _id
    const updatedDetail = await DayTourDetail.findOneAndUpdate(
      { tourId: req.params.id }, // <-- use tourId here
      updateData,
      { new: true, upsert: true } // upsert: true if detail doesn't exist yet
    );

    if (!updatedDetail) {
      return res.status(404).json({ success: false, error: "Detail not found" });
    }

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
    const tour = await DayTour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }

    await DayTourDetail.deleteOne({ tourId: req.params.id });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
