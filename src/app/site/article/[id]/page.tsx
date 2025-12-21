import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostById } from "@/api/apiMethods";

const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

interface Props {
  params: Promise<{ id: number }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getPostById(id);

  if (!result.succeeded || !result.data) {
    notFound();
  }

  const article = result.data;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <header className="bg-white border-b border-gray-200 mb-10">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(article.createdDate)}
            </span>
            <span>•</span>
            <span className="font-medium text-gray-700">
              {article.author.userName} tarafından
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Kategoriler
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {article.category?.name}
              </Link>
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <article className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
          </article>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
              #makale
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
              #blog
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
              #teknoloji
            </span>
          </div>
        </main>
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <span className="text-gray-400 text-3xl font-bold uppercase">
                    {article.author.userName!.substring(0, 2)}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <h4 className="font-bold text-gray-900 text-lg">
              {article.author.userName}
            </h4>
            <p className="text-gray-500 text-sm mb-6">İçerik Yazarı</p>
            <button className="w-full py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition">
              Tüm Yazıları
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
