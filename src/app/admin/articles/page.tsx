"use client";

import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
import { deletePost, getPosts } from "@/api/apiMethods";
import { PostDto } from "@/api/types/post";

export default function ArticlesPage() {
  const router = useRouter();
  const [articleList, setArticleList] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const fetchArticles = async () => {
    setLoading(true);
    const result = await getPosts();
    if (result.succeeded) {
      setArticleList(result.data || []);
    } else {
      toast.error(result.message || "Makaleler yüklenirken bir hata oluştu");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = (article: PostDto) => {
    openModal({
      title: "Makaleyi Sil",
      message: `"${article.title}" başlıklı makaleyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      confirmText: "Sil",
      cancelText: "Vazgeç",
      onConfirm: async () => {
        const result = await deletePost(article.id);
        if (result.succeeded) {
          toast.success("Makale silindi.");
          setArticleList((prev) => prev.filter((c) => c.id !== article.id));
        } else {
          toast.error(result.message || "Silme işlemi başarısız.");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <DataTable
        data={articleList}
        title="Makale Yönetimi"
        loading={loading}
        pageSize={10}
        searchKeys={["title"]}
        actions={
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm shadow-indigo-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Yeni Makale Ekle
          </Link>
        }
        columns={[
          {
            key: "id",
            label: "ID",
            sortable: true,
            render: (item) => (
              <span className="text-xs font-mono text-gray-400">
                #{item.id}
              </span>
            ),
          },
          {
            key: "title",
            label: "Makale Bilgisi",
            sortable: true,
            render: (item) => (
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 line-clamp-1">
                  {item.title}
                </span>
                {/* Eğer PostDto içinde kategori adı veya tarih varsa ekleyebilirsin */}
                <span className="text-[11px] text-gray-400">
                  Eklenme: {new Date().toLocaleDateString("tr-TR")}
                </span>
              </div>
            ),
          },
          // Eğer API'den geliyorsa kategori sütunu
          {
            key: "id", // Örnek anahtar
            label: "Durum",
            render: () => (
              <span className="px-2 py-1 bg-green-50 text-green-600 text-[11px] font-bold rounded-lg border border-green-100 uppercase">
                Yayında
              </span>
            ),
          },
          { key: "actions", label: "İşlemler" },
        ]}
        onEdit={(article) => router.push(`/admin/articles/${article.id}/edit`)}
        onView={(article) => router.push(`/admin/articles/${article.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
