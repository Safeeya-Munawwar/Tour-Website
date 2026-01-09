const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/mailer");

// ------------------ Request Password Reset ------------------
router.post("/request-reset", async (req, res) => {
  try {
    const { email, role } = req.body;

    const user = role === "superadmin"
      ? await SuperAdmin.findOne({ email })
      : await Admin.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600 * 1000; 
    await user.save();

    const urlRole = role === "superadmin" ? "super-admin" : "admin";

    const resetUrl = `${process.env.PRODUCTION_WEB_URL}/${urlRole}/change-password?token=${resetToken}&id=${user._id}&role=${role}`;
    
    const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        
        <h2 style="color: #0d203a; margin-bottom: 10px;">Password Reset Request</h2>
   
        <p style="font-size: 15px; color: #333;">
          Hello <strong>${user.name || "User"}</strong>,
        </p>
  
        <p style="font-size: 14px; color: #333; line-height: 1.6;">
          We received a request to reset the password for your 
          <strong>NetLanka Travels ${role === "superadmin" ? "Super Admin" : "Admin"}</strong> account.
        </p>
  
        <p style="font-size: 14px; color: #333; line-height: 1.6;">
          Click the button below to securely set a new password:
        </p>
  
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #0d203a; color: #ffffff; padding: 12px 26px; 
                    text-decoration: none; font-weight: bold; border-radius: 5px; 
                    display: inline-block;">
            Reset Password
          </a>
        </div>
  
        <p style="font-size: 13px; color: #555;">
          ⏱ This link will expire in <strong>1 hour</strong> for security reasons.
        </p>
  
        <p style="font-size: 13px; color: #555; line-height: 1.6;">
          If you did not request a password reset, please ignore this email.  
          Your account will remain secure.
        </p>
  
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 25px 0;">
  
        <p style="font-size: 12px; color: #777;">
          Best regards,<br>
          <strong>NetLanka Travels Support Team</strong><br>
          <span style="color: #999;">This is an automated message. Please do not reply.</span>
        </p>
  
      </div>
    </div>
  `;  

    await sendEmail({
      to: user.email,
      subject: "Net Lanka Travels - Password Reset",
      html,
    });
    console.log("RESET REQUEST:", email, role);
    console.log("RESET URL:", resetUrl);
    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("❌ Password reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ Reset Password ------------------
// ------------------ Reset Password ------------------
router.post("/reset-password", async (req, res) => {
    try {
      const { userId, token, newPassword, role } = req.body;
  
      const user =
        role === "superadmin"
          ? await SuperAdmin.findById(userId)
          : await Admin.findById(userId);
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
  
      if (
        user.resetPasswordToken !== hashedToken ||
        user.resetPasswordExpires < Date.now()
      ) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      // ✅ LET MODEL HANDLE HASHING
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.json({ message: "Password updated successfully" });
    } catch (err) {
      console.error("❌ Reset password error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
