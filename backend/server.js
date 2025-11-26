require("dotenv").config(); // load .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const aboutRoute = require("./routes/about"); // CommonJS version

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for form data

// Routes
app.use("/api/about", aboutRoute);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
