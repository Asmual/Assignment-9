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



// JWT TOKEN STORE HELPER
export async function fetchAndStoreToken(user) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jwt`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
        }),
      }
    );

    const data = await res.json();

    if (data.success && data.token) {
      localStorage.setItem(
        "docappoint_token",
        data.token
      );
    }

  } catch (err) {
    console.error("Token fetch failed:", err);
  }
}



// GET TOKEN
export function getStoredToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("docappoint_token");
  }
  return null;
}



// CLEAR TOKEN

export function clearStoredToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("docappoint_token");
  }
}