"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobil menü durumu
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const role = "Admin";

  // Sayfa değiştiğinde mobil menüyü kapat
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

  const handleLogout = () => {
    document.cookie =
      "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;";
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobil Overlay - Menü açıkken arka planı karartır */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
          {/* Mobil Kapatma Butonu */}
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

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Üst Menü */}
        <header className="h-16 bg-gray-800 flex items-center justify-between px-4 lg:px-6 shadow-md sticky top-0 z-30">
          <div className="flex items-center">
            {/* Hamburger Menu Butonu (Sadece Mobil) */}
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

          {/* Profil Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px]">
                A
              </div>
              <span className="hidden sm:inline">{role}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
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
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 overflow-hidden">
                <Link
                  href="/admin/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Profilim
                </Link>
                <Link
                  href="/admin/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Ayarlar
                </Link>
                <hr />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition"
                >
                  Çıkış
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Ana İçerik */}
        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white p-4 lg:p-6 rounded-lg shadow-sm min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
