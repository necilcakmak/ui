import {  ApiResponse } from "@/api/types/apiResponse";
import { CreatePostPayload, PostDto, UpdatePostPayload } from "@/api/types/post";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchWrapper<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> { 
  try {
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const res = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers,
      credentials: "include", 
    });

    // 1. JSON'a Çevirme ve Hata Yakalama
    const apiResponse: ApiResponse<T> = await res.json().catch(() => ({ 
        succeeded: false, 
        message: "Sunucudan geçerli bir JSON formatı alınamadı." 
    }));
    
    // 2. HTTP Durum Kodu Kontrolü (Hata Yönlendirmesi)
    if (res.status === 401 && !apiResponse.succeeded) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      window.location.href = "/site/login";
      
      return { succeeded: false, data: null as any, message: "Redirecting to login..." };
    }
    
    // 3. Genel Ağ Hatası Kontrolü
    if (!res.ok) {
        if (apiResponse && apiResponse.succeeded === false) {
             return apiResponse;
        }
        
        // Eğer body boş veya tanımsız geldiyse (Nadir 500 hataları vb.)
        return { 
            succeeded: false, 
            data: null as any, 
            message: `API yanıtı başarısız oldu. Durum Kodu: ${res.status}`
        };
    }

    return apiResponse;

  } catch (err) {
    return { succeeded: false, data: null as any, message: "Ağ bağlantı hatası." };
  }
}

export const getData = <T>(endpoint: string) => fetchWrapper<T>(endpoint);



export const postData = <T>(endpoint: string, payload: any) =>
  fetchWrapper<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const putData = <T>(endpoint: string, payload: any) =>
  fetchWrapper<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteData = <T>(endpoint: string) =>
  fetchWrapper<T>(endpoint, {
    method: "DELETE",
  });
