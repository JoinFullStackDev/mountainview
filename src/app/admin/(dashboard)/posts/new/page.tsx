import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import type { Profile, Category } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new blog post",
};

export default async function NewPostPage() {
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

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name") as { data: Category[] | null };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Post</h2>
        <p className="text-muted-foreground">
          Create a new blog post
        </p>
      </div>

      <PostEditor
        categories={categories || []}
        authorId={user.id}
        authorName={profile.full_name || profile.email}
      />
    </div>
  );
}
