"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; 
import { toast } from "react-hot-toast"; 
import { MdPerson, MdEmail, MdEdit, MdClose } from "react-icons/md";

export default function MyProfile({ user }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Name validation check
    if (!name.trim()) {
      toast.error("Name cannot be empty or just spaces!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({ name: name.trim() });

      if (error) {
        toast.error(error.message || "Update failed. Please try again.");
        return;
      }

      toast.success("Profile updated successfully!");
      
      // Force Next.js to refresh the server/session data so changes reflect everywhere immediately
      router.refresh(); 

      // Close modal gracefully after a brief delay
      setTimeout(() => {
        setModalOpen(false);
      }, 500);

    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Safe fallback character for avatar initial
  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "?";

  return (
    <>
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          {/* Avatar */}
          <div className="shrink-0">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-4 flex items-center justify-center text-white text-3xl font-bold select-none shadow-inner"
              style={{ borderColor: "#941865", backgroundColor: "#941865" }}
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User Profile"}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority // Ensures avatar loads instantly
                />
              ) : (
                userInitial
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
              <button
                onClick={() => {
                  setName(user?.name || "");
                  setModalOpen(true);
                }}
                className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                style={{ backgroundColor: "#941865" }}
              >
                <MdEdit className="text-base" />
                Update Profile
              </button>
            </div>

            {/* Name Field */}
            <div className="flex items-center gap-3 bg-pink-50/40 rounded-xl p-4 border border-pink-50">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FDE8F3" }}
              >
                <MdPerson className="text-xl" style={{ color: "#941865" }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">{user?.name || "N/A"}</p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-3 bg-pink-50/40 rounded-xl p-4 border border-pink-50">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FDE8F3" }}
              >
                <MdEmail className="text-xl" style={{ color: "#941865" }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative mx-4 animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-50"
            >
              <MdClose className="text-2xl" />
            </button>

            <h3 className="text-xl font-bold mb-1" style={{ color: "#941865" }}>
              Update Profile
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              You can only update your name.
            </p>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">

              {/* Name - Editable */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative flex items-center">
                  <MdPerson className="absolute left-3 text-gray-400 text-xl" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={50}
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#941865] transition-colors"
                  />
                </div>
              </div>

              {/* Email - Read Only */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                  <span className="ml-2 text-xs text-gray-400 font-normal">(cannot be changed)</span>
                </label>
                <div className="relative flex items-center">
                  <MdEmail className="absolute left-3 text-gray-400 text-xl" />
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none select-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-all mt-1 cursor-pointer flex items-center justify-center min-h-10"
                style={{ backgroundColor: "#941865" }}
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}