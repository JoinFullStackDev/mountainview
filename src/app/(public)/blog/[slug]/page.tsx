import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts, getAllPostSlugs } from "@/lib/supabase/posts";
import { format } from "date-fns";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
      images: post.og_image || post.featured_image ? [post.og_image || post.featured_image!] : undefined,
    },
    robots: post.no_index ? { index: false, follow: false } : undefined,
    alternates: post.seo_canonical ? { canonical: post.seo_canonical } : undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm mb-4">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8 rounded-xl overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author_name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.published_at
                ? format(new Date(post.published_at), "MMMM d, yyyy")
                : "Draft"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.read_time || "5 min read"}
            </span>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:mb-2
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-muted/50 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">More Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <span className="text-xs font-medium text-primary">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-semibold mt-2 mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center [&_h2]:text-white [&_p]:text-white/80">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have Questions About Your Health?
          </h2>
          <p className="mb-6 max-w-xl mx-auto">
            Our pharmacists are here to help. Contact us for personalized advice and care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
