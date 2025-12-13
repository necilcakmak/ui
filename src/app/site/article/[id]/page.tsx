"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PostDto } from "@/api/types/post";
import { getPostById } from "@/api/apiMethods";
import { useParamId } from "@/hooks/useParamId";

export default function ArticleDetailPage() {
  const postId = useParamId("id");

  const [article, setArticle] = useState<PostDto>();
  const [loading, setLoading] = useState(false);

  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const fetchArticle = async () => {
    setLoading(true);
    const result = await getPostById(postId!);
    if (result.succeeded) {
      setArticle(article);
    } else {
      toast.error(result.message || "Makale bulunamadı");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [postId]);

  if (loading) return <p className="p-6">Yükleniyor...</p>;
  if (!article) return <p className="p-6">Makale bulunamadı.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-6 lg:gap-6">
      {/* Sol kategori paneli */}
      <aside className="lg:col-span-1 hidden lg:block">
        <div className="sticky top-24 p-4 bg-white rounded shadow-md">
          <h3 className="font-bold mb-4 text-lg">Kategoriler</h3>
          <ul className="space-y-2 text-sm">
            {article.category && (
              <li className="hover:text-blue-600">{article.category.name}</li>
            )}
          </ul>
        </div>
      </aside>

      {/* İçerik */}
      <main className="lg:col-span-4">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="mb-6 text-gray-500 text-sm">
          {formatDate(article.createdDate)}
        </div>

        <div className="prose max-w-full mb-8">
          <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
        </div>
      </main>

      {/* Sağ yazar paneli */}
      <aside className="lg:col-span-1 hidden lg:block">
        <div className="sticky top-24 p-4 bg-white rounded shadow-md flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-gray-500 text-xl">
              {article.author.userName}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
