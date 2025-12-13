// "use client"; // Eğer App Router kullanıyorsanız, burası bir Client Component olduğu için dursun.
// Eğer dosya ismi not-found.js/tsx ise genellikle otomatik olarak Server Component olarak kabul edilir.
// Ancak içeriğiniz client component gibi çalışabilir.

import Link from "next/link";

export default function NotFound() {
  return (
    // ⚠️ DİKKAT: Ana HTML ve BODY etiketleri KALDIRILDI.
    // Full ekran stilini burada sağlamak zor olabilir, ancak bu hidrasyon hatasını çözer.
    // En dıştaki div'e sayfanın arka planını ve ortalama stillerini veriyoruz.
    <div className="bg-black text-white flex items-center justify-center min-h-screen w-full">
      <div className="text-center px-4">
        <h1 className="text-9xl font-extrabold mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}

// NOT: Eğer bu 404 sayfasının tamamının arka planı siyah değilse,
// arkaplan stillerini (bg-black min-h-screen) ana layout'unuzdaki <body> etiketine taşımanız gerekebilir.
