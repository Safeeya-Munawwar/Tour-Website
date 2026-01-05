require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const SuperAdmin = require("./models/SuperAdmin");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Remove old users
    await Admin.deleteMany({});
    await SuperAdmin.deleteMany({});

    // Create Admin
    await Admin.create({
      name: "Net Lanka Admin",
      email: "netlankaadmin@gmail.com",
      password: "NetAdmin123", // will be hashed automatically
    });

    // Create SuperAdmin
    await SuperAdmin.create({
      name: "Net Lanka Super Admin",
      email: "netlankasuperadmin@gmail.com",
      password: "NetSuperAdmin123", // will be hashed automatically
    });

    console.log("Default Admin and Super Admin created!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.disconnect();
  }
}

seed();
