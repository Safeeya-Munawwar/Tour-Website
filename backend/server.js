const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

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

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
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
