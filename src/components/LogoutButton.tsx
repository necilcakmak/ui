"use client";

import { logout } from "@/api/apiMethods";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // 1. Router'ı içe aktarın

export function LogoutButton() {
  const router = useRouter(); // 2. Router hook'unu tanımlayın

  const handleLogout = async () => {
    const response = await logout();

    if (response.succeeded) {
      toast.success(response.message!);

      // 3. KRİTİK ADIM:
      // Mevcut sayfadaki Server Component'leri (AuthStatus dahil)
      // sunucudan yeniden çeker ve UI'ı günceller.
      router.refresh();

      // Opsiyonel: Kullanıcıyı ana sayfaya yönlendirmek isterseniz:
      // router.push("/");
    } else {
      toast.error(response.message!);
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
