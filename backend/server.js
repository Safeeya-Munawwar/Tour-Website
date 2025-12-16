require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const aboutRoute = require("./routes/about");
const teamRoute = require("./routes/team");
const journeyRoute = require("./routes/journey");
const communityRoute = require("./routes/communityImpact");
const destinationRoute = require("./routes/destination");
const experienceRoutes = require("./routes/experience");
const blogRoutes = require("./routes/blog");
const tailorMadeTourRoutes = require("./routes/tailorMadeTourRoutes");
const emailRoutes = require("./routes/emailRoutes");
const dayTourRoutes = require("./routes/dayTour");
const roundToursRouter = require("./routes/roundTours");
const contactRoute = require("./routes/contact");
const contactFormRoute = require("./routes/contactForm");
const homeRoute = require("./routes/home");
const BlogCommentRoute = require("./routes/blogComments");
const testimonialRoute = require("./routes/testimonials");
const reviewRoute = require("./routes/review");
const dayTourBookingRoute = require("./routes/dayTourBooking");
const roundTourBookingRoute = require("./routes/roundTourBooking");
const Admin = require("./models/Admin");
const tourBookingRoute = require("./routes/tourBookings");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/round-tours", roundToursRouter);
app.use("/api/day-tours", dayTourRoutes);
app.use("/api/about", aboutRoute);
app.use("/api/team", teamRoute);
app.use("/api/journey", journeyRoute);
app.use("/api/communityImpact", communityRoute);
app.use("/api/destination", destinationRoute);
app.use("/api/experience", experienceRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/tailor-made-tours", tailorMadeTourRoutes);
app.use("/api/send-email", emailRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/contact-form", contactFormRoute);
app.use("/api/home", homeRoute);
app.use("/api/blog-comments", BlogCommentRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/day-tour-booking", dayTourBookingRoute);
app.use("/api/round-tour-booking", roundTourBookingRoute);
app.use("/api/book-tour", tourBookingRoute);

// ----------------- LOGIN ROUTE -----------------
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- PROTECTED ROUTE EXAMPLE -----------------
app.get("/api/admin/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome admin ${decoded.email}` });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
