import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const role = sessionStorage.getItem("resetRole") || "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const endpoint = role === "superadmin" ? "/super-admin/forgot-password" : "/admin/forgot-password";

      const res = await axiosInstance.post(endpoint, { email });

      setSuccess(res.data.message || "Password reset email sent successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-[90%] max-w-[400px] text-white" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {error && <p className="text-red-400 bg-red-900/30 px-3 py-2 rounded mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-400 bg-green-900/30 px-3 py-2 rounded mb-4 text-sm">{success}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white/20 outline-none mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 rounded-lg flex items-center justify-center"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
