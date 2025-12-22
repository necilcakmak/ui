import { getCategories } from "@/api/apiMethods";
import Link from "next/link";

export default async function CategorySidebar() {
  const result = await getCategories();
  const categories = result.succeeded ? result.data : [];

  return (
    <div className="lg:sticky lg:top-28 space-y-6">
      <div className="bg-white border border-gray-100 p-7 rounded-[2.5rem] shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 mb-5 uppercase tracking-[0.2em]">
          Kategoriler
        </h3>
        <nav className="flex flex-col space-y-3">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/site/categories/${category.id}`}
              className="group flex items-center justify-between text-[13px] text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
