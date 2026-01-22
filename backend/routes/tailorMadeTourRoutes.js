const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const TailorMadeTour = require("../models/TailorMadeTour");
const Inquiry = require("../models/TailorMadeTourInquiry");
const adminAuth = require("../middleware/adminAuth");
const sendEmail = require("../utils/mailer");

const router = express.Router();

// ---------------- CLOUDINARY CONFIG ----------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------------- MULTER CONFIG ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "tailorMadeTour";
    if (file.fieldname.startsWith("howItWorks")) folder += "/howItWorks";
    else if (file.fieldname.startsWith("gallery")) folder += "/gallery";

    return {
      folder,
      resource_type: "auto",
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm", "webp"],
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

// ---------------- GET TAILOR MADE TOUR ----------------
router.get("/", async (req, res) => {
  try {
    const tour = await TailorMadeTour.findOne();
    res.json(tour || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- UPDATE TAILOR MADE TOUR (ADMIN) ----------------
router.post("/", adminAuth, upload.any(), async (req, res) => {
  try {
    if (!req.body.data) throw new Error("No data provided");

    const data =
      typeof req.body.data === "string"
        ? JSON.parse(req.body.data)
        : req.body.data;

    data.howItWorks = Array.isArray(data.howItWorks) ? data.howItWorks : [];
    data.gallery = Array.isArray(data.gallery) ? data.gallery : [];
    data.fullDescription = Array.isArray(data.fullDescription)
      ? data.fullDescription
      : [];

    data.phone = data.phone || "";
    data.whatsapp = data.whatsapp || "";

    const howFiles = req.files.filter((f) =>
      f.fieldname.startsWith("howItWorks")
    );

    data.howItWorks = data.howItWorks.map((item, idx) => {
      const file = howFiles.find((f) => f.fieldname === `howItWorks${idx}`);
      return { ...item, image: file ? file.path : item.image || "" };
    });

    const galleryFiles = req.files.filter(
      (f) => f.fieldname === "galleryFiles"
    );

    const newGalleryImages = galleryFiles.map((f) => f.path);
    const MAX_GALLERY_IMAGES = 6;

    data.gallery = [...data.gallery, ...newGalleryImages].slice(
      0,
      MAX_GALLERY_IMAGES
    );

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

// ---------------- SAVE USER INQUIRY ----------------
router.post("/inquiry", async (req, res) => {
  try {
    const inquiry = new Inquiry({
      title: req.body.title,
      fullName: req.body.fullName,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
      tourType: req.body.tourType,
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      adults: req.body.adults,
      children: req.body.children,
      selectedDestinations: req.body.selectedDestinations,
      selectedExperiences: req.body.selectedExperiences,
      travelStyle: req.body.travelStyle,
      budget: req.body.budget,
      currency: req.body.currency,
      notes: req.body.notes,
      hearAboutUs: req.body.hearAboutUs,
      accommodation: req.body.accommodation,
      hotelCategory:
        req.body.accommodation === "with" && req.body.hotelCategory
          ? req.body.hotelCategory
          : null,
    });

    await inquiry.save();

    const accommodationText =
      inquiry.accommodation === "with"
        ? `With accommodation (${
            inquiry.hotelCategory
              ? inquiry.hotelCategory.replace("_", " ")
              : "N/A"
          })`
        : "Without accommodation";

    // -------- ADMIN EMAIL --------
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Tailor-Made Tour Inquiry: ${inquiry.fullName}`,
      html: `<p><strong>Accommodation:</strong> ${accommodationText}</p>`,
    });

    // -------- USER EMAIL --------
    await sendEmail({
      to: inquiry.email,
      subject: "Inquiry Received – Net Lanka Travels",
      html: `<p>Your inquiry has been received.</p><p><strong>Accommodation:</strong> ${accommodationText}</p>`,
    });

    res.status(201).json({
      message: "Inquiry saved successfully",
      data: inquiry,
    });
  } catch (err) {
    console.error("Inquiry save failed:", err);
    res.status(500).json({ message: "Failed to save inquiry" });
  }
});

// ---------------- GET ALL INQUIRIES (ADMIN) ----------------
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

// ---------------- UPDATE INQUIRY STATUS ----------------
router.put("/inquiries/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status)
      return res.status(400).json({ message: "Status is required" });

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry)
      return res.status(404).json({ message: "Inquiry not found" });

    res.json(inquiry);
  } catch (err) {
    console.error("Failed to update inquiry status:", err);
    res.status(500).json({ message: "Failed to update inquiry" });
  }
});

// ---------------- DELETE INQUIRY ----------------
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
