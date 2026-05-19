"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { MdPerson, MdEmail, MdEdit, MdClose } from "react-icons/md";

export default function MyProfile({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { error } = await authClient.updateUser({ name });

    if (error) {
      setError(error.message || "Update failed. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess("Profile updated successfully!");
    setLoading(false);

 
    setTimeout(() => {
      setModalOpen(false);
      setSuccess("");
    }, 2000);
  };

  return (
    <>
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          {/* Avatar */}
          <div className="shrink-0">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-4"
              style={{ borderColor: "#941865" }}
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-3xl font-bold"
                  style={{ backgroundColor: "#941865" }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
              <button
                onClick={() => {
                  setName(user?.name || "");
                  setModalOpen(true);
                }}
                className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                style={{ backgroundColor: "#941865" }}
              >
                <MdEdit className="text-base" />
                Update Profile
              </button>
            </div>

            {/* Name Field */}
            <div className="flex items-center gap-3 bg-pink-50 rounded-xl p-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FDE8F3" }}
              >
                <MdPerson className="text-xl" style={{ color: "#941865" }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-3 bg-pink-50 rounded-xl p-4">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">

            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose className="text-2xl" />
            </button>

            <h3 className="text-xl font-bold mb-1" style={{ color: "#941865" }}>
              Update Profile
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              You can only update your name.
            </p>

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg py-2.5 px-4 mb-4">
                {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg py-2.5 px-4 mb-4">
                {error}
              </div>
            )}

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
                    className="w-full border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-all mt-1"
                style={{ backgroundColor: "#941865" }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}