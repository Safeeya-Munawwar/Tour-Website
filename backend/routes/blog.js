const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Blog = require("../models/Blog");

const router = express.Router();

// -------------------- Cloudinary storage --------------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "blogs", allowed_formats: ["jpg", "jpeg", "png"] },
});
const parser = multer({ storage }).single("heroImg");

// -------------------- GET all blogs --------------------
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET single blog by slug --------------------
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET single blog by ID --------------------
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- POST create blog --------------------
router.post("/", parser, async (req, res) => {
  try {
    const { title, slug, subtitle, description, content } = req.body;

    if (!title || !slug || !subtitle || !description || !content || !req.file) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBlog = new Blog({
      title,
      slug,
      subtitle,
      description,
      content,
      heroImg: req.file.path,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- PUT update blog --------------------
router.put("/:id", parser, async (req, res) => {
  try {
    const { title, slug, subtitle, description, content } = req.body;

    const updateData = { title, slug, subtitle, description, content };

    if (req.file) updateData.heroImg = req.file.path;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE blog --------------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
