import { createClient } from "./server";
import type { MediaItem } from "@/types/database";

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Get all media items, optionally filtered by folder
 */
export async function getMediaItems(folder?: string): Promise<MediaItem[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty media");
    return [];
  }

  const supabase = await createClient();

  let query = supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (folder && folder !== "all") {
    query = query.eq("folder", folder);
  }

  const { data, error } = await query as { data: MediaItem[] | null; error: Error | null };

  if (error) {
    console.error("Error fetching media:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a single media item by ID
 */
export async function getMediaItem(id: string): Promise<MediaItem | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning null");
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single() as { data: MediaItem | null; error: Error | null };

  if (error) {
    console.error("Error fetching media item:", error);
    return null;
  }

  return data;
}

/**
 * Delete a media item from both the database and storage
 */
export async function deleteMediaItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase not configured" };
  }

  const supabase = await createClient();

  // First, get the media item to find the file path
  const { data: mediaItem, error: fetchError } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single() as { data: MediaItem | null; error: Error | null };

  if (fetchError || !mediaItem) {
    return { success: false, error: "Media item not found" };
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from("blog-images")
    .remove([mediaItem.file_path]);

  if (storageError) {
    console.error("Error deleting from storage:", storageError);
    // Continue to delete from database anyway
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from("media")
    .delete()
    .eq("id", id);

  if (dbError) {
    console.error("Error deleting from database:", dbError);
    return { success: false, error: dbError.message };
  }

  return { success: true };
}

/**
 * Update media item metadata (e.g., alt text)
 */
export async function updateMediaItem(
  id: string,
  updates: { alt_text?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase not configured" };
  }

  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("media") as any)
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating media item:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
