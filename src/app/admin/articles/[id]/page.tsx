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
    const fetchArticle = async () => {
      const res = await getPostById(postId!);
      if (res.succeeded) {
        setArticle(res.data);
      } else {
        toast.error(res.message!);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [postId]);

  if (loading) return <div className="p-6">Yükleniyor...</div>;
  if (!article) return <div className="p-6">Makale bulunamadı</div>;

  const author: UserDto = article.author;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6">
      {/* Başlık */}
      <h1 className="text-3xl font-bold">{article.title}</h1>

      {/* Metadata */}
      <div className="flex flex-col md:flex-row justify-between text-gray-600 text-sm mb-4">
        <div>
          Kategori: <span className="font-medium">{article.category.name}</span>
        </div>
        <div>
          Yayın Tarihi:{" "}
          <span className="font-medium">
            {new Date(article.createdDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Yazar Bilgisi */}
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded">
        <div className="font-medium">{author.userName}</div>
      </div>

      {/* İçerik */}
      <div className="prose max-w-full">{article.content}</div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.back()}
      >
        Geri
      </button>
    </div>
  );
}
