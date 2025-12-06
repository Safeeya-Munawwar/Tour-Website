import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  // ------------------ FORM STATE ------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  // ------------------ HANDLE LOGIN ------------------
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Fake admin login credentials
    if (email === "admin@gmail.com" && password === "12345") {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/images/12.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Box */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 
          p-8 rounded-2xl shadow-xl w-[90%] max-w-[420px] text-center text-white"
      >
        <h2 className="text-3xl font-light mb-2 font-serif-custom">
          Admin Login
        </h2>
        <p className="text-sm text-gray-200 mb-6">
          Secure access for authorized administrators
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 bg-red-900/30 border border-red-400/30 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Inputs */}
        <div className="flex flex-col space-y-4 text-left">
          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white 
                placeholder-gray-200 outline-none"
              placeholder="Enter admin email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Password</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white 
                  placeholder-gray-200 outline-none"
                placeholder="Enter password"
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-4 cursor-pointer opacity-80 hover:opacity-100"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#487898] hover:bg-[#0c3956] 
              rounded-lg font-light text-white flex items-center justify-center gap-2
              transition"
          >
            <Lock className="w-4" /> Login
          </button>
        </div>
      </form>
    </div>
  );
}
