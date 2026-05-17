"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; 
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn.email({
      email: form.email,
      password: form.password,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message || "Login failed. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/");
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
      <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#941865" }}>
        Login
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Welcome back! Please login to your account.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg py-2.5 px-4 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="border border-gray-300 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-[#941865] transition-colors"
          />
        </div>

        {/* Password with Show/Hide Eye Icon */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <span className="text-xs font-medium cursor-pointer hover:underline" style={{ color: "#941865" }}>
              Forgot Password?
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#941865] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-[#941865] transition-colors focus:outline-none"
            >
              {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-1"
          style={{ backgroundColor: "#941865" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>


      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:border-[#941865] hover:text-[#941865] transition-all duration-200"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold hover:underline" style={{ color: "#941865" }}>
          Register
        </Link>
      </p>
    </div>
  );
}