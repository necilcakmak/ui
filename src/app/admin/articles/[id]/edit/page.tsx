"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { CategoryDto } from "@/api/types/category";
import { PostDto, UpdatePostPayload } from "@/api/types/post";
import { getCategories, getPostById, updatePost } from "@/api/apiMethods";
import { useParamId } from "@/hooks/useParamId";
import TiptapEditor from "@/components/TiptapEditor";

export default function EditArticlePage() {
  const router = useRouter();
  const postId = useParamId("id");
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<UpdatePostPayload>({
    id: postId!,
    title: "",
    content: "",
    categoryId: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdatePostPayload, string>>
  >({});

  const mapToUpdateDto = (a: PostDto): UpdatePostPayload => ({
    id: a.id,
    title: a.title || "",
    content: a.content || "",
    categoryId: a.categoryId,
  });

  useEffect(() => {
    if (!postId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [articleRes, catRes] = await Promise.all([
          getPostById(postId),
          getCategories(),
        ]);

        if (articleRes.succeeded) {
          setForm(mapToUpdateDto(articleRes.data));
        }
        if (catRes.succeeded) {
          setCategories(catRes.data || []);
        }
      } catch (err) {
        toast.error("Veriler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [postId]);

  const handleChange = (key: keyof UpdatePostPayload, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = await updatePost({
      ...form,
      categoryId: Number(form.categoryId),
    });

    if (result.succeeded) {
      toast.success("Makale başarıyla güncellendi!");
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-20 bg-white animate-pulse rounded-2xl shadow-sm" />
        <div className="h-screen bg-white animate-pulse rounded-2xl shadow-sm" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Üst Bilgi Paneli */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Makaleyi Düzenle
          </h1>
          <p className="text-sm text-gray-500 italic truncate max-w-md">
            ID: {postId} &bull; {form.title}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/articles")}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-lg transition"
        >
          &larr; Listeye Dön
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Ana Editör Alanı */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <Input
              label="Makale Başlığı"
              value={form.title || ""}
              onChange={(v) => handleChange("title", v)}
              errorMessage={errors.title}
              placeholder="Başlığı buraya girin..."
              className="text-lg font-bold"
            />

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-700">
                Makale İçeriği
              </label>
              <TiptapEditor
                content={form.content}
                onChange={(html) => handleChange("content", html)}
                error={errors.content}
              />
              {errors.content && (
                <span className="text-red-500 text-xs mt-2 font-medium">
                  {errors.content}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Yan Panel (Ayarlar) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 sticky top-6">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                Kategori
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                className={`px-3 py-2.5 rounded-xl border text-sm transition-all outline-none bg-gray-50 focus:bg-white ${
                  errors.categoryId
                    ? "border-red-500 ring-red-50"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                }`}
                required
              >
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <hr className="border-gray-100" />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Güncellemeleri Kaydet"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
