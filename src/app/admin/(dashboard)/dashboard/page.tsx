import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard overview",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch stats
  const [postsResult, publishedResult, draftsResult] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
  ]);

  const totalPosts = postsResult.count || 0;
  const publishedPosts = publishedResult.count || 0;
  const draftPosts = draftsResult.count || 0;

  // Fetch recent posts
  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id, title, slug, status, created_at, author_name")
    .order("created_at", { ascending: false })
    .limit(5) as { data: Pick<Post, "id" | "title" | "slug" | "status" | "created_at" | "author_name">[] | null };

  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: FileText,
      description: "All blog posts",
    },
    {
      title: "Published",
      value: publishedPosts,
      icon: Eye,
      description: "Live on site",
    },
    {
      title: "Drafts",
      value: draftPosts,
      icon: TrendingUp,
      description: "Awaiting publish",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the Mountain View Pharmacy CMS
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Latest blog posts in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Link 
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        by {post.author_name}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : post.status === "draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No posts yet.{" "}
                <Link href="/admin/posts/new" className="text-primary hover:underline">
                  Create your first post
                </Link>
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span className="font-medium">Create New Post</span>
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="font-medium">Manage All Posts</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
