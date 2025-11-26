const express = require("express");
const About = require("../models/About");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "about";
    // Decide folder by fieldname
    if (file.fieldname.startsWith("feature")) folder += "/features";
    if (file.fieldname.startsWith("team")) folder += "/team";
    if (file.fieldname.startsWith("gallery")) folder += "/gallery";
    return {
      folder,
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
    };
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB limit

// GET About page
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne({});
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST / UPDATE About page
router.post(
  "/",
  upload.fields([
    { name: "imageHeader", maxCount: 1 },
    { name: "imageFull", maxCount: 1 },
    { name: "featureImages", maxCount: 20 },
    { name: "teamImages", maxCount: 20 },
    { name: "galleryImages", maxCount: 50 },
  ]),
  async (req, res) => {
    try {
      if (!req.body.data) throw new Error("No data provided");

      let data = JSON.parse(req.body.data);

      // Assign single images
      if (req.files.imageHeader)
        data.imageHeader = req.files.imageHeader[0].path;
      if (req.files.imageFull) data.imageFull = req.files.imageFull[0].path;

      // Assign feature images safely
      if (req.files.featureImages) {
        req.files.featureImages.forEach((file, idx) => {
          if (data.features && data.features[idx])
            data.features[idx].image = file.path;
        });
      }

      // Assign team images safely
      if (req.files.teamImages) {
        req.files.teamImages.forEach((file, idx) => {
          if (data.teamMembers && data.teamMembers[idx])
            data.teamMembers[idx].image = file.path;
        });
      }

      // Gallery supports images and videos
      if (req.files.galleryImages) {
        // Preserve existing gallery URLs and append newly uploaded files
        data.gallery = [
          ...(data.gallery || []), // existing gallery URLs from frontend
          ...req.files.galleryImages.map((file) => file.path), // newly uploaded files
        ];
      }

      let about = await About.findOne({});
      if (!about) {
        about = await About.create(data);
      } else {
        Object.assign(about, data);
        await about.save();
      }

      res.json(about);
    } catch (err) {
      console.error("Error in /api/about:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
