// components/shared/Navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { RiMenu3Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Appointments", href: "/all-appointments" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="DocAppoint Logo"
            width={46}
            height={46}
            className="object-contain"
          />
          <span className="text-xl font-bold tracking-tight" style={{ color: "#941865" }}>
            DocAppoint
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative group
                ${pathname === link.href ? "text-[#941865]" : "text-gray-600 hover:text-[#941865]"}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#941865] transition-all duration-300
                ${pathname === link.href ? "w-full" : "w-0"}`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#941865] border border-[#941865] rounded-lg py-2 px-5 relative overflow-hidden group transition-colors duration-300 ease-out hover:text-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#941865] transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0" />
                <span className="relative z-10">Login</span>
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white rounded-lg py-2 px-4 transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#941865" }}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 cursor-pointer"
                  style={{ borderColor: "#941865" }}>
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#941865] transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#941865] transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-3">
   
          {user && (
            <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{ borderColor: "#941865" }}>
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none text-gray-700 hover:text-[#941865] transition-colors"
          >
            {mobileMenuOpen ? (
              <MdClose className="text-2xl" /> 
            ) : (
              <RiMenu3Line className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="flex flex-col px-6 py-4 gap-1">

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2.5 border-b border-gray-50 transition-colors duration-200
                  ${pathname === link.href
                    ? "text-[#941865]"
                    : "text-gray-600 hover:text-[#941865]"}`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#941865] align-middle" />
                )}
              </Link>
            ))}

            {/* Auth Section */}
            <div className="pt-3 flex flex-col gap-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-sm font-medium text-[#941865] border border-[#941865] rounded-lg py-2.5 hover:bg-[#941865] hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-sm font-medium text-white rounded-lg py-2.5 hover:opacity-90 transition-all duration-200"
                    style={{ backgroundColor: "#941865" }}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 py-2 border-b border-gray-100 mb-1">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2" style={{ borderColor: "#941865" }}>
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-700 hover:text-[#941865] py-2 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-700 hover:text-[#941865] py-2 transition-colors"
                  >
                    Profile
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={async () => {
                      await signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center text-sm font-medium text-white rounded-lg py-2.5 bg-red-500 hover:bg-red-600 transition-all duration-200 mt-1"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}