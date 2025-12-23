"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

interface NavbarProps {
  authStatus: ReactNode;
}

export default function Navbar({ authStatus }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100/80">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex-shrink-0 transition-transform hover:scale-105">
          <Logo />
        </div>

        {/* Masaüstü Menü */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-1 bg-gray-100/50 p-1 rounded-xl">
            <Link
              href="/"
              className={`px-5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200/50"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Anasayfa
            </Link>
            
            {/* HAKKIMDA LİNKİ EKLEDİK */}
            <Link
              href="/site/about"
              className={`px-5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive("/site/about")
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200/50"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Hakkımda
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:block scale-90 origin-right">
            {authStatus}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-50 bg-white px-6 py-6 space-y-2 shadow-2xl animate-fadeIn">
          <Link
            href="/"
            className={`block px-4 py-3 rounded-xl text-sm font-medium ${
              isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Anasayfa
          </Link>

          {/* MOBİL HAKKIMDA LİNKİ */}
          <Link
            href="/site/about"
            className={`block px-4 py-3 rounded-xl text-sm font-medium ${
              isActive("/site/about") ? "bg-blue-50 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Hakkımda
          </Link>

          <div className="pt-4 mt-2 border-t border-gray-100">{authStatus}</div>
        </div>
      )}
    </nav>
  );
}