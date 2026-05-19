"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; 
import { topDoctors } from "@/data/doctors";
import { FaStar, FaRegClock, FaMapMarkerAlt, FaStethoscope } from "react-icons/fa";

// Mock data for 10 Bangladeshi doctors


export default function AllAppointmentsClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  // Handle routing based on user authentication state
  const handleViewDetails = (id) => {
    if (isLoggedIn) {
      router.push(`/doctors/${id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Available <span style={{ color: "#941865" }}>Appointments</span>
        </h1>
        <p className="mt-2 text-xs md:text-sm text-gray-500">
          Explore all our verified doctors and schedule your visit instantly.
        </p>
      </div>

      {/* 4-Column Grid Layout for Large Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {topDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Image Container with Restructured Aspect Ratio */}
            <div className="relative h-56 w-full bg-gray-50 overflow-hidden">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="(max-w-7xl) 25vw"
                priority={doctor.id === "doc-1" || doctor.id === "doc-2"}
                className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
              />

              {/* Absolute Rating Badge (Top Right Corner) */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-800 shadow-sm flex items-center gap-1">
                <FaStar className="text-amber-400" />
                {doctor.rating}
                <span className="text-[8px] text-gray-400 font-normal">({doctor.reviews})</span>
              </div>
            </div>

            {/* Content Details Container */}
            <div className="p-4 flex flex-col grow gap-2.5">
              <div>
                {/* Doctor Name */}
                <h3 className="text-base font-bold text-gray-800 group-hover:text-[#941865] transition-colors line-clamp-1">
                  {doctor.name}
                </h3>
                
                {/* Specialty Subtitle */}
                <div className="flex items-center gap-1 text-xs font-semibold mt-0.5" style={{ color: "#941865" }}>
                  <FaStethoscope className="text-[10px]" />
                  <span className="truncate">{doctor.specialty}</span>
                </div>
              </div>

              {/* Robust Description Paragraph preventing text clipping */}
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-12 overflow-hidden">
                {doctor.description || "No description provided for this specific doctor profile."}
              </p>

              {/* Metadata Info (Location & Experience) */}
              <div className="flex flex-col gap-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400 shrink-0 text-[10px]" />
                  <span className="truncate">{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegClock className="text-gray-400 shrink-0 text-[10px]" />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              {/* Divider Line */}
              <div className="border-b border-gray-100 my-0.5 w-full" />

              {/* Footer Section: Fee & Action Button */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Fee</span>
                  <span className="text-sm font-extrabold" style={{ color: "#941865" }}>
                    {doctor.fee}
                  </span>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => handleViewDetails(doctor.id)}
                  className="px-3 py-2 rounded-lg text-[11px] font-semibold text-white shadow-sm hover:opacity-90 active:scale-98 transition-all duration-200 shrink-0"
                  style={{ backgroundColor: "#941865" }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}