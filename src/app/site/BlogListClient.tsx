"use client";

import { useState } from "react";
import Link from "next/link";
import { PostDto } from "@/api/types/post";

export default function BlogListClient({ initialPosts }: { initialPosts: PostDto[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Yardımcı Fonksiyonlar
  const formatDate = (dateStr: string | Date) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const stripHtml = (html: string) => html?.replace(/<[^>]*>?/gm, "") || "";

  // Filtreleme Mantığı
  const filteredArticles = initialPosts.filter((article) =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-12">
      {/* Arama Kutusu */}
      <div className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Makale başlığı ara..."
          className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-4 shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Makale Listesi */}
      <div className="space-y-10">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <article key={article.id} className="group relative bg-white border border-gray-100 rounded-[32px] p-2 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1">
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {article.category?.name || "Genel"}
                  </span>
                  <time className="text-xs text-gray-400 font-medium">{formatDate(article.createdDate)}</time>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  <Link href={`/site/article/${article.id}`}>{article.title}</Link>
                </h3>

                <p className="text-gray-500 leading-relaxed line-clamp-3 text-lg">
                  {stripHtml(article.content).slice(0, 220)}...
                </p>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 border border-gray-100">
                      {article.author.userName?.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{article.author.userName}</span>
                  </div>
                  <Link href={`/site/article/${article.id}`} className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Devamını Oku
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Aradığınız kriterlerde makale bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Sayfalama (Pagination) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md disabled:opacity-30 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                  page === currentPage ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-500 border border-gray-100 hover:border-blue-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md disabled:opacity-30 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}