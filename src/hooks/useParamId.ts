"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * URL'deki dinamik segmentten (varsayılan: [slug/id]) sayısal ID değerini güvenli bir şekilde çözer.
 * ID formatı hatalıysa, toast gösterir ve kullanıcıyı 404 sayfasına yönlendirir.
 * * @param segmentName Dinamik segmentin adı (Varsayılan: 'id' veya 'slug' gibi).
 * @returns Geçerli postId (number) veya yüklenmediyse/geçersizse null.
 */
export const useParamId = (segmentName: string = "id"): number | null => {
  const params = useParams();
  const router = useRouter(); // Yönlendirme için router gereklidir.

  const postId = useMemo(() => {
    // 1. Parametreye erişim
    const slug = params?.[segmentName];

    if (!slug) {
      // URL'de parametre henüz yoksa (ilk render anında)
      return null;
    }

    // 2. Slug'ı tekil string'e dönüştürme (dizi/catch-all durumları için)
    const slugValue = Array.isArray(slug) ? slug[0] : slug;

    // 3. Geçerli bir string olmalı
    if (!slugValue) {
      return null;
    }

    // 4. Sayıya dönüştürme
    const id = parseInt(slugValue, 10);

    // 5. Doğrulama ve Yönlendirme
    if (isNaN(id) || id <= 0) {
      // Sadece bir kere hata mesajı göster ve yönlendir
      toast.error("URL formatı hatalı. Geçersiz ID.");
      router.replace("/404");
      return null;
    }

    return id;
  }, [params, segmentName, router]); // router hook olduğu için bağımlılığa eklenmelidir.

  return postId;
};
