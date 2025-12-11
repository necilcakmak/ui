// app/(site)/layout.tsx veya başka bir yerde
// "use client" yönergesini KALDIRIN. Layout varsayılan olarak Server Component olmalı.

import Link from "next/link";
// @/AuthStatus'ın Server Component (SC) olduğunu varsayıyoruz
import AuthStatus from "@/AuthStatus";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="w-full bg-white shadow-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link href="/">MyBlog</Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-8 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600">
                Anasayfa
              </Link>
              <Link href="/categories" className="hover:text-blue-600">
                Kategoriler
              </Link>
            </div>
          </div>
          {/* AuthStatus (SC) burada sorunsuz render edilir. */}
          <AuthStatus />
        </div>
      </nav>
      <main className="max-w-3xl mx-auto mt-6 px-4">{children}</main>
    </>
  );
}
