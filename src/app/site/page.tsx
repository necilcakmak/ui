// app/blog/page.tsx (Veya Dashboard dizininiz)
import { getPosts } from "@/api/apiMethods";
import BlogListClient from "@/app/site/BlogListClient";
import { Metadata } from "next";

// SEO Metadata: Arama sonuçlarında görünecek başlık ve açıklama
export const metadata: Metadata = {
  title: "Blog | Necil Çakmak",
  description:
    "Yazılım geliştirme, teknoloji ve güncel rehberler üzerine makaleler.",
  openGraph: {
    title: "Necil Çakmak Blog",
    description: "En yeni teknoloji içerikleri.",
    url: "https://necilcakmak.com",
  },
};

export default async function Dashboard() {
  // Veri çekme işlemi doğrudan sunucuda yapılır
  const result = await getPosts();
  console.log(result)
  const initialPosts = result.succeeded ? result.data || [] : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Blog Yazıları
        </h1>
        <p className="text-gray-500">
          En yeni teknolojiler ve rehber içerikler.
        </p>
      </div>

      {/* Etkileşimli arama ve listeleme kısmını Client Component'e devrediyoruz */}
      <BlogListClient initialPosts={initialPosts} />
    </div>
  );
}
