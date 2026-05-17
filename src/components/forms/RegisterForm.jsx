"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };


  const isMinLength = form.password.length >= 6;
  const hasUppercase = /[A-Z]/.test(form.password);
  const hasLowercase = /[a-z]/.test(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    if (!isMinLength) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!hasUppercase) {
      setError("Password must contain at least 1 uppercase letter.");
      return;
    }
    if (!hasLowercase) {
      setError("Password must contain at least 1 lowercase letter.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL || undefined,
    });

    if (error) {
      setError(error.message || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  const handleGoogleSignup = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-7 w-full max-w-md p-8">
      <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#941865" }}>
        Register
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Create your account to get started.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg py-2.5 px-4 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="border border-gray-300 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-[#941865] transition-colors"
          />
        </div>

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

        {/* Photo URL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Photo URL <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="border border-gray-300 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-[#941865] transition-colors"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Set your password"
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

          <div className="flex gap-1 mt-2 text-xs font-medium">
            <p className={isMinLength ? "text-green-600 transition-colors" : "text-gray-400"}>
              {isMinLength ? "✓" : "•"} Password Min 6 char.
            </p>
            <p className={hasUppercase ? "text-green-600 transition-colors" : "text-gray-400"}>
              {hasUppercase ? "✓" : "•"} 1 uppercase
            </p>
            <p className={hasLowercase ? "text-green-600 transition-colors" : "text-gray-400"}>
              {hasLowercase ? "✓" : "•"}1 lowercase
            </p>
          </div>
        </div>

        {/* Repeat Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Repeat Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            className="border border-gray-300 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-[#941865] transition-colors"
          />
          
          {/* Real-time Match Validation */}
          {form.confirmPassword.length > 0 && form.password !== form.confirmPassword && (
            <p className="text-red-500 text-xs font-medium mt-1">
              Passwords do not match.
            </p>
          )}
          {form.confirmPassword.length > 0 && form.password === form.confirmPassword && (
            <p className="text-green-600 text-xs font-medium mt-1">
              ✓ Passwords match!
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-1"
          style={{ backgroundColor: "#941865" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

  
      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:border-[#941865] hover:text-[#941865] transition-all duration-200"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>

      <p className="text-center text-gray-500 text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline" style={{ color: "#941865" }}>
          Login
        </Link>
      </p>
    </div>
  );
}