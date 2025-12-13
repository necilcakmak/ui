"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { CategoryDto } from "@/api/types/category";
import { PostDto, UpdatePostPayload } from "@/api/types/post";
import { getCategories, getPostById, updatePost } from "@/api/apiMethods";
import { useParamId } from "@/hooks/useParamId";

export default function EditArticlePage() {
  const router = useRouter();
  const postId = useParamId("id");
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId === null) return;

    const loadData = async () => {
      const [articleRes, catRes] = await Promise.all([
        await getPostById(postId),
        await getCategories(),
      ]);

      if (articleRes.succeeded) {
        setForm(mapToUpdateDto(articleRes.data));
      }

      if (catRes.succeeded) {
        setCategories(catRes.data || []);
      }
      setLoading(false);
    };

    loadData();
  }, [postId]);

  const [form, setForm] = useState<UpdatePostPayload>({
    id: postId!,
    title: "",
    content: "",
    categoryId: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdatePostPayload, string>>
  >({});

  const handleChange = (key: keyof UpdatePostPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // **PostDto → UpdatePostPayload dönüşümü**
  const mapToUpdateDto = (a: PostDto): UpdatePostPayload => ({
    id: a.id,
    title: a.title || "",
    content: a.content || "",
    categoryId: a.categoryId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = await updatePost(form);

    if (result.succeeded) {
      toast.success("Makale başarıyla güncellendi!");
      router.push("/admin/articles");
      return;
    }

    if (result.validationErrors) {
      const newErrors: Partial<Record<keyof UpdatePostPayload, string>> = {};

      Object.entries(result.validationErrors).forEach(([key, messages]) => {
        newErrors[key as keyof UpdatePostPayload] = messages.join(", ");
      });

      setErrors(newErrors);
    }

    toast.error(result.message || "Bir hata oluştu");
  };

  if (loading) return <div className="p-6">Yükleniyor...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Makale Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Başlık"
          value={form.title || ""}
          onChange={(v) => handleChange("title", v)}
          errorMessage={errors.title}
        />

        {/* Kategori seçimi */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Kategori</label>
          <select
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            className={`px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 ${
              errors.categoryId ? "border-red-500" : "border-gray-300"
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

          {errors.categoryId && (
            <span className="text-red-500 text-sm mt-1">
              {errors.categoryId}
            </span>
          )}
        </div>

        {/* İçerik */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">İçerik</label>
          <textarea
            value={form.content || ""}
            onChange={(e) => handleChange("content", e.target.value)}
            rows={8}
            className={`px-4 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>

          {errors.content && (
            <span className="text-red-500 text-sm mt-1">{errors.content}</span>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
}
