"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserDto } from "@/api/types/user";
import { PostDto } from "@/api/types/post";
import { getPostById } from "@/api/apiMethods";
import { useRouter } from "next/navigation";
import { useParamId } from "@/hooks/useParamId";

export default function ArticleDetailPage() {
  const [article, setArticle] = useState<PostDto>();
  const [loading, setLoading] = useState(true);
  const postId = useParamId("id");
  const router = useRouter();

  useEffect(() => {
    if (!postId) return;

    const fetchArticle = async () => {
      const res = await getPostById(postId);
      if (res.succeeded) {
        setArticle(res.data);
      } else {
        toast.error(res.message || "Makale yüklenirken bir hata oluştu");
      }
      setLoading(false);
    };

    fetchArticle();
  }, [postId]);

  if (loading) return <div className="p-6 text-center">Yükleniyor...</div>;
  if (!article) return <div className="p-6 text-center">Makale bulunamadı</div>;

  const author: UserDto = article.author;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden p-6 md:p-10 space-y-8">
        {/* Başlık Bölümü */}
        <header className="space-y-4 border-b pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                {article.category.name}
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <time>
              {new Date(article.createdDate).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Yazar Kartı */}
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {author.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Yazar</div>
            <div className="font-semibold text-gray-800">{author.userName}</div>
          </div>
        </div>

        {/* Makale İçeriği (Tiptap Çıktısı Buraya Gelecek) */}
        <div
          className="prose prose-slate lg:prose-lg max-w-none 
          prose-img:rounded-xl prose-img:shadow-md 
          prose-headings:text-gray-900 prose-p:text-gray-700
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="pt-8 border-t">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            onClick={() => router.back()}
          >
            ← Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}
