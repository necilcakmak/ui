import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "./components/LogoutButton";

export default async function AuthStatus() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const isLogged = !!authToken;

  let userRole = null;

  if (authToken) {
    try {
      const payload = JSON.parse(
        Buffer.from(authToken.split(".")[1], "base64").toString()
      );
      userRole =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (err) {
      console.error("Token decode hatası:", err);
    }
  }

  return (
    <div className="flex items-center space-x-3 antialiased">
      {!isLogged ? (
        <div className="flex items-center space-x-2">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Giriş Yap
          </Link>

          <Link
            href="/auth/register"
            className="px-5 py-2 text-[13px] font-bold bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-sm active:scale-95"
          >
            Kayıt Ol
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 mr-2">
            {userRole === "Admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 text-[13px] font-bold text-blue-600 hover:bg-blue-50 rounded-full transition-all mr-2 border border-blue-100"
              >
                Admin Paneli
              </Link>
            )}

            <div className="w-7 h-7 bg-blue-50 rounded-full border border-blue-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                {userRole === "Admin" ? "Adm" : "Usr"}
              </span>
            </div>
          </div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
