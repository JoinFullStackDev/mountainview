import type { MetadataRoute } from "next";
import { absoluteUrl, STATIC_ROUTES } from "@/lib/seo/site";
import { getPublishedPosts } from "@/lib/supabase/posts";

// Re-fetch posts at most once an hour so newly published / un-published
// posts show up without a redeploy. Sitemaps don't need to be real-time.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !post.no_index)
    .map((post) => {
      const updated = post.updated_at ?? post.published_at ?? post.created_at;
      return {
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: updated ? new Date(updated) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

  return [...staticEntries, ...postEntries];
}
