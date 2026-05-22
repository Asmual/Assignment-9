/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    if (user?.email) {
      fetch("https://assignment-9-server-ybq9.onrender.com/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, name: user.name }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.token) {
            localStorage.setItem("docappoint_token", data.token);
          }
        })
        .catch(() => { });
    } else {

      localStorage.removeItem("docappoint_token");
    }
  }, [user]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Appointments", href: "/all-appointments" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("docappoint_token");
      toast.success("Successfully logged out");
      setMobileMenuOpen(false);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };


  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="DocAppoint Logo" width={46} height={46} className="object-contain" style={{ height: "auto" }} />
          <span className="text-xl font-bold tracking-tight" style={{ color: "#941865" }}>DocAppoint</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative group
                ${pathname === link.href ? "text-[#941865]" : "text-gray-600 hover:text-[#941865]"}`}>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#941865] transition-all duration-300
                ${pathname === link.href ? "w-full" : "w-0"}`} />
            </Link>
          ))}
        </div>
        

        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="w-8 h-8 border-2 border-[#941865] border-t-transparent rounded-full animate-spin" />
          ) : !user ? (
            <>
              <Link href="/login" className="text-sm font-medium text-[#941865] border border-[#941865] rounded-lg py-2 px-5 relative overflow-hidden group transition-colors duration-300 ease-out hover:text-white">
                <span className="absolute inset-0 w-full h-full bg-[#941865] transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0" />
                <span className="relative z-10">Login</span>
              </Link>
              <Link href="/register" className="text-sm font-medium text-white rounded-lg py-2 px-4 transition-all duration-200 hover:opacity-90" style={{ backgroundColor: "#941865" }}>Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                {user.image ? (
                  <Image src={user.image} alt={user.name || "User"} width={40} height={40}
                    className="object-cover w-full h-full rounded-full border-2" style={{ borderColor: "#941865" }} referrerPolicy="no-referrer" />
                ) : (
                  <FaUserCircle className="text-4xl text-[#941865]" />
                )}
              </div>
              <button onClick={handleLogout} className="text-sm font-medium text-white rounded-lg py-2 px-5 transition-opacity hover:opacity-90 cursor-pointer" style={{ backgroundColor: "#941865" }}>
                Logout
              </button>
            </div>
          )}
        </div>
        

        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none text-gray-700 hover:text-[#941865] transition-colors">
            {mobileMenuOpen ? <MdClose className="text-2xl" /> : <RiMenu3Line className="text-2xl" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2.5 border-b border-gray-50 transition-colors duration-200
                  ${pathname === link.href ? "text-[#941865]" : "text-gray-600 hover:text-[#941865]"}`}>
                {link.label}
                {pathname === link.href && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#941865] align-middle" />}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              {isPending ? (
                <div className="flex justify-center py-2">
                  <div className="w-6 h-6 border-2 border-[#941865] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !user ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center text-sm font-medium text-[#941865] border border-[#941865] rounded-lg py-2.5 hover:bg-[#941865] hover:text-white transition-all duration-200">Login</Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center text-sm font-medium text-white rounded-lg py-2.5 hover:opacity-90 transition-all duration-200" style={{ backgroundColor: "#941865" }}>Register</Link>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                      {user.image ? (
                        <Image src={user.image} alt={user.name || "User"} width={40} height={40}
                          className="object-cover w-full h-full rounded-full border-2" style={{ borderColor: "#941865" }} referrerPolicy="no-referrer" />
                      ) : (
                        <FaUserCircle className="text-4xl text-[#941865]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="w-full text-center text-sm font-medium text-white rounded-lg py-2.5 transition-opacity hover:opacity-90" style={{ backgroundColor: "#941865" }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}