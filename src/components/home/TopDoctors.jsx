// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/auth-client"; 
// import { FaStar, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";


// const topDoctors = [
//   {
//     id: "doc-1",
//     name: "Dr. Asmual Obaidul",
//     specialty: "Cardiologist",
//     rating: 4.9,
//     reviews: 120,
//     image: "/images/doctor1.jpg",
//     experience: "10 Years exp",
//     location: "Dhaka, Bangladesh",
//   },
//   {
//     id: "doc-2",
//     name: "Dr. Sarah Taylor",
//     specialty: "Pediatrician",
//     rating: 4.8,
//     reviews: 95,
//     image: "/images/doctor2.jpg",
//     experience: "8 Years exp",
//     location: "Chittagong, Bangladesh",
//   },
//   {
//     id: "doc-3",
//     name: "Dr. John Doe",
//     specialty: "Dermatologist",
//     rating: 4.7,
//     reviews: 84,
//     image: "/images/doctor3.jpg",
//     experience: "7 Years exp",
//     location: "Cox's Bazar, Bangladesh",
//   },
// ];

// export default function TopDoctors() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const isLoggedIn = !!session?.user;

//   const handleViewDetails = (id) => {
//     if (isLoggedIn) {

//       router.push(`/doctors/${id}`);
//     } else {

//       router.push("/login");
//     }
//   };

//   return (
//     <section className="py-16 bg-gray-50/50 w-full">
//       <div className="max-w-7xl mx-auto px-6">
        

//         <div className="text-center max-w-xl mx-auto mb-12">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
//             Our <span style={{ color: "#941865" }}>Top Rated</span> Doctors
//           </h2>
//           <p className="mt-3 text-sm md:text-base text-gray-500">
//             Consult with our highest-rated specialists trusted by thousands of patients.
//           </p>
//         </div>


//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {topDoctors.map((doctor) => (
//             <div
//               key={doctor.id}
//               className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group"
//             >

//               <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
//                 <Image
//                   src={doctor.image}
//                   alt={doctor.name}
//                   fill
//                   sizes="(max-w-7xl) 33vw"
//                   className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
//                 />

//                 <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-gray-800 shadow-sm flex items-center gap-1.5">
//                   <FaRegClock style={{ color: "#941865" }} /> {doctor.experience}
//                 </span>
//               </div>


//               <div className="p-6 flex flex-col gap-4">
//                 <div>

//                   <div className="flex items-center justify-between mb-1.5">
//                     <span 
//                       className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-50"
//                       style={{ color: "#941865" }}
//                     >
//                       {doctor.specialty}
//                     </span>
//                     <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
//                       <FaStar className="text-amber-400" />
//                       {doctor.rating}
//                       <span className="text-xs text-gray-400 font-normal">({doctor.reviews})</span>
//                     </div>
//                   </div>

   
//                   <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#941865] transition-colors">
//                     {doctor.name}
//                   </h3>
//                 </div>

 
//                 <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
//                   <FaMapMarkerAlt className="text-gray-400" />
//                   <span>{doctor.location}</span>
//                 </div>

 
//                 <button
//                   onClick={() => handleViewDetails(doctor.id)}
//                   className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 relative overflow-hidden group/btn"
//                   style={{ 
//                     borderColor: "#941865", 
//                     color: "#941865" 
//                   }}
//                 >
//                   <span className="absolute inset-0 w-full h-full bg-[#941865] transition-transform duration-300 ease-out -translate-x-full group-hover/btn:translate-x-0" />
//                   <span className="relative z-10 group-hover/btn:text-white transition-colors duration-200">
//                     View Details
//                   </span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }