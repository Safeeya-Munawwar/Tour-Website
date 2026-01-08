import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Lock } from "lucide-react";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const adminId = sessionStorage.getItem("resetAdminId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!adminId) {
      setError("Session expired. Please login again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/admin/reset-password", {
        adminId,
        newPassword: password,
      });

      sessionStorage.removeItem("resetAdminId");
      alert("Password updated successfully. Please login again.");
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-[90%] max-w-[400px] text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Change Password
        </h2>

        {error && (
          <p className="text-red-400 bg-red-900/30 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-white/20 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-white/20 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded-lg flex items-center justify-center gap-2"
          >
            <Lock size={16} />
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
