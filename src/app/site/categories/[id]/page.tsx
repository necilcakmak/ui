import { getPostByCategoryId } from "@/api/apiMethods";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: number }>;
}

export default async function CategoryPostsPage({ params }: Props) {
  const { id } = await params;

  const result = await getPostByCategoryId(id);
  const posts = Array.isArray(result.data) ? result.data : [];
console.log(posts)
  if (result.succeeded && posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl text-gray-600">
          Bu kategoride henüz yazı bulunamadı.
        </h1>
        <Link href="/" className="text-blue-500 underline mt-4 inline-block">
          Anasayfaya Dön
        </Link>
      </div>
    );
  }
  if (!result.succeeded || !result.data) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {posts[0]?.category?.name || "Kategori"}
        </h1>
        <p className="text-gray-500 mt-2">{posts.length} içerik bulundu</p>
      </header>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                <Link href={`/site/article/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 line-clamp-3 leading-relaxed">
                {post.title}
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span>
                  {new Date(post.createdDate).toLocaleDateString("tr-TR")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
