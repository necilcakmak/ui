"use client"; // Client component, çünkü useState ve useEffect kullanıyoruz

import { getCategories, getPosts } from "@/api/apiMethods";
import { DataResult } from "@/api/types/apiResponse";
import { CategoryDto } from "@/api/types/category";
import { PostDto } from "@/api/types/post";
import { UserDto } from "@/api/types/user";
import { useEffect, useState } from "react";

export default function AdminHome() {
  const [articleList, setArticleList] = useState<PostDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stats = [
    { label: "Makaleler", value: articleList.length },
    { label: "Kategoriler", value: categories.length },
  ];
  const fetchArticles = async () => {
    setLoading(true);
    const result = await getPosts();
    if (result.succeeded) {
      setArticleList(result.data);
    } else {
      setError(result.message || "Bir hata oluştu");
    }
    setLoading(false);
  };
  const fetchCategories = async () => {
    setLoading(true);
    const result = await getCategories(); // API çağrısı
    if (result.succeeded) {
      setCategories(result.data || []);
    } else {
      setError(result.message || "Bir hata oluştu");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow rounded p-6 flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-semibold">{stat.value}</span>
            <span className="text-gray-900 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
