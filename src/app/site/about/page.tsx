import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vizyon & Teknolojiler | Necil Çakmak",
  description:
    "Yazılım mimarileri, .NET araştırmaları ve modern web üzerine teknik detaylar.",
};

const Icons = {
  Cpu: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 00-2 2zM9 9h6v6H9V9z"
      />
    </svg>
  ),
  Beaker: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
};

export default function AboutPage() {
  return (
    <div className="animate-fadeIn space-y-12">
      {/* Header - Sidebar'daki isimle çakışmaması için daha çok bir slogan/başlık */}
      <div className="space-y-4 border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Sistem Tasarımı ve <span className="text-blue-600">Mühendislik</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg leading-relaxed">
          Karmaşıklığı yönetmek, ölçeklenebilir çözümler üretmek ve modern UI
          trendlerini takip etmek üzerine bir yolculuk.
        </p>
      </div>

      {/* Teknik Odak Alanları */}
      <div className="grid grid-cols-1 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-blue-600">
              <Icons.Cpu />
            </span>{" "}
            Backend & Mimari
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bilgisayar Mühendisliği altyapımı, **.NET** ekosisteminin gücüyle
            birleştiriyorum. Redis ile önbellekleme stratejileri, RabbitMQ ile
            asenkron mesajlaşma ve mikroservisler arasındaki iletişim
            dinamikleri en çok vakit geçirdiğim alanlar.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-indigo-600">
              <Icons.Beaker />
            </span>{" "}
            UI & Araştırma
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bir arayüzün sadece güzel olması yetmez; hızlı, erişilebilir ve
            tutarlı olması gerekir. **React, Angular ve Next.js** dünyasındaki
            yenilikleri takip ederek, kullanıcı deneyimini mühendislik
            disipliniyle optimize ediyorum.
          </p>
        </section>
      </div>

      {/* Bilgi Kartı - Sidebar'ı tamamlayıcı küçük bir detay */}
      <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 text-sm text-blue-800">
        <strong>Not:</strong> Bu blog, öğrendiklerimi belgelerken aynı zamanda
        güncel teknolojileri denediğim bir laboratuvar görevi görüyor.
      </div>
    </div>
  );
}
