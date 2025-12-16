require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const createAdmin = async () => {
  const existing = await Admin.findOne({ email: "admin@gmail.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const admin = new Admin({
    email: "admin@gmail.com",
    password: "12345", 
  });

  await admin.save();
  console.log("Admin created");
  process.exit();
};

createAdmin();
