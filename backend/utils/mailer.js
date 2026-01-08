require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail service
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your 16-character App Password
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter verification failed:", error);
  } else {
    console.log("✅ Email transporter is ready!");
  }
});

// Function to send email
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Net Lanka Travels" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent to", to, "MessageId:", info.messageId);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};

module.exports = sendEmail;
