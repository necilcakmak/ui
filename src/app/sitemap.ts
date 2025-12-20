import { getPosts } from '@/api/apiMethods'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getPosts();
  const posts = result.data || [];
 
  const postEntries = posts.map((post) => ({
    url: `https://necilcakmak.com/site/article/${post.id}`,
    lastModified: new Date(post.createdDate),
  }));
 
  return [
    { url: 'https://necilcakmak.com', lastModified: new Date() },
    { url: 'https://necilcakmak.com/categories', lastModified: new Date() },
    ...postEntries,
  ]
}