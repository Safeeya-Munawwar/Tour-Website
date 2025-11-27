const express = require("express");
const Team = require("../models/Team");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "team";
    if (file.fieldname === "teamImage") folder += "/teamImage";
    else folder += "/members";
    return {
      folder,
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
    };
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// ------------------- CRUD ------------------- //

// GET team (single doc)
router.get("/", async (req, res) => {
  try {
    const team = await Team.findOne();
    res.json(team || {});
  } catch (err) {
    console.error("GET /api/team:", err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE team
router.post("/", upload.any(), async (req, res) => {
  try {
    if (!req.body.data) throw new Error("No data provided");

    let data = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body.data;

    // Main team image
    const teamImageFile = req.files.find((f) => f.fieldname === "teamImage");
    if (teamImageFile) data.teamImage = teamImageFile.path;

    // Member images
    if (data.members && Array.isArray(data.members)) {
      data.members = data.members.map((member, idx) => {
        const file = req.files.find(f => f.fieldname === `members[${idx}][image]`);
        return {
          name: member.name,
          role: member.role,
          description: member.description || "",
          image: file ? file.path : member.image || "",
        };
      });
    }

    let team = await Team.findOne();
    if (!team) {
      team = await Team.create(data);
    } else {
      Object.assign(team, data);
      await team.save();
    }

    res.json(team);
  } catch (err) {
    console.error("POST /api/team:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a member by index
router.delete("/member/:index", async (req, res) => {
  try {
    const idx = parseInt(req.params.index, 10);
    if (isNaN(idx)) throw new Error("Invalid index");

    const team = await Team.findOne();
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.members[idx]) team.members.splice(idx, 1);
    await team.save();
    res.json(team);
  } catch (err) {
    console.error("DELETE /api/team/member/:index:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE whole team
router.delete("/", async (req, res) => {
  try {
    await Team.deleteMany();
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/team:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
