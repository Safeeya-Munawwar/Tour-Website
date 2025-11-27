const express = require("express");
const CommunityImpact = require("../models/CommunityImpact");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// ---------------- CLOUDINARY CONFIG ----------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------------- MULTER STORAGE ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "community";
    if (file.fieldname.startsWith("impacts")) folder += "/impacts";
    return {
      folder,
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
    };
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// ---------------- GET COMMUNITY IMPACT ----------------
router.get("/", async (req, res) => {
  try {
    const community = await CommunityImpact.findOne();
    res.json(community || {});
  } catch (err) {
    console.error("GET /api/community:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CREATE / UPDATE COMMUNITY IMPACT ----------------
router.post("/", upload.any(), async (req, res) => {
  try {
    if (!req.body.data) throw new Error("No data provided");

    let data =
      typeof req.body.data === "string"
        ? JSON.parse(req.body.data)
        : req.body.data;

    // Map impact images
    if (data.impacts && Array.isArray(data.impacts)) {
        data.impacts = data.impacts.map((impact, idx) => {
          const files = req.files.filter(
            f => f.fieldname === `impacts[${idx}][images][]`
          );
      
          return {
            title: impact.title,
            description: impact.description || "",
            images: files.length > 0 
              ? files.map(f => f.path)
              : (impact.images && impact.images.length > 0 
                  ? impact.images
                  : []),
          };
        });
      }      

    // Ensure commonImage exists
    if (req.files) {
      const commonFile = req.files.find((f) => f.fieldname === "commonImage");
      if (commonFile) data.commonImage = commonFile.path;
    }

    let community = await CommunityImpact.findOne();
    if (!community) {
      community = await CommunityImpact.create(data);
    } else {
      Object.assign(community, data);
      await community.save();
    }

    res.json(community);
  } catch (err) {
    console.error("POST /api/community:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- DELETE SINGLE IMPACT ----------------
router.delete("/impact/:index", async (req, res) => {
  try {
    const idx = parseInt(req.params.index, 10);
    if (isNaN(idx)) throw new Error("Invalid index");

    const community = await CommunityImpact.findOne();
    if (!community) return res.status(404).json({ message: "Community not found" });

    if (community.impacts[idx]) community.impacts.splice(idx, 1);
    await community.save();
    res.json(community);
  } catch (err) {
    console.error("DELETE /api/community/impact/:index:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- DELETE WHOLE COMMUNITY ----------------
router.delete("/", async (req, res) => {
  try {
    await CommunityImpact.deleteMany();
    res.json({ message: "Community impacts deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/community:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;