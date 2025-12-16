import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/site/login", request.url));
  }

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
    console.log("DEBUG: Decoded Payload:", decoded); // Rol ismini buradan göreceğiz
    const userRole =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    console.log("DEBUG: Kullanıcı Rolü:", userRole);
    if (userRole !== "Admin") {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  } catch (err) {
    console.error("DEBUG: Decode Hatası:", err.message);
    return NextResponse.redirect(new URL("/site/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
