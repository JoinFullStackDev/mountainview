import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import type { Profile, Category, Post } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Post",
  description: "Edit blog post",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single() as { data: Profile | null };

  if (!profile) {
    redirect("/admin/login");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single() as { data: Post | null };

  if (!post) {
    notFound();
  }

  // Check if user can edit this post
  const canEdit =
    profile.role === "admin" ||
    profile.role === "editor" ||
    post.author_id === user.id;

  if (!canEdit) {
    redirect("/admin/posts");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name") as { data: Category[] | null };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
        <p className="text-muted-foreground">
          Update &quot;{post.title}&quot;
        </p>
      </div>

      <PostEditor
        post={post}
        categories={categories || []}
        authorId={post.author_id || user.id}
        authorName={post.author_name}
      />
    </div>
  );
}
