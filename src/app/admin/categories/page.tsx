"use client";

import { getCategories, deleteCategory } from "@/api/apiMethods";
import { DataResult } from "@/api/types/apiResponse";
import { CategoryDto } from "@/api/types/category";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const loadCategories = async () => {
    setLoading(true);
    const result = await getCategories();
    if (result.succeeded) {
      setCategories((result as DataResult<CategoryDto[]>).data || []);
    } else {
      toast.error(result.message || "Kategoriler yüklenemedi.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = (category: CategoryDto) => {
    openModal({
      title: "Kategori Sil",
      message: `"${category.name}" kategorisini silmek istediğinizden emin misiniz?`,
      confirmText: "Sil",
      cancelText: "Vazgeç",
      onConfirm: async () => {
        const result = await deleteCategory(category.id);
        if (result.succeeded) {
          toast.success("Kategori silindi.");
          setCategories((prev) => prev.filter((c) => c.id !== category.id));
        } else {
          toast.error(result.message || "Silme başarısız.");
        }
      },
    });
  };

  return (
    <div className="p-2 sm:p-0">
      <DataTable
        title="Kategoriler"
        data={categories}
        loading={loading}
        pageSize={10}
        // Arama yapılacak alanlar
        searchKeys={["name", "tagName"]}
        // Sağ üst köşedeki buton
        actions={
          <Link
            href="/admin/categories/new"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm font-medium text-sm"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Yeni Ekle
          </Link>
        }
        // Sütun tanımlamaları
        columns={[
          {
            key: "id",
            label: "ID",
            sortable: true,
            render: (item) => (
              <span className="text-gray-400 font-mono text-xs">
                #{item.id}
              </span>
            ),
          },
          {
            key: "name",
            label: "Kategori Adı",
            sortable: true,
            render: (item) => (
              <span className="font-semibold text-gray-800">{item.name}</span>
            ),
          },
          {
            key: "tagName",
            label: "Tag",
            sortable: true,
            render: (item) => (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                #{item.tagName}
              </span>
            ),
          },
          { key: "actions", label: "İşlemler" },
        ]}
        // Satır aksiyonları (DataTable içindeki EyeIcon, PencilIcon, TrashIcon'ı tetikler)
        onEdit={(item) => router.push(`/admin/categories/${item.id}`)}
        onDelete={handleDelete}
        onView={(item) => console.log("Görüntüle:", item)}
      />
    </div>
  );
}
