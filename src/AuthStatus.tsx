// app/components/AuthStatus.tsx
// "use client" YOK. next/headers'ı kullanmak için bu bir Server Component OLMALIDIR.

import Link from "next/link";
import { cookies } from "next/headers"; // Next.js'in çerez yardımcı fonksiyonunu içe aktarın
import { LogoutButton } from "./components/LogoutButton";

// Bileşen fonksiyonu (async değilse)
export default async function AuthStatus() {
  // 1. cookies() fonksiyonunu çağırın. Bu doğrudan ReadonlyRequestCookies nesnesini döndürür.
  const cookieStore = cookies();

  // 2. Artık 'get' özelliğine sahipsiniz.
  const authToken = (await cookieStore).get("authToken");

  const isLogged = !!authToken;

  // Çıkış Butonu için hala bir Client Component'e ihtiyacınız var.
  // (Önceki yanıtta detaylandırılmıştı)

  return (
    <div className="flex items-center space-x-4 text-sm font-medium">
      {!isLogged ? (
        <>
          <Link href="/site/login" className="hover:text-blue-600">
            Giriş Yap
          </Link>
          <Link href="/site/register" className="hover:text-blue-600">
            Kayıt Ol
          </Link>
        </>
      ) : (
        // Etkileşimli butonu Client Component ile sarmala
        <LogoutButton /> 
      )}
    </div>
  );
}
