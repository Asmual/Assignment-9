"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { MdVisibility, MdVisibilityOff, MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

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

    // Execute password-based email sign-in using Better Auth client
    const { error: loginError } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
      callbackURL: "/",
    });

    if (loginError) {
      const msg = loginError.message || "Invalid credentials. Please try again.";
      setError(msg);
      toast.error(msg, { duration: 3000 });
      setLoading(false);
      return;
    }

    toast.success("Login Successful!", { duration: 3000 });
    setLoading(false);
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    try {
      // Execute continuous authentication flow via Google OAuth Provider
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        newUserCallbackURL: "/",
        prompt: "select_account", 
      });
    } catch (err) {
      toast.error("Google authentication failed. Please try again.", { duration: 3000 });
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold text-[#941865]">
        Login
      </h1>

      <p className="mb-6 text-center text-sm text-gray-500">
        Welcome back! Please login to your account.
      </p>

      {/* Render validation error block conditionally */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative flex items-center">
            <MdEmail className="absolute left-3 text-xl text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 text-sm outline-none transition-colors focus:border-[#941865]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <span className="cursor-pointer text-xs font-medium text-[#941865] hover:underline">
              Forgot Password?
            </span>
          </div>

          <div className="relative flex items-center">
            <MdLock className="absolute left-3 text-xl text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-10 text-sm outline-none transition-colors focus:border-[#941865]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer text-gray-400 transition-colors hover:text-[#941865]"
            >
              {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full cursor-pointer rounded-lg bg-[#941865] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-[#941865] hover:text-[#941865]"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-[#941865] hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}