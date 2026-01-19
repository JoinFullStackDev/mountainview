import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Posts",
  description: "Manage blog posts",
};

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false }) as { data: Post[] | null; error: Error | null };

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">
            Create and manage blog posts
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        {posts && posts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/admin/posts/${post.id}/edit`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.author_name}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published"
                          ? "default"
                          : post.status === "draft"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(post.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No posts found</p>
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
