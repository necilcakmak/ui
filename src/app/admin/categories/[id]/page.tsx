"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CategoryDto, UpdateCategoryPayload } from "@/api/types/category";
import {
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/api/apiMethods";
import { useParamId } from "@/hooks/useParamId";

export default function EditCategoryPage() {
  const router = useRouter();
  const categoryId = useParamId("id");

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const [form, setForm] = useState<UpdateCategoryPayload>({
    id: categoryId!,
    name: "",
    tagName: "",
    parentCategoryId: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdateCategoryPayload, string>>
  >({});

  const handleChange = (key: keyof UpdateCategoryPayload, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const mapToUpdateDto = (c: CategoryDto): UpdateCategoryPayload => ({
    id: c.id,
    name: c.name || "",
    tagName: c.tagName || "",
    parentCategoryId: c.parentCategoryId || 0,
  });

  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const [catRes, allCatsRes] = await Promise.all([
          getCategoryById(categoryId),
          getCategories(),
        ]);

        if (catRes.succeeded) {
          setForm(mapToUpdateDto(catRes.data));
        }
        if (allCatsRes.succeeded) {
          setCategories(allCatsRes.data);
        }
      } catch (error) {
        toast.error("Veriler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = await updateCategory({
      ...form,
      parentCategoryId: form.parentCategoryId
        ? Number(form.parentCategoryId)
        : 0,
    });

    if (result.succeeded) {
      toast.success("Kategori başarıyla güncellendi!");
      router.push("/admin/categories");
      return;
    }

    if (result.validationErrors) {
      const newErrors: any = {};
      Object.entries(result.validationErrors).forEach(([key, messages]) => {
        newErrors[key] = messages.join(", ");
      });
      setErrors(newErrors);
    }

    toast.error(result.message || "Bir hata oluştu");
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-24 bg-white animate-pulse rounded-2xl shadow-sm border border-gray-100" />
        <div className="h-96 bg-white animate-pulse rounded-2xl shadow-sm border border-gray-100" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Kategoriyi Düzenle
          </h1>
          <p className="text-sm text-gray-500">
            Kategori bilgilerini güncelleyin.
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/categories")}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 transition"
        >
          Listeye Dön
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <Input
            label="Kategori Adı"
            placeholder="Kategori ismini giriniz"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            required
            errorMessage={errors.name}
          />

          <Input
            label="Tag Adı (Slug)"
            placeholder="Örn: teknoloji-haberleri"
            value={form.tagName || ""}
            onChange={(v) => handleChange("tagName", v)}
            errorMessage={errors.tagName}
          />

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">
              Üst Kategori
            </label>
            <select
              value={form.parentCategoryId || 0}
              onChange={(e) => handleChange("parentCategoryId", e.target.value)}
              className={`px-4 py-3 rounded-xl border transition-all outline-none bg-gray-50 focus:bg-white focus:ring-2 ${
                errors.parentCategoryId
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            >
              <option value={0}>Ana Kategori (Yok)</option>
              {categories
                .filter((c) => c.id !== Number(categoryId)) // Kategorinin kendisini seçmesini engelle
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {errors.parentCategoryId && (
              <span className="text-red-500 text-xs mt-1 font-medium">
                {errors.parentCategoryId}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              flex items-center gap-2 px-10 py-3.5 rounded-xl font-bold text-white transition-all
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100"
              }
            `}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Değişiklikleri Kaydet"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
