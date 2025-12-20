import { getCategories } from "@/api/apiMethods";
import { CategoryDto } from "@/api/types/category";
import Link from "next/link";
import { Metadata } from "next";

// 1. SEO için Metadata (Dinamikleştirilebilir)
export const metadata: Metadata = {
  title: "Kategoriler | Necil Çakmak",
  description: "Yazılım, teknoloji ve kişisel gelişim üzerine tüm içerik kategorileri.",
};

export default async function CategoriesPage() {
  // 2. Veriyi doğrudan sunucuda çekiyoruz
  const result = await getCategories();
  const categories: CategoryDto[] = result.succeeded ? result.data : [];

  return (
    <div className="py-10 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Kategoriler
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          İlgi alanınıza göre makaleleri keşfedin.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  {category.tagName && (
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                      #{category.tagName}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>

                {category.parentCategoryDto && (
                  <div className="flex items-center text-sm text-gray-500 mt-3 bg-gray-50 p-2 rounded-xl">
                    <span className="mr-2 text-xs opacity-60 italic">Üst:</span>
                    <span className="font-semibold text-gray-700">
                      {category.parentCategoryDto.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between text-sm font-bold text-blue-600">
                <span>Makaleleri Gör</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-inner">
          <p className="text-gray-400 font-medium text-lg">Henüz bir kategori eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}