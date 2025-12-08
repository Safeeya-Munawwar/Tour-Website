const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Experience = require("../models/Experience");

const router = express.Router();

/* ----------------------------------------
   Cloudinary Storage
---------------------------------------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "experiences",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer fields
const parser = multer({ storage }).fields([
  { name: "heroImgFile", maxCount: 1 },
  { name: "mainImgFile", maxCount: 1 },
  { name: "galleryFiles", maxCount: 10 },
]);

/* ----------------------------------------
   Utility: Safe JSON parser
---------------------------------------- */
function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
}

/* ----------------------------------------
   GET All Experiences
---------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json({ experiences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------------------------------
   GET Single Experience
---------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience)
      return res.status(404).json({ error: "Experience not found" });

    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------------------------------
   POST Create Experience
---------------------------------------- */
router.post("/", parser, async (req, res) => {
  try {
    const {
      slug,
      title,
      subtitle,
      mainDesc,
      subDesc,
      subExperiences,
      gallery,
      tips,
    } = req.body;

    if (!slug || !title || !subtitle || !mainDesc || !subDesc) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const heroImg = req.files?.heroImgFile?.[0]?.path;
    const mainImg = req.files?.mainImgFile?.[0]?.path;
    const galleryImgs = req.files?.galleryFiles?.map((f) => f.path) || [];

    if (!heroImg || !mainImg) {
      return res
        .status(400)
        .json({ error: "Hero image and main image are required" });
    }

    const newExperience = new Experience({
      slug,
      title,
      subtitle,
      heroImg,
      mainImg,
      mainDesc,
      subDesc,
      subExperiences: safeJSONParse(subExperiences),
      gallery: safeJSONParse(gallery).length
        ? safeJSONParse(gallery)
        : galleryImgs,
      tips: safeJSONParse(tips),
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------------------------------
   PUT Update Experience
---------------------------------------- */
router.put("/:id", parser, async (req, res) => {
  try {
    const { slug, title, subtitle, mainDesc, subDesc, subExperiences, tips } =
      req.body;

    const updateData = {
      slug,
      title,
      subtitle,
      mainDesc,
      subDesc,
      subExperiences: safeJSONParse(subExperiences),
      tips: safeJSONParse(tips),
    };

    if (req.files?.heroImgFile?.[0]?.path) {
      updateData.heroImg = req.files.heroImgFile[0].path;
    }

    if (req.files?.mainImgFile?.[0]?.path) {
      updateData.mainImg = req.files.mainImgFile[0].path;
    }

    if (req.files?.galleryFiles?.length) {
      updateData.gallery = req.files.galleryFiles.map((f) => f.path);
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedExperience)
      return res.status(404).json({ error: "Experience not found" });

    res.json(updatedExperience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------------------------------
   DELETE Experience
---------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(
      req.params.id
    );

    if (!deletedExperience)
      return res.status(404).json({ error: "Experience not found" });

    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
