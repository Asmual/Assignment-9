import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;

// Backend থেকে JWT নিয়ে localStorage এ রাখার helper
export async function fetchAndStoreToken(user) {
  try {
    const res = await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, name: user.name }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem("docappoint_token", data.token);
    }
  } catch (err) {
    console.error("Token fetch failed:", err);
  }
}

export function getStoredToken() {
  return localStorage.getItem("docappoint_token");
}

export function clearStoredToken() {
  localStorage.removeItem("docappoint_token");
}