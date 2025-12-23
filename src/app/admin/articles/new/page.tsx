"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CategoryDto } from "@/api/types/category";
import { CreatePostPayload } from "@/api/types/post";
import { createPost, getCategories } from "@/api/apiMethods";
import TiptapEditor from "@/components/TiptapEditor";

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState<CreatePostPayload>({
    title: "",
    content: "",
    categoryId: 0,
  });

  // Validation errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreatePostPayload, string>>
  >({});

  const handleChange = (key: keyof CreatePostPayload, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      if (result.succeeded) {
        setCategories(result.data || []);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Payload hazırlığı (categoryId'nin sayı olduğundan emin olalım)
    const payload: CreatePostPayload = {
      ...form,
      categoryId: Number(form.categoryId),
    };

    const result = await createPost(payload);

    if (result.succeeded) {
      toast.success("Makale başarıyla eklendi!");
      router.push("/admin/articles");
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Yeni Makale Oluştur
          </h1>
          <p className="text-sm text-gray-500">
            Zengin metin editörü ile makalenizi yazın ve yayınlayın.
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          Vazgeç
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          {/* Başlık */}
          <Input
            label="Makale Başlığı"
            placeholder="Örn: Geleceğin Teknolojileri"
            value={form.title}
            onChange={(v) => handleChange("title", v)}
            required
            errorMessage={errors.title}
          />

          {/* Kategori Seçimi */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">
              Kategori Seçin
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              className={`px-4 py-3 rounded-xl border transition-all outline-none bg-gray-50 focus:bg-white focus:ring-2 ${
                errors.categoryId
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
              required
            >
              <option value={0} disabled>
                Kategori seçiniz...
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="text-red-500 text-xs mt-1 font-medium">
                {errors.categoryId}
              </span>
            )}
          </div>

          {/* Editor alanı */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">
              İçerik
            </label>
            <div
              className={`rounded-xl overflow-hidden border transition-all ${
                errors.content
                  ? "border-red-500"
                  : "border-gray-200 focus-within:border-indigo-500"
              }`}
            >
              <TiptapEditor
                content={form.content}
                onChange={(html) => handleChange("content", html)}
              />
            </div>
            {errors.content && (
              <span className="text-red-500 text-xs mt-1 font-medium">
                {errors.content}
              </span>
            )}
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all
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
                Kaydediliyor...
              </>
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Makaleyi Yayınla
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
