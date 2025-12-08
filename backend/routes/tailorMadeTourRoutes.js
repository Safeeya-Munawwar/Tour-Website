const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const TailorMadeTour = require("../models/TailorMadeTour");
const Inquiry = require("../models/TailorMadeTourInquiry");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "tailorMadeTour";
    if (file.fieldname.startsWith("howItWorks")) folder += "/howItWorks";
    else if (file.fieldname.startsWith("gallery")) folder += "/gallery";

    return {
      folder,
      resource_type: "auto",
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
    };
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// GET existing data
router.get("/", async (req, res) => {
  try {
    const tour = await TailorMadeTour.findOne();
    res.json(tour || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST / update
router.post("/", upload.any(), async (req, res) => {
  try {
    if (!req.body.data) throw new Error("No data provided");
    const data =
      typeof req.body.data === "string"
        ? JSON.parse(req.body.data)
        : req.body.data;

    // default arrays
    data.howItWorks = Array.isArray(data.howItWorks) ? data.howItWorks : [];
    data.gallery = Array.isArray(data.gallery) ? data.gallery : [];
    data.fullDescription = Array.isArray(data.fullDescription)
      ? data.fullDescription
      : [];

    // phone and whatsapp
    data.phone = data.phone || "";
    data.whatsapp = data.whatsapp || "";

    // howItWorks images
    const howFiles = req.files.filter((f) =>
      f.fieldname.startsWith("howItWorks")
    );
    data.howItWorks = data.howItWorks.map((item, idx) => {
      const file = howFiles.find((f) => f.fieldname === `howItWorks${idx}`);
      return { ...item, image: file ? file.path : item.image || "" };
    });

    // gallery files
    const galleryFiles = req.files.filter(
      (f) => f.fieldname === "galleryFiles"
    );
    data.gallery.push(...galleryFiles.map((f) => f.path));

    const updatedTour = await TailorMadeTour.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
    });

    res.json(updatedTour);
  } catch (err) {
    console.error("Failed to update Tailor Made Tour:", err);
    res.status(500).json({ error: "Failed to update Tailor Made Tour" });
  }
});

// --------------------- User inquiries ---------------------

// Save a new inquiry
router.post("/inquiry", async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const saved = await newInquiry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save inquiry" });
  }
});

// Get all inquiries (admin)
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

// Update status
router.put("/inquiries/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

    res.json(inquiry);
  } catch (err) {
    console.error("Failed to update inquiry status:", err);
    res.status(500).json({ message: "Failed to update inquiry" });
  }
});

// Delete inquiry
router.delete("/inquiries/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete inquiry" });
  }
});

module.exports = router;
