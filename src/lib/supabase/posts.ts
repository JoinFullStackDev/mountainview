import { createClient } from "./server";
import { createClient as createBrowserClient } from "@supabase/supabase-js";
import type { Post } from "@/types/database";

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Create a simple client for static generation (no cookies needed)
function createStaticClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty posts");
    return [];
  }

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false }) as { data: Post[] | null; error: Error | null };

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning null");
    return null;
  }

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single() as { data: Post | null; error: Error | null };

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data;
}

// Use static client for generateStaticParams (runs outside request scope)
export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty slugs");
    return [];
  }

  const supabase = createStaticClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published") as { data: { slug: string }[] | null; error: Error | null };

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return data?.map((p) => p.slug) || [];
}
