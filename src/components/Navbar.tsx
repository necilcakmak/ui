"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo"; // Logo bileşenini import ettik

interface NavbarProps {
  authStatus: ReactNode;
}

export default function Navbar({ authStatus }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO BÖLÜMÜ - Artık tertemiz */}
        <Logo />

        {/* Masaüstü Menü */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-1 bg-gray-50/50 p-1 rounded-xl border border-gray-100/50">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/") ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Anasayfa
            </Link>
            <Link 
              href="/site/categories" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/site/categories") ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Kategoriler
            </Link>
          </div>
        </div>

        {/* Auth & Mobil Buton */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            {authStatus}
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-4">
          <Link 
            href="/" 
            className={`block px-4 py-3 rounded-xl font-medium ${
                isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Anasayfa
          </Link>
          <Link 
            href="/site/categories" 
            className={`block px-4 py-3 rounded-xl font-medium ${
                isActive("/site/categories") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Kategoriler
          </Link>
          <div className="pt-4 mt-2 border-t border-gray-100">
            {authStatus}
          </div>
        </div>
      )}
    </nav>
  );
}