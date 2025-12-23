"use client";

import { getCategories, getPosts } from "@/api/apiMethods";
import { CategoryDto } from "@/api/types/category";
import { PostDto } from "@/api/types/post";
import { useEffect, useState } from "react";

export default function AdminHome() {
  const [articleList, setArticleList] = useState<PostDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postRes, catRes] = await Promise.all([
        getPosts(),
        getCategories(),
      ]);
      if (postRes.succeeded) setArticleList(postRes.data);
      if (catRes.succeeded) setCategories(catRes.data || []);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Özel SVG İkonları
  const Icons = {
    Articles: () => (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    Categories: () => (
      <svg
        className="w-8 h-8 text-purple-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
    Status: () => (
      <svg
        className="w-8 h-8 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  const stats = [
    {
      label: "Makaleler",
      value: articleList.length,
      icon: <Icons.Articles />,
      color: "border-blue-500",
    },
    {
      label: "Kategoriler",
      value: categories.length,
      icon: <Icons.Categories />,
      color: "border-purple-500",
    },
    {
      label: "Sistem Durumu",
      value: "Aktif",
      icon: <Icons.Status />,
      color: "border-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 animate-pulse rounded-xl shadow-sm"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık Alanı */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Sitenizdeki güncel veriler ve istatistikler.
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color} flex items-center justify-between hover:shadow-md transition-all duration-300`}
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-3xl font-extrabold text-gray-800 mt-1">
                {stat.value}
              </h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Alt Bilgi Kartı */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <h2 className="font-bold text-gray-800">Canlı Sistem Özeti</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span>API Servis Durumu:</span>
            <span className="text-green-600 font-semibold">Çalışıyor</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span>Son Güncelleme:</span>
            <span className="font-medium">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
