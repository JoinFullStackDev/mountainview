import { Metadata } from "next";
import { getMediaItems, deleteMediaItem } from "@/lib/supabase/media";
import { MediaLibraryClient } from "./media-library-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Library",
  description: "Manage uploaded images and media files",
};

export default async function MediaPage() {
  const mediaItems = await getMediaItems();

  async function handleDelete(id: string) {
    "use server";
    const result = await deleteMediaItem(id);
    if (!result.success) {
      throw new Error(result.error || "Failed to delete");
    }
  }

  return <MediaLibraryClient initialItems={mediaItems} onDelete={handleDelete} />;
}
