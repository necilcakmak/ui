"use client";

import { logout } from "@/api/apiMethods";
import toast from "react-hot-toast";

export function LogoutButton() {
  const handleLogout = async () => {
    const response = await logout();

    if (response.succeeded) {
      toast.success(response.message || "Başarıyla çıkış yapıldı.");

      window.location.href = "/";
    } else {
      toast.error(response.message || "Çıkış yapılırken bir hata oluştu.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-[13px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-full transition-all duration-200 active:scale-95 flex items-center space-x-2"
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
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span>Çıkış Yap</span>
    </button>
  );
}
