require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
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
const tourBookingRoute = require("./routes/tourBookings");
const loginRoute = require("./routes/login"); 
const tourReviewsRoutes = require("./routes/tourReviews");
const eventRoutes = require("./routes/event");
const eventTourBookingRoutes = require("./routes/eventTourBooking");
// Import allowedOrigins
const allowedOrigins = require("./config/cors.config");

const app = express();

// -------------------- MIDDLEWARE --------------------

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Serve uploads folder
app.use("/uploads", express.static("uploads"));

// -------------------- ROUTES --------------------

// Admin login
app.use("/api/admin", loginRoute);

// Other routes
app.use("/api/events", eventRoutes);
app.use("/api/event-tour-booking", eventTourBookingRoutes);
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
app.use("/api/tour-reviews", tourReviewsRoutes);

// -------------------- CONNECT TO MONGODB --------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// -------------------- START SERVER --------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
