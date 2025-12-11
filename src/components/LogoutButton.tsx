// app/components/LogoutButton.tsx
"use client";
import { logout } from "@/api/apiMethods";
import toast from "react-hot-toast";

// Etkileşimli olduğu için Client Component olmalı

export function LogoutButton() {
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-red-800 text-white hover:bg-red-700 px-3 py-1 text-sm"
    >
      Çıkış Yap
    </button>
  );
}
