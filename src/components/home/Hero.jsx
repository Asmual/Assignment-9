"use client";

import Image from "next/image";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/images/hero1.jpg",
    title: "Trusted Healthcare For You And Your Family",
    description:
      "Book appointments with experienced doctors and receive quality healthcare support anytime.",
  },
  {
    id: 2,
    image: "/images/hero2.jpg",
    title: "Find Top Specialists Near Your Location",
    description:
      "Connect with trusted doctors and specialists through a modern appointment platform.",
  },
  {
    id: 3,
    image: "/images/hero3.jpg",
    title: "Easy Appointment Booking Experience",
    description:
      "Manage appointments, consultations, and healthcare services from one platform.",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden w-full bg-black">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}

        navigation={{
          prevEl: ".custom-swiper-prev",
          nextEl: ".custom-swiper-next",
        }}
        pagination={{
          clickable: true,
        }}
 
        className="h-[calc(100vh-68px)] min-h-115 w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              
           
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                
                className="object-cover object-center w-full h-full"
              />

   
              <div className="absolute inset-0 bg-black/60 md:bg-black/55"></div>


              <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
                <div className="max-w-3xl text-center text-white space-y-4 md:space-y-6">
                  
    
                  <h1 className="text-2xl font-bold leading-snug md:text-5xl lg:text-6xl tracking-tight px-2 md:px-0">
                    {slide.title}
                  </h1>


                  <p className="mx-auto max-w-2xl text-xs leading-relaxed text-gray-200 md:text-lg opacity-90 px-4 md:px-0">
                    {slide.description}
                  </p>

     
                  <div className="flex items-center justify-center pt-1 md:pt-2">
                    <button className="flex items-center gap-2.5 md:gap-3 rounded-xl bg-[#941865] px-5 py-2.5 md:px-7 md:py-3.5 text-xs md:text-base font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:bg-[#7d1455]">
                      Book Appointment
                      <FaArrowRight className="text-[10px] md:text-sm" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="custom-swiper-prev absolute left-4 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#941865] hover:scale-110 active:scale-95 focus:outline-none">
          <FaChevronLeft className="text-base" />
        </button>

     
        <button className="custom-swiper-next absolute right-4 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#941865] hover:scale-110 active:scale-95 focus:outline-none">
          <FaChevronRight className="text-base" />
        </button>
      </Swiper>


      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 0.55rem;
          height: 0.55rem;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 1.5rem;
          border-radius: 999px;
          background: #941865;
          opacity: 1;
        }


        .swiper-pagination {
          bottom: 1.5rem !important;
        }
        

        .swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default Hero;