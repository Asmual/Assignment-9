"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { MdVisibility, MdVisibilityOff, MdPerson, MdEmail, MdLock, MdImage } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const isMinLength = form.password.length >= 6;
  const hasUppercase = /[A-Z]/.test(form.password);
  const hasLowercase = /[a-z]/.test(form.password);
  const passwordsMatch = form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isMinLength || !hasUppercase || !hasLowercase || !passwordsMatch) {
      const msg = "Please fulfill all password requirements.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);


    const { error: signUpError } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL || undefined,
    });

    if (signUpError) {
      const msg = signUpError.message || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }


    try {
      await authClient.signOut();
    } catch (signOutErr) {
      console.error("Auto-login prevention failed:", signOutErr);
    }


    toast.success("Registration Successful! Please login.", { duration: 3000 });
    setLoading(false);
    router.push("/login");
  };

  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({ 
        provider: "google", 
        callbackURL: "/",
        prompt: "select_account"
      });
    } catch (err) {
      toast.error("Google signup failed", { duration: 3000 });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg my-7 w-full max-w-md p-8">
      <h1 className="text-3xl font-bold text-center mb-2 text-[#941865]">
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
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="relative flex items-center">
            <MdPerson className="absolute left-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#941865] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative flex items-center">
            <MdEmail className="absolute left-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#941865] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Photo URL <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="relative flex items-center">
            <MdImage className="absolute left-3 text-gray-400 text-xl" />
            <input
              type="url"
              name="photoURL"
              value={form.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#941865] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative flex items-center">
            <MdLock className="absolute left-3 text-gray-400 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Set your password"
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 text-sm outline-none focus:border-[#941865] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-[#941865] transition-colors focus:outline-none cursor-pointer"
            >
              {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
            </button>
          </div>

          {form.password.length > 0 && (
            <div className="flex gap-3 mt-2 text-xs font-medium">
              <p className={isMinLength ? "text-green-600" : "text-gray-400"}>
                {isMinLength ? "✓" : "•"} Min 6 char
              </p>
              <p className={hasUppercase ? "text-green-600" : "text-gray-400"}>
                {hasUppercase ? "✓" : "•"} 1 uppercase
              </p>
              <p className={hasLowercase ? "text-green-600" : "text-gray-400"}>
                {hasLowercase ? "✓" : "•"} 1 lowercase
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Repeat Password</label>
          <div className="relative flex items-center">
            <MdLock className="absolute left-3 text-gray-400 text-xl" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 text-sm outline-none focus:border-[#941865] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-gray-400 hover:text-[#941865] transition-colors focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
            </button>
          </div>

          {form.confirmPassword.length > 0 && (
            <p className={`text-xs font-medium mt-1 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
              {passwordsMatch ? "✓ Passwords match!" : "✗ Passwords do not match."}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#941865] transition-opacity hover:opacity-90 disabled:opacity-60 mt-1 cursor-pointer"
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
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:border-[#941865] hover:text-[#941865] transition-all duration-200 cursor-pointer"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>

      <p className="text-center text-gray-500 text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline text-[#941865]">
          Login
        </Link>
      </p>
    </div>
  );
}