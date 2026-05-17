"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MediaGrid } from "@/components/admin/media-grid";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { MediaItem } from "@/types/database";

interface MediaLibraryClientProps {
  initialItems: MediaItem[];
  onDelete: (id: string) => Promise<void>;
}

const FOLDERS = [
  { value: "all", label: "All" },
  { value: "featured", label: "Featured" },
  { value: "og-images", label: "OG Images" },
  { value: "content", label: "Content" },
  { value: "general", label: "General" },
];

export function MediaLibraryClient({ initialItems, onDelete }: MediaLibraryClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeFolder, setActiveFolder] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFolder, setUploadFolder] = useState("general");

  const filteredItems =
    activeFolder === "all"
      ? initialItems
      : initialItems.filter((item) => item.folder === activeFolder);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await onDelete(id);
        router.refresh();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete image");
      }
    });
  };

  const handleUploadComplete = () => {
    setUploadDialogOpen(false);
    router.refresh();
  };

  const handleMultipleUploadComplete = () => {
    setUploadDialogOpen(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">
            Manage uploaded images and media files
          </p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      <Tabs value={activeFolder} onValueChange={setActiveFolder}>
        <TabsList>
          {FOLDERS.map((folder) => (
            <TabsTrigger key={folder.value} value={folder.value}>
              {folder.label}
              {folder.value !== "all" && (
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({initialItems.filter((i) => i.folder === folder.value).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="rounded-lg border bg-card p-6">
        <MediaGrid
          items={filteredItems}
          loading={isPending}
          onDelete={handleDelete}
        />
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Folder</label>
              <Tabs value={uploadFolder} onValueChange={setUploadFolder}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="og-images">OG</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ImageUploader
              value=""
              onChange={handleUploadComplete}
              folder={uploadFolder}
              aspectRatio="auto"
              saveToMediaLibrary
              allowMultiple
              onMultipleUploadComplete={handleMultipleUploadComplete}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
