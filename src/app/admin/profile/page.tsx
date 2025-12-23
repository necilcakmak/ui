"use client";

import { useState, useEffect } from "react";
import Input from "@/components/Input";
import toast from "react-hot-toast";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatarUrl?: string;
}

export default function AdminProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Necil",
    lastName: "Çakmak",
    email: "neco",
    bio: "Kıdemli İçerik Editörü ve Yazılım Geliştirici.",
  });

  // Profil güncelleme işlemi
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API çağrısı simülasyonu
    setTimeout(() => {
      toast.success("Profil başarıyla güncellendi!");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-md">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
          <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-lg shadow-lg border border-gray-100 text-indigo-600 hover:text-indigo-700 transition">
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm text-gray-500">
            Yönetici Paneli • Profil Ayarları
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sol Kolon: Bilgiler */}
        <div className="md:col-span-2 space-y-6">
          <form
            onSubmit={handleUpdateProfile}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Kişisel Bilgiler
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Ad"
                value={profile.firstName}
                onChange={(v) => setProfile({ ...profile, firstName: v })}
              />
              <Input
                label="Soyad"
                value={profile.lastName}
                onChange={(v) => setProfile({ ...profile, lastName: v })}
              />
            </div>

            <Input
              label="E-posta Adresi"
              type="email"
              value={profile.email}
              onChange={(v) => setProfile({ ...profile, email: v })}
            />

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-700">
                Hakkımda
              </label>
              <textarea
                className="px-4 py-3 rounded-xl border border-gray-200 transition-all outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 min-h-[120px]"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 disabled:bg-gray-400"
              >
                {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
              </button>
            </div>
          </form>
        </div>

        {/* Sağ Kolon: Şifre ve Güvenlik */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-md font-bold text-gray-800 mb-4">Güvenlik</h3>
            <p className="text-sm text-gray-500 mb-6">
              Hesap güvenliğinizi korumak için düzenli olarak şifrenizi
              güncelleyin.
            </p>
            <button className="w-full py-3 px-4 border border-indigo-100 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition">
              Şifreyi Değiştir
            </button>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="text-md font-bold text-red-800 mb-2">
              Tehlikeli Bölge
            </h3>
            <p className="text-xs text-red-600 mb-4">
              Hesabınızı dondurmak veya tamamen silmek için buraya tıklayın.
            </p>
            <button className="text-red-600 text-sm font-bold hover:underline">
              Hesabı Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
