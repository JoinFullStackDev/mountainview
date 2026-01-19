import { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/supabase/posts";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Blog",
  description: "Health and wellness tips, pharmacy updates, and expert insights from Mountain View Pharmacy.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
              Resources
            </span>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Health &amp; Wellness Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert insights, health tips, and pharmacy updates from our team to help you live a healthier life.
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-card rounded-lg border overflow-hidden group hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {post.featured_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.published_at
                        ? format(new Date(post.published_at), "MMM d, yyyy")
                        : "Draft"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.read_time || "5 min read"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Read More
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
            <p className="text-muted-foreground">
              Check back soon for health tips and pharmacy updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
