import Link from "next/link";

import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        
        
        <div className="space-y-5">
          
          <Link href="/" className="flex items-center gap-3">
            
            <Image
              src="/images/logo.png"
              alt="DocAppoint Logo"
              width={48}
              height={48}
              className="object-cover"
            />

            
            <div>
              <h2 className="text-3xl font-bold text-[#941865]">
                DocAppoint
              </h2>

              <p className="text-sm text-gray-500">
                Healthcare Appointment Platform
              </p>
            </div>
          </Link>

          
          <p className="max-w-xs text-sm leading-relaxed text-gray-600">
            Book appointments with trusted doctors and manage your healthcare
            journey through a modern and secure medical platform.
          </p>

          
          <div className="flex items-center gap-4 pt-2">
            
            
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#941865] text-[#941865] transition duration-300 hover:bg-[#941865] hover:text-white"
            >
              <FaFacebookF />
            </Link>

            
            
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#941865] text-[#941865] transition duration-300 hover:bg-[#941865] hover:text-white"
            >
              <FaInstagram />
            </Link>

            
            
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#941865] text-[#941865] transition duration-300 hover:bg-[#941865] hover:text-white"
            >
              <FaLinkedinIn />
            </Link>

            
            
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#941865] text-[#941865] transition duration-300 hover:bg-[#941865] hover:text-white"
            >
              <FaXTwitter />
            </Link>

          </div>
        </div>

        
        
        <div>
          <h3 className="mb-5 text-xl font-semibold text-[#941865]">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm text-gray-600">
            
            <li>
              <Link
                href="/"
                className="transition duration-300 hover:text-[#941865]"
              >
                Home
              </Link>
            </li>

            
            <li>
              <Link
                href="/all-appointments"
                className="transition duration-300 hover:text-[#941865]"
              >
                All Appointments
              </Link>
            </li>

            
            <li>
              <Link
                href="/dashboard"
                className="transition duration-300 hover:text-[#941865]"
              >
                Dashboard
              </Link>
            </li>

            
            <li>
              <Link
                href="/login"
                className="transition duration-300 hover:text-[#941865]"
              >
                Login
              </Link>
            </li>

          </ul>
        </div>

        
        
        <div>
          <h3 className="mb-5 text-xl font-semibold text-[#941865]">
            Services
          </h3>

          <ul className="space-y-4 text-sm text-gray-600">
            
            <li className="transition duration-300 hover:text-[#941865]">
              Online Appointment
            </li>

            
            <li className="transition duration-300 hover:text-[#941865]">
              Specialist Doctors
            </li>

            
            <li className="transition duration-300 hover:text-[#941865]">
              Patient Support
            </li>

            
            <li className="transition duration-300 hover:text-[#941865]">
              Health Consultation
            </li>

          </ul>
        </div>

        
        
        <div>
          <h3 className="mb-5 text-xl font-semibold text-[#941865]">
            Contact Info
          </h3>

          <div className="space-y-4 text-sm text-gray-600">
            
            <p>
              Dhanmondi, Dhaka, Bangladesh
            </p>

            
            <p>
              support@docappoint.com
            </p>

            
            <p>
              +880 1712-345678
            </p>

            
            <p>
              Available: 9:00 AM - 10:00 PM
            </p>

          </div>
        </div>

      </div>

      
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-gray-500 md:flex-row">
          
          <p>
            © 2026 DocAppoint. All rights reserved.
          </p>

          
          <div className="flex items-center gap-6">
            
            <Link
              href="/"
              className="transition duration-300 hover:text-[#941865]"
            >
              Privacy Policy
            </Link>

            
            <Link
              href="/"
              className="transition duration-300 hover:text-[#941865]"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;