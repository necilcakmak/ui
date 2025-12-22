import { notFound } from "next/navigation";
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
    <div className="animate-fadeIn">
      {/* Header: Layout içine girdiği için pt-16'yı azalttık */}
      <header className="mb-10">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
            {article.category?.name}
          </span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-gray-400 text-xs">
            {formatDate(article.createdDate)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.2] mb-6">
          {article.title}
        </h1>

        {/* Yazar Bilgisi - Daha kompakt */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter">
              {article.author.userName!.substring(0, 2)}
            </div>
            <span className="text-sm font-bold text-gray-700">
              {article.author.userName}
            </span>
          </div>

          <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 9.316a3 3 0 100-2.684 3 3 0 000 2.684z"
              />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Paylaş
            </span>
          </button>
        </div>
      </header>

      {/* Makale İçeriği */}
      <article
        className="prose prose-sm md:prose-base prose-slate max-w-none 
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-p:text-gray-600 prose-p:leading-[1.7] 
        prose-img:rounded-[2rem] prose-img:shadow-lg
        prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
        prose-strong:text-gray-900"
      >
        <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
      </article>

      {/* Footer Tags */}
      <footer className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex flex-wrap gap-3">
          {["makale", "blog", "teknoloji"].map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
