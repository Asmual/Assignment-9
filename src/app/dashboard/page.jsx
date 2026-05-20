"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import MyProfile from "./_components/MyProfile";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#941865] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[70vh] px-4 py-10 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-8">

        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-[#941865]">
          Dashboard
        </h2>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          
          {/* --- My Bookings Button --- */}
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "bookings"
                ? "bg-[#941865] text-white shadow-md border border-[#941865]"
                : "bg-white text-gray-700 hover:bg-red-50/20" 
            }`}
            style={activeTab !== "bookings" ? { borderColor: "#941865", borderWidth: "1px" } : {}}
          >
            <FaCalendarAlt className="text-base" />
            My Bookings
          </button>

          {/* --- My Profile Button --- */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#941865] text-white shadow-md border border-[#941865]"
                : "bg-white text-gray-700 hover:bg-red-50/20"
            }`}
            style={activeTab !== "profile" ? { borderColor: "#941865", borderWidth: "1px" } : {}}
          >
            <FaUserAlt className="text-base" />
            My Profile
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "bookings" ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-64 flex items-center justify-center text-center">
              <div className="space-y-2">
                <p className="text-xl font-medium text-gray-800">My Bookings coming soon</p>
                <p className="text-sm text-gray-400">Your future medical appointments will be managed here.</p>
              </div>
            </div>
          ) : (
            <MyProfile user={session.user} />
          )}
        </div>

      </div>
    </div>
  );
}