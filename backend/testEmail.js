require("dotenv").config();
const mongoose = require("mongoose");
const sendEmail = require("./utils/mailer");
const Newsletter = require("./models/Newsletter");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

(async () => {
  try {
    const email = "shafiyamunawwar123@gmail.com";

    // Check if email exists
    let subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      subscription = await Newsletter.create({ email });
      console.log("Saved to DB");
    } else {
      console.log("Email already exists in DB");
    }

    // Send admin email
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Admin test email",
      html: `<p>New subscriber: ${email}</p>`,
    });
    console.log("Admin email sent");

    // Send user email
    await sendEmail({
      to: email,
      subject: "User test email",
      html: `<p>Thank you for subscribing!</p>`,
    });
    console.log("User email sent");

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    mongoose.disconnect();
  }
})();
