"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { createCategory, getCategories } from "@/api/apiMethods";
import toast from "react-hot-toast";
import { CreateCategoryPayload, ParentCategoryDto } from "@/api/types/category";

export default function NewCategoryPage() {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<ParentCategoryDto[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState<CreateCategoryPayload>({
    name: "",
    tagName: "",
    parentCategoryId: null,
  });

  // Validation errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateCategoryPayload, string>>
  >({});

  const handleChange = (key: keyof CreateCategoryPayload, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Kategorileri çek
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      if (res.succeeded) {
        setParentCategories(res.data || []);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Payload hazırlığı: Boş string gelirse null yap, ID'yi sayıya çevir
    const payload: CreateCategoryPayload = {
      ...form,
      parentCategoryId: form.parentCategoryId
        ? Number(form.parentCategoryId)
        : null,
      tagName: form.tagName?.trim() || "",
    };

    const result = await createCategory(payload);

    if (result.succeeded) {
      toast.success("Kategori başarıyla eklendi!");
      router.push("/admin/categories");
      return;
    }

    // API validation errors
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

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header Bölümü */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Yeni Kategori Ekle
          </h1>
          <p className="text-sm text-gray-500">
            Makalelerinizi organize etmek için yeni bir kategori tanımlayın.
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 transition"
        >
          Vazgeç
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <Input
            label="Kategori Adı"
            placeholder="Örn: Yapay Zeka"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            required
            errorMessage={errors.name}
          />

          <Input
            label="Tag Adı (Slug)"
            placeholder="Örn: yapay-zeka"
            value={form.tagName || ""}
            onChange={(v) => handleChange("tagName", v)}
            errorMessage={errors.tagName}
          />

          {/* Üst Kategori Seçimi */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">
              Üst Kategori
            </label>
            <select
              value={form.parentCategoryId || ""}
              onChange={(e) =>
                handleChange("parentCategoryId", e.target.value || null)
              }
              className={`px-4 py-3 rounded-xl border transition-all outline-none bg-gray-50 focus:bg-white focus:ring-2 ${
                errors.parentCategoryId
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            >
              <option value="">Ana Kategori (Yok)</option>
              {parentCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[11px] text-gray-400 italic">
              * Alt kategori oluşturmak istiyorsanız bir üst kategori seçin.
            </p>
            {errors.parentCategoryId && (
              <span className="text-red-500 text-xs mt-1 font-medium">
                {errors.parentCategoryId}
              </span>
            )}
          </div>
        </div>

        {/* Aksiyon Butonu */}
        <div className="flex justify-end">
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
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                İşleniyor...
              </>
            ) : (
              "Kategoriyi Kaydet"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
