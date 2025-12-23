"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserDto } from "@/api/types/user";
import { PostDto } from "@/api/types/post";
import { deletePost, getPostById } from "@/api/apiMethods";
import { useRouter } from "next/navigation";
import { useParamId } from "@/hooks/useParamId";
import { useModal } from "@/context/ModalContext";
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/16/solid";

export default function ArticleDetailPage() {
  const [article, setArticle] = useState<PostDto>();
  const [loading, setLoading] = useState(true);
  const postId = useParamId("id");
  const router = useRouter();
  const { openModal } = useModal();

  useEffect(() => {
    if (!postId) return;

    const fetchArticle = async () => {
      setLoading(true);
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

  const handleDelete = () => {
    if (!article) return;
    openModal({
      title: "Makaleyi Sil",
      message: `"${article.title}" başlıklı makaleyi silmek istediğinizden emin misiniz?`,
      confirmText: "Sil",
      cancelText: "Vazgeç",
      onConfirm: async () => {
        const result = await deletePost(article.id);
        if (result.succeeded) {
          toast.success("Makale başarıyla silindi");
          router.push("/admin/articles");
        } else {
          toast.error(result.message || "Silme başarısız");
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-8">
        <div className="h-10 w-1/4 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (!article)
    return (
      <div className="p-12 text-center text-gray-500 font-medium">
        Makale bulunamadı.
      </div>
    );

  const author: UserDto = article.author;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      {/* Üst Navigasyon ve Aksiyonlar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Listeye Dön
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm text-sm font-bold"
          >
            <PencilIcon className="w-4 h-4 text-indigo-500" />
            Düzenle
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-600 rounded-xl hover:bg-red-50 transition shadow-sm text-sm font-bold"
          >
            <TrashIcon className="w-4 h-4" />
            Sil
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden shadow-indigo-100/50">
        <div className="p-6 md:p-12 space-y-10">
          {/* Başlık ve Meta */}
          <header className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
                {article.category.name}
              </span>
              <span className="text-gray-300">•</span>
              <time className="text-sm text-gray-400 font-medium">
                {new Date(article.createdDate).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            {/* Yazar Bilgisi */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 ring-4 ring-white">
                {author.userName?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
                  Yazar
                </span>
                <span className="font-bold text-gray-800 text-lg leading-tight">
                  {author.userName}
                </span>
              </div>
            </div>
          </header>

          <hr className="border-gray-50" />

          {/* Makale İçeriği */}
          <article
            className="prose prose-indigo lg:prose-xl max-w-none 
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:shadow-indigo-100
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
            prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
}
