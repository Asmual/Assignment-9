"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getStoredToken } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
    FaStar, FaRegClock, FaMapMarkerAlt, FaStethoscope,
    FaArrowLeft, FaMoneyBillWave, FaTimes, FaUser,
    FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaVenusMars
} from "react-icons/fa";

export default function DoctorDetailsPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const doctorId = params.id;

    const { data: session } = useSession();
    const currentUser = session?.user;

    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        phone: "",
        gender: "Male",
        appointmentDate: "",
        notes: ""
    });

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                setIsLoading(true);

                const token = getStoredToken();

                const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
    
                        ...(token && { "Authorization": `Bearer ${token}` }),
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setDoctor(data);
                } else {
                    console.error("Failed to load doctor profile:", data.message);
                    toast.error(data.message || "Failed to load doctor profile");
                }
            } catch (error) {
                console.error("Error fetching doctor details:", error);
                toast.error("Network error. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (doctorId) {
            fetchDoctorDetails();
        }
    }, [doctorId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = getStoredToken();

        const appointmentDetails = {
            id: doctor.id || doctor._id,
            doctorName: doctor.name,
            doctorImage: doctor.image,
            doctorSpecialty: doctor.specialty,
            patientName: currentUser?.name || "Guest Patient",
            email: currentUser?.email || "No Email Provided",
            patientPhone: formData.phone,
            patientGender: formData.gender,
            appointmentDate: formData.appointmentDate,
            notes: formData.notes,
            fee: doctor.fee
        };

        try {
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` }),
                },
                body: JSON.stringify(appointmentDetails)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success(`Appointment with ${doctor.name} confirmed!`, {
                    duration: 4000,
                    style: {
                        background: "#ffffff",
                        color: "#1e293b",
                        fontSize: "13px",
                        fontWeight: "600",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                    },
                    iconTheme: { primary: "green", secondary: "#fff" }
                });
                setIsModalOpen(false);
                setFormData({ phone: "", gender: "Male", appointmentDate: "", notes: "" });
            } else {
                toast.error(result.message || "Failed to process appointment.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error("Server connection lost. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#941865] border-t-transparent"></div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Doctor Profile Not Found</h2>
                <p className="text-gray-500 mt-2 text-sm">The requested medical profile might have been relocated or removed.</p>
                <Link
                    href="/all-appointments"
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#941865] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all"
                >
                    <FaArrowLeft /> Back to Appointments
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white py-8 px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="relative h-80 w-full md:h-96 rounded-2xl overflow-hidden border border-gray-150 shadow-sm bg-gray-50">
                        <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            priority
                            sizes="(max-w-4xl) 33vw"
                            className="object-cover object-top"
                        />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-5">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                {doctor.name}
                            </h1>
                            <div className="flex items-center gap-1.5 text-sm font-bold mt-2" style={{ color: "#941865" }}>
                                <FaStethoscope />
                                <span>{doctor.specialty} Specialist</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center bg-gray-50/60 border border-gray-100 rounded-xl p-4 text-xs md:text-sm text-gray-700">
                            <div className="flex items-center gap-1">
                                <FaStar className="text-amber-400 text-base" />
                                <span className="font-bold">{doctor.rating}</span>
                                <span className="text-gray-400">({doctor.reviews} verified reviews)</span>
                            </div>
                            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                            <div className="flex items-center gap-1.5 font-medium">
                                <FaRegClock className="text-gray-400" />
                                <span>{doctor.experience}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Professional Statement</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {doctor.description || "No professional statement available."}
                            </p>
                        </div>

                        <div className="border-b border-gray-150 my-1 w-full" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-gray-800 block mb-0.5">Chamber Location</span>
                                    <span>{doctor.location}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <FaRegClock className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-gray-800 block mb-0.5">Chamber Timing</span>
                                    <span>{doctor.availableTime}</span>
                                    <span className="text-xs text-red-500 block mt-0.5 font-medium">
                                        Closed on: {doctor.offDays?.join(", ")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <FaMoneyBillWave className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-gray-800 block mb-0.5">Consultation Fee</span>
                                    <span className="font-extrabold text-base" style={{ color: "#941865" }}>${doctor.fee}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer mt-3 w-1/2 sm:w-110 px-6 py-3 text-white text-xs font-bold rounded-xl shadow-md hover:opacity-90 active:scale-98 transition-all tracking-wider uppercase text-center"
                            style={{ backgroundColor: "#941865" }}
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col my-5 max-h-[calc(100vh-40px)]">
                        <div className="p-4 text-white flex items-center justify-between shrink-0" style={{ backgroundColor: "#941865" }}>
                            <div>
                                <h3 className="font-bold text-sm">Confirm Appointment</h3>
                                <p className="text-[10px] text-white/80 mt-0.5">With {doctor.name}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white/80 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/10"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-4 overflow-y-auto flex flex-col gap-3">
                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Patient Name</label>
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500">
                                    <FaUser className="text-gray-400 shrink-0 text-[10px]" />
                                    <input type="text" value={currentUser?.name || "Guest Account"} disabled className="bg-transparent w-full focus:outline-none cursor-not-allowed text-xs" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500">
                                    <FaEnvelope className="text-gray-400 shrink-0 text-[10px]" />
                                    <input type="email" value={currentUser?.email || "guest@healthcare.com"} disabled className="bg-transparent w-full focus:outline-none cursor-not-allowed text-xs" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Mobile <span className="text-red-500">*</span></label>
                                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:border-[#941865] transition-colors">
                                        <FaPhoneAlt className="text-gray-400 shrink-0 text-[10px]" />
                                        <input type="tel" name="phone" placeholder="01XXXXXXXXX" required value={formData.phone} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Gender <span className="text-red-500">*</span></label>
                                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:border-[#941865] transition-colors">
                                        <FaVenusMars className="text-gray-400 shrink-0 text-[10px]" />
                                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none cursor-pointer text-xs">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Preferred Date <span className="text-red-500">*</span></label>
                                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:border-[#941865] transition-colors">
                                    <FaCalendarAlt className="text-gray-400 shrink-0 text-[10px]" />
                                    <input type="date" name="appointmentDate" required value={formData.appointmentDate} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none cursor-pointer text-xs" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Symptoms / Notes</label>
                                <textarea name="notes" rows="2" placeholder="Briefly describe your symptoms..." value={formData.notes} onChange={handleInputChange} className="bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-800 focus:outline-none focus:border-[#941865] transition-colors resize-none" />
                            </div>

                            <div className="bg-gray-50 border border-gray-150 rounded-xl p-2.5 flex items-center justify-between text-xs mt-1">
                                <span className="text-gray-500 font-medium">Total Consultation Fee</span>
                                <span className="font-extrabold text-xs" style={{ color: "#941865" }}>${doctor.fee}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="cursor-pointer py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting} className="cursor-pointer py-2 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-75" style={{ backgroundColor: "#941865" }}>
                                    {isSubmitting ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : "Confirm Booking"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}