import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic front-end validation
    if (!email || !password) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });          

      // Assuming response returns a token
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative bg-gray-900"
      style={{
        backgroundImage: `url('/images/12.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 
        p-10 rounded-2xl shadow-xl w-[90%] max-w-[400px] text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-2 font-serif-custom">Admin Login</h2>
        <p className="text-gray-200 mb-6 text-sm">
          Secure access for authorized administrators
        </p>

        {error && (
          <p className="text-red-400 bg-red-900/30 border border-red-400/30 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="flex flex-col space-y-4 text-left">
          <div>
            <label className="text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer opacity-80 hover:opacity-100"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <button
              type="button"
              className="text-blue-400 hover:underline"
              onClick={() => alert("Redirect to forgot password page")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 
              rounded-lg font-medium text-white flex items-center justify-center gap-2
              transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <Lock className="w-4" /> {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
