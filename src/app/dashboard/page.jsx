"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; 
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState("bookings");

//   // Protected Route Logic
//   useEffect(() => {
//     if (!isPending && !session?.user) {
//       router.push("/login");
//     }
//   }, [session, isPending, router]);

//   // Show a loading spinner while checking authentication
//   if (isPending || !session?.user) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#941865] border-t-transparent"></div>
//       </div>
//     );
//   }

  return (
    <div className="w-full min-h-[70vh] px-4 py-12 md:px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Title - Updated to h2 and Base Color */}
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-[#941865]">
          Dashboard
        </h2>

        {/* Tab Buttons Navigation */}
        <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-5">
          {/* My Bookings Button */}
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "bookings"
                ? "bg-[#941865] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FaCalendarAlt className="text-base" />
            My Bookings
          </button>

          {/* My Profile Button */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#941865] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FaUserAlt className="text-base" />
            My Profile
          </button>
        </div>

        {/* Dynamic Content Display Area */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-62.5 flex items-center justify-center text-center">
          {activeTab === "bookings" ? (
            <div className="space-y-2">
              <p className="text-xl font-medium text-gray-800">
                My Booking is coming
              </p>
              <p className="text-sm text-gray-400">
                Your future medical appointments will be managed here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xl font-medium text-gray-800">
                My Profile is coming
              </p>
              <p className="text-sm text-gray-400">
                Your personal details and medical records will be visible here.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}