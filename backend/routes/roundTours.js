const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const RoundTour = require("../models/RoundTour");
const RoundTourDetail = require("../models/RoundTourDetail");
const adminAuth = require("../middleware/adminAuth");

/* ---------------- CLOUDINARY ---------------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "round-tours" },
});
const upload = multer({ storage });

/* ---------------- GET ALL TOURS ---------------- */
router.get("/", async (req, res) => {
  const tours = await RoundTour.find().sort({ createdAt: -1 });
  res.json({ success: true, tours });
});

/* ---------------- GET SINGLE TOUR ---------------- */
router.get("/:id", async (req, res) => {
  const tour = await RoundTour.findById(req.params.id);
  const details = await RoundTourDetail.findOne({ tourId: req.params.id });
  if (!tour) return res.status(404).json({ success: false });
  res.json({ success: true, tour, details });
});

/* ---------------- CREATE TOUR CARD ---------------- */
router.post("/", adminAuth, upload.single("img"), async (req, res) => {
  const tour = await RoundTour.create({
    title: req.body.title,
    days: req.body.days,
    location: req.body.location,
    desc: req.body.desc,
    img: req.file.path,
  });
  res.json({ success: true, tour });
});

/* ---------------- CREATE DETAIL ---------------- */
router.post("/detail", adminAuth, upload.any(), async (req, res) => {
  const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

  gallerySlides.forEach((s, i) => {
    const f = req.files.find(f => f.fieldname === `galleryImage_${i}`);
    if (f) s.image = f.path;
  });

  const heroFile = req.files.find(f => f.fieldname === "heroImage");

  const detail = await RoundTourDetail.create({
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

  res.json({ success: true, detail });
});

/* ---------------- UPDATE TOUR ---------------- */
router.put("/:id", adminAuth, upload.single("img"), async (req, res) => {
  const data = {
    title: req.body.title,
    days: req.body.days,
    location: req.body.location,
    desc: req.body.desc,
  };
  if (req.file) data.img = req.file.path;

  const tour = await RoundTour.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json({ success: true, tour });
});

/* ---------------- UPDATE DETAIL ---------------- */
router.put("/detail/:id", adminAuth, upload.any(), async (req, res) => {
  const gallerySlides = JSON.parse(req.body.gallerySlides || "[]");

  gallerySlides.forEach((s, i) => {
    const f = req.files.find(f => f.fieldname === `galleryImage_${i}`);
    if (f) s.image = f.path;
  });

  const heroFile = req.files.find(f => f.fieldname === "heroImage");

  const update = {
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

  if (heroFile) update.heroImage = heroFile.path;

  const detail = await RoundTourDetail.findOneAndUpdate(
    { tourId: req.params.id },
    update,
    { new: true, upsert: true }
  );

  res.json({ success: true, detail });
});

/* ---------------- DELETE TOUR ---------------- */
router.delete("/:id", adminAuth, async (req, res) => {
  await RoundTour.findByIdAndDelete(req.params.id);
  await RoundTourDetail.deleteOne({ tourId: req.params.id });
  res.json({ success: true });
});

module.exports = router;
