"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database";

const ALLOWED_ROLES = ["admin", "staff"] as const;

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(60, "Category name is too long"),
});

export type CreateCategoryResult =
  | { success: true; category: Category }
  | { success: false; error: string };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/**
 * Create a new blog post category.
 *
 * Authorization: only authenticated users with role `admin` or `staff` may
 * create categories. RLS also enforces this at the database level; the check
 * here is defense in depth and lets us return a friendly error message.
 */
export async function createCategory(name: string): Promise<CreateCategoryResult> {
  const validation = createCategorySchema.safeParse({ name });
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0]?.message ?? "Invalid category name",
    };
  }

  const trimmed = validation.data.name;
  const slug = slugify(trimmed);
  if (!slug) {
    return { success: false, error: "Category name must contain letters or numbers" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "You must be signed in to create categories." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single() as { data: { role: string } | null };

  if (!profile || !ALLOWED_ROLES.includes(profile.role as (typeof ALLOWED_ROLES)[number])) {
    return { success: false, error: "You do not have permission to create categories." };
  }

  // If a category already exists with the same slug, return it so the caller
  // can simply select it instead of producing a confusing duplicate error.
  const { data: existing } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle() as { data: Category | null };

  if (existing) {
    return { success: true, category: existing };
  }

  const { data: inserted, error: insertError } = await (
    supabase.from("categories") as unknown as {
      insert: (
        row: { name: string; slug: string }
      ) => {
        select: () => {
          single: () => Promise<{ data: Category | null; error: Error | null }>;
        };
      };
    }
  )
    .insert({ name: trimmed, slug })
    .select()
    .single();

  if (insertError || !inserted) {
    console.error("Error creating category:", insertError);
    return { success: false, error: "Failed to create category." };
  }

  revalidatePath("/admin/posts/new");
  revalidatePath("/admin/posts/[id]/edit", "page");

  return { success: true, category: inserted };
}
