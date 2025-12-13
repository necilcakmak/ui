"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { PostDto } from "@/api/types/post";
import { getPosts } from "@/api/apiMethods";

export default function Dashboard() {
  const [articleList, setArticleList] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL + "articles/";

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  const fetchArticles = async () => {
    setLoading(true);

    const result = await getPosts();

    if (result.succeeded) {
      setArticleList(result.data || []);
      toast.success(result.message || "hata");
    } else {
      toast.error(result.message || "Bir hata oluştu");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Filtreleme
  const filteredArticles = articleList.filter((article) =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Sayfa değişince scroll top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Arama */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Makale başlığı ara..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // arama değişince sayfa başa dönsün
          }}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p>Yükleniyor...</p>}
      {!loading && filteredArticles.length === 0 && (
        <p>Aramanıza uygun makale bulunamadı.</p>
      )}

      <div className="space-y-8">
        {currentArticles.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            {/* İçerik */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                <Link
                  href={`/site/article/${article.id}`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              </h3>
              <div className="text-gray-500 mb-4 text-sm">
                <time>{formatDate(article.createdDate)}</time>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                {article.content?.slice(0, 200)}
                {article.content && article.content.length > 200 ? "..." : ""}
              </p>

              {/* Yazar */}
              <div className="flex items-center mt-4">
                <div className="text-lg font-bold">
                  {article.author.userName}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded border ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
