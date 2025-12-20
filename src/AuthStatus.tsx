// app/components/AuthStatus.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "./components/LogoutButton";

export default async function AuthStatus() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  const isLogged = !!authToken;

  return (
    <div className="flex items-center space-x-4 text-sm font-medium">
      {!isLogged ? (
        <>
          {/* <Link href="/site/login" className="hover:text-blue-600">
            Giriş Yap
          </Link>
          <Link href="/site/register" className="hover:text-blue-600">
            Kayıt Ol
          </Link> */}
        </>
      ) : (
        <LogoutButton />
      )}
    </div>
  );
}
