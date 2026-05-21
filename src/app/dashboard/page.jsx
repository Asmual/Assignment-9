"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { 
    FaCalendarAlt, 
    FaUserAlt, 
    FaEdit, 
    FaTrashAlt, 
    FaTimes, 
    FaClock, 
    FaNotesMedical,
    FaExclamationTriangle
} from "react-icons/fa";
import MyProfile from "./_components/MyProfile";

// Global Production/Development Backend API Endpoint configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://assignment-9-server-ybq9.onrender.com";

export default function DashboardPage() {
    const router = useRouter();
    
    // Fetch stateful client-side session context via BetterAuth hook
    const { data: session, isPending } = useSession();
    const currentUser = session?.user;

    // Component Core States
    const [activeTab, setActiveTab] = useState("bookings");
    const [bookings, setBookings] = useState([]);
    const [isLoadingBookings, setIsLoadingBookings] = useState(true);
    
    // State management structures for Data Modification (PATCH Modal)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({
        patientName: "",
        appointmentDate: "",
        appointmentTime: "",
        notes: ""
    });

    // State management structures for Data Deletion (DELETE Modal)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

    /**
     * Hook 1: Enforces client-side Route Protection.
     * Redirects unauthenticated entities to login sequence once async session state settles.
     */
    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    /**
     * Hook 2: Handles Data Hydration.
     * Dispatches secure async HTTP GET requests to retrieve user-specific records from MongoDB.
     */
    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                setIsLoadingBookings(true);

                // Retrieve explicit JSON Web Token fallback mechanism from local storage
                const token = localStorage.getItem("docappoint_token");

                const res = await fetch(`${BACKEND_URL}/api/bookings?email=${currentUser.email}`, {
                    credentials: "include", // Enforces cross-origin HTTP-Only cookie transfer (Vercel to Render)
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { "Authorization": `Bearer ${token}` }),
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setBookings(data.bookings || data);
                } else {
                    const err = await res.json();
                    toast.error(err.message || "Failed to load bookings.");
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
                toast.error("Failed to load bookings from server.");
            } finally {
                setIsLoadingBookings(false);
            }
        };

        if (!isPending && currentUser?.email) {
            fetchUserBookings();
        }
    }, [currentUser, isPending]);

    /**
     * Network Action: Executes secure HTTP DELETE method.
     * Dispatches operational entity payload targeting individual Document IDs in MongoDB.
     */
    const handleConfirmDelete = async () => {
        if (!bookingToDelete) return;
        setIsSubmittingDelete(true);

        try {
            const token = localStorage.getItem("docappoint_token");

            const res = await fetch(`${BACKEND_URL}/api/bookings/${bookingToDelete._id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` }),
                }
            });
            const result = await res.json();

            if (res.ok && result.success) {
                toast.success("Appointment canceled successfully.");
                // Optimistic UI update: Filter out state without demanding fresh network overhead
                setBookings((prev) => prev.filter((item) => item._id !== bookingToDelete._id));
                setIsDeleteModalOpen(false);
                setBookingToDelete(null);
            } else {
                toast.error(result.message || "Failed to delete appointment.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Server connection lost. Could not delete.");
        } finally {
            setIsSubmittingDelete(false);
        }
    };

    /**
     * UI Action: Binds individual database row values directly onto the operational input form state.
     */
    const openUpdateModal = (booking) => {
        setSelectedBooking(booking);
        setUpdateFormData({
            patientName: booking.patientName,
            appointmentDate: booking.appointmentDate || booking.date || "",
            appointmentTime: booking.appointmentTime || booking.time || "12:00",
            notes: booking.notes || ""
        });
        setIsUpdateModalOpen(true);
    };

    /**
     * Network Action: Transmits secure payload optimizations via upstream HTTP PATCH.
     * Persists altered scheduling models safely to back-end controllers.
     */
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingUpdate(true);

        try {
            const token = localStorage.getItem("docappoint_token");

            const res = await fetch(`${BACKEND_URL}/api/bookings/${selectedBooking._id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` }),
                },
                body: JSON.stringify(updateFormData)
            });
            const result = await res.json();

            if (res.ok && result.success) {
                toast.success("Appointment changes saved successfully.");
                // Sync state engine cleanly with backend confirmations dynamically
                setBookings((prev) =>
                    prev.map((item) =>
                        item._id === selectedBooking._id
                            ? { ...item, ...updateFormData }
                            : item
                    )
                );
                setIsUpdateModalOpen(false);
            } else {
                toast.error(result.message || "Failed to update appointment details.");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Server connection error. Failed to save changes.");
        } finally {
            setIsSubmittingUpdate(false);
        }
    };

    // Render Layer: Display centralized, animated medical loader while processing async session payloads
    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#941865] border-t-transparent"></div>
            </div>
        );
    }

    // Circuit breaker protecting page flashing for unauthorized requests
    if (!session?.user) return null;

    return (
        <div className="w-full min-h-[70vh] px-4 py-10 md:px-6 bg-white">
            <div className="max-w-6xl mx-auto space-y-8">

                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-[#941865]">
                    Dashboard
                </h2>

                {/* Sub-Navigation/Tab Controllers Container */}
                <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            activeTab === "bookings"
                                ? "bg-[#941865] text-white shadow-md border border-[#941865]"
                                : "bg-white text-[#941865] hover:bg-red-50/20"
                        }`}
                        style={activeTab !== "bookings" ? { borderColor: "#941865", borderWidth: "1px" } : {}}
                    >
                        <FaCalendarAlt className="text-base" />
                        My Bookings
                    </button>

                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            activeTab === "profile"
                                ? "bg-[#941865] text-white shadow-md border border-[#941865]"
                                : "bg-white text-[#941865] hover:bg-red-50/20"
                        }`}
                        style={activeTab !== "profile" ? { borderColor: "#941865", borderWidth: "1px" } : {}}
                    >
                        <FaUserAlt className="text-base" />
                        My Profile
                    </button>
                </div>

                {/* Render view contents dynamically based on active dashboard view state */}
                <div>
                    {activeTab === "bookings" ? (
                        isLoadingBookings ? (
                            <div className="flex justify-center items-center min-h-64">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#941865] border-t-transparent"></div>
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-64 flex items-center justify-center text-center">
                                <div className="space-y-2">
                                    <p className="text-xl font-medium text-gray-800">No appointments found</p>
                                    <p className="text-sm text-gray-400">You have not scheduled any medical visits yet.</p>
                                </div>
                            </div>
                        ) : (
                            /* Responsive Appointment Cards Layout Grid */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookings.map((booking) => (
                                    <div 
                                        key={booking._id} 
                                        className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                                    >
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-[#0f766e]">
                                                {booking.doctorName}
                                            </h3>
                                            <div className="space-y-2 text-xs md:text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FaUserAlt className="text-gray-400 shrink-0 text-xs" />
                                                    <span>Patient: <strong className="text-gray-800">{booking.patientName}</strong></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-gray-400 shrink-0 text-xs" />
                                                    <span>Date: <strong className="text-gray-800">{booking.appointmentDate || booking.date}</strong></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="text-gray-400 shrink-0 text-xs" />
                                                    <span>Time: <strong className="text-gray-800">{booking.appointmentTime || booking.time || "Not Set"}</strong></span>
                                                </div>
                                                {booking.notes && (
                                                    <div className="flex items-start gap-2 pt-1 border-t border-gray-50 mt-1">
                                                        <FaNotesMedical className="text-gray-400 shrink-0 text-xs mt-0.5" />
                                                        <span className="text-xs break-all">Reason: {booking.notes}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Row Modification Action Triggers */}
                                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                                            <button
                                                onClick={() => openUpdateModal(booking)}
                                                className="cursor-pointer flex items-center justify-center gap-1.5 py-2 border border-[#941865] text-xs font-semibold rounded-lg hover:bg-gray-50 text-[#941865] transition-colors"
                                            >
                                                <FaEdit className="text-xs" /> Update
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setBookingToDelete(booking);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="cursor-pointer flex items-center justify-center gap-1.5 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 shadow-sm transition-all"
                                            >
                                                <FaTrashAlt className="text-xs" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <MyProfile user={session.user} />
                    )}
                </div>
            </div>

            {/* Modal Overlay: Booking Record Patch Form Sequence */}
            {isUpdateModalOpen && selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col my-5 max-h-[calc(100vh-40px)]">
                        <div className="p-4 bg-[#941865] text-white flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="font-bold text-sm">Update Appointment</h3>
                                <p className="text-[10px] text-white/80 mt-0.5">Modify booking details</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsUpdateModalOpen(false);
                                    toast.error("Update canceled.");
                                }}
                                className="text-white/80 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="p-4 overflow-y-auto flex flex-col gap-4">
                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Doctor</label>
                                <input
                                    type="text"
                                    value={selectedBooking.doctorName}
                                    disabled
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 cursor-not-allowed focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Patient Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={updateFormData.patientName}
                                    onChange={(e) => setUpdateFormData({...updateFormData, patientName: e.target.value})}
                                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#941865] transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        required
                                        value={updateFormData.appointmentDate}
                                        onChange={(e) => setUpdateFormData({...updateFormData, appointmentDate: e.target.value})}
                                        className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#941865] cursor-pointer transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Time <span className="text-red-500">*</span></label>
                                    <input
                                        type="time"
                                        required
                                        value={updateFormData.appointmentTime}
                                        onChange={(e) => setUpdateFormData({...updateFormData, appointmentTime: e.target.value})}
                                        className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#941865] cursor-pointer transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Reason</label>
                                <textarea
                                    rows="3"
                                    value={updateFormData.notes}
                                    onChange={(e) => setUpdateFormData({...updateFormData, notes: e.target.value})}
                                    className="bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-800 focus:outline-none focus:border-[#941865] transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsUpdateModalOpen(false);
                                        toast.error("Update canceled.");
                                    }}
                                    disabled={isSubmittingUpdate}
                                    className="cursor-pointer py-2 rounded-xl border border-[#941865] text-xs font-semibold text-[#941865] hover:bg-gray-50 transition-colors text-center disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingUpdate}
                                    className="cursor-pointer py-2 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center disabled:opacity-75"
                                    style={{ backgroundColor: "#941865" }}
                                >
                                    {isSubmittingUpdate ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Overlay: Irreversible Row Deletion Confirmation Sequence */}
            {isDeleteModalOpen && bookingToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 flex flex-col items-center text-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl shrink-0">
                            <FaExclamationTriangle />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-gray-900">Cancel Appointment?</h3>
                            <p className="text-xs text-gray-500 px-2">
                                Are you sure you want to delete your booking with <span className="font-semibold text-gray-700">{bookingToDelete.doctorName}</span>? This operation cannot be undone.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setBookingToDelete(null);
                                    toast.error("Deletion canceled.");
                                }}
                                disabled={isSubmittingDelete}
                                className="cursor-pointer py-2 px-4 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors text-center disabled:opacity-50"
                            >
                                No, Keep it
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={isSubmittingDelete}
                                className="cursor-pointer py-2 px-4 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm transition-all flex items-center justify-center disabled:opacity-75"
                            >
                                {isSubmittingDelete ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                ) : (
                                    "Yes, Cancel"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}