"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "animate.css";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center select-none overflow-hidden">
      
 
      <div className="animate__animated animate__bounceIn">
        <h1 
          className="text-9xl md:text-[11rem] font-extrabold tracking-tight leading-none"
          style={{ color: "#941865" }}
        >
          404
        </h1>
      </div>

 
      <div className="mt-4 max-w-sm animate__animated animate__fadeInUp animate__delay-1s">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight mb-2">
          Page Not Found
        </h2>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6 px-2">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

 
        <Link
          href="/"
          className="inline-block text-xs md:text-sm font-semibold text-[#941865] border border-[#941865] rounded-xl py-2.5 px-6 relative overflow-hidden group transition-colors duration-300 ease-out hover:text-white shadow-sm"
        >
 
          <span className="absolute inset-0 w-full h-full bg-[#941865] transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0" />
 
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            ← Back to Home
          </span>
        </Link>
      </div>

    </div>
  );
}