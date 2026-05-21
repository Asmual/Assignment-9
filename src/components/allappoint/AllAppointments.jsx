"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FaStar, FaRegClock, FaMapMarkerAlt, FaStethoscope, FaSearch } from "react-icons/fa";

export default function AllAppointmentsClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);

    
        const res = await fetch("http://localhost:5000/api/doctors", {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
          setFilteredDoctors(data);
        } else {
          console.error("Server responded with an error status");
        }
      } catch (error) {
        console.error("Error connecting to server endpoints:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let result = [...doctors];

    if (searchQuery.trim() !== "") {
      result = result.filter((doctor) =>
        doctor.name && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "fee-low-to-high") {
      result.sort((a, b) => parseFloat(a.fee || 0) - parseFloat(b.fee || 0));
    } else if (sortBy === "fee-high-to-low") {
      result.sort((a, b) => parseFloat(b.fee || 0) - parseFloat(a.fee || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredDoctors(result);
  }, [searchQuery, sortBy, doctors]);


  const handleViewDetails = (id) => {
    if (isLoggedIn) {
      router.push(`/doctors/${id}`);
    } else {
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#941865] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Available <span style={{ color: "#941865" }}>Appointments</span>
        </h1>
        <p className="mt-2 text-xs md:text-sm text-gray-500">
          Explore all our verified doctors and schedule your visit instantly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 max-w-5xl mx-auto bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#941865] bg-white transition-colors"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2 justify-end">
          <span className="text-xs font-medium text-gray-600 shrink-0">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#941865] cursor-pointer text-gray-700 w-full sm:w-48"
          >
            <option value="">Default/No Sorting</option>
            <option value="fee-low-to-high">Fee: Low to High</option>
            <option value="fee-high-to-low">Fee: High to Low</option>
            <option value="rating">Popularity: High Rating</option>
          </select>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-400 font-medium bg-gray-50 rounded-xl border border-dashed border-gray-200 max-w-5xl mx-auto">
          No medical profiles match your current search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id || doctor.id}
              className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-56 w-full bg-gray-50 overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-w-7xl) 25vw"
                  priority={doctor.id === "doc-1" || doctor.id === "doc-2"}
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-800 shadow-sm flex items-center gap-1">
                  <FaStar className="text-amber-400" />
                  {doctor.rating}
                  <span className="text-[8px] text-gray-400 font-normal">({doctor.reviews})</span>
                </div>
              </div>

              <div className="p-4 flex flex-col grow gap-2.5">
                <div>
                  <h3 className="text-base font-bold text-gray-800 group-hover:text-[#941865] transition-colors line-clamp-1">
                    {doctor.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs font-semibold mt-0.5" style={{ color: "#941865" }}>
                    <FaStethoscope className="text-[10px]" />
                    <span className="truncate">{doctor.specialty}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-12 overflow-hidden">
                  {doctor.description || "No description provided for this specific doctor profile."}
                </p>

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

                <div className="border-b border-gray-150 my-0.5 w-full" />

                <div className="flex items-center justify-between mt-auto pt-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Fee</span>
                    <span className="text-sm font-extrabold" style={{ color: "#941865" }}>
                      ${doctor.fee}
                    </span>
                  </div>

                  <button
                    onClick={() => handleViewDetails(doctor._id || doctor.id)}
                    className="px-3 py-2 rounded-lg text-[11px] font-semibold text-white shadow-sm hover:opacity-90 active:scale-98 transition-all duration-200 shrink-0 cursor-pointer"
                    style={{ backgroundColor: "#941865" }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}