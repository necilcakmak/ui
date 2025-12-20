import { ApiResponse } from "@/api/types/apiResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWrapper<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const isServer = typeof window === "undefined";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    console.log("İstek gidiyor:", `${API_URL}/${endpoint}`);
    const res = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers,
      cache: "no-store", // SEO ve güncel veri için SSR'da cache'i kapatmak iyidir
    });

    const text = await res.text();
    const apiResponse: ApiResponse<T> = text ? JSON.parse(text) : {};

    // Sadece tarayıcıda çalışacak kod
    if (res.status === 401 && !isServer) {
      window.location.href = "/site/login";
    }

    return {
      succeeded: res.ok,
      data: apiResponse.data,
      message: apiResponse.message || (res.ok ? "" : "İstek başarısız oldu"),
      validationErrors: apiResponse.validationErrors,
    };
  } catch (err) {
    return {
      succeeded: false,
      data: null as any,
      message: "Bağlantı kurulamadı.",
    };
  }
}

// Dışarıya aktarılan yardımcılar
export const getData = <T>(e: string) => fetchWrapper<T>(e, { method: "GET" });
export const postData = <T>(e: string, p: any) =>
  fetchWrapper<T>(e, { method: "POST", body: JSON.stringify(p) });
export const putData = <T>(e: string, p: any) =>
  fetchWrapper<T>(e, { method: "PUT", body: JSON.stringify(p) });
export const deleteData = <T>(e: string) =>
  fetchWrapper<T>(e, { method: "DELETE" });
