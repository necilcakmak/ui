import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Tüm arama motoru botları (Google, Bing vb.) için geçerli
      allow: '/',     // Sitenin her yerini taramalarına izin ver
      disallow: [
        '/admin/',    // Eğer admin panelin varsa burayı taramalarını engelle
        '/private/',  // Gizli kalmasını istediğin sayfalar
        '/api/',      // API rotalarını taramalarına gerek yok
      ],
    },

    sitemap: 'https://necilcakmak.com/sitemap.xml',
  }
}