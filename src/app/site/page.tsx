import { getPosts } from "@/api/apiMethods";
import BlogListClient from "@/app/site/BlogListClient";
import { Metadata } from "next";

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
  const result = await getPosts();
  const initialPosts = result.succeeded ? result.data || [] : [];

  return (
    <div className="animate-fadeIn space-y-10">
      {/* Üst Başlık Alanı - Daha Dashboard vari bir görünüm */}
      <div className="flex flex-col space-y-2 border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Blog Yazıları
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          En yeni teknolojiler, .NET rehberleri ve sistem mimarileri.
        </p>
      </div>

      {/* Blog Listesi */}
      <div className="min-h-[400px]">
        <BlogListClient initialPosts={initialPosts} />
      </div>
    </div>
  );
}
