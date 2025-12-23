"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const role = "Admin";

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
      >
        <div className="flex items-center justify-between p-6">
          <Link
            href="/admin"
            className="text-2xl font-bold hover:text-gray-300 transition"
          >
            Admin
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {[
            { name: "Kategoriler", href: "/admin/categories" },
            { name: "Makaleler", href: "/admin/articles" },
            { name: "Kullanıcılar", href: "/admin/users" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-3 rounded transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <header className="h-16 bg-gray-800 flex items-center justify-between px-4 lg:px-6 shadow-md sticky top-0 z-30">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 mr-4 text-gray-400 lg:hidden hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link
              href="/"
              className="text-white text-sm lg:text-base font-semibold px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Siteye Dön
            </Link>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-3 px-3 py-1.5 bg-gray-700/50 text-white text-sm rounded-xl hover:bg-gray-600 transition-all border border-gray-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center font-bold shadow-sm">
                {role[0]}
              </div>
              <span className="hidden sm:inline font-medium tracking-wide">
                {role}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="/admin/profile"
                  className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors mx-2 rounded-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Profilim</span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors mx-2 rounded-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Ayarlar</span>
                </Link>

                <div className="my-2 border-t border-gray-100 mx-4" />

                <LogoutButton />
              </div>
            )}
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white p-4 lg:p-6 rounded-lg shadow-sm min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
