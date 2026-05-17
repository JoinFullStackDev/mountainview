"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaGrid } from "./media-grid";
import { ImageUploader } from "./image-uploader";
import { Loader2 } from "lucide-react";
import type { MediaItem } from "@/types/database";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string, mediaItem?: MediaItem) => void;
  folder?: string;
  title?: string;
}

export function MediaPicker({
  open,
  onOpenChange,
  onSelect,
  folder,
  title = "Select Image",
}: MediaPickerProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const supabase = createClient();

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (folder && folder !== "all") {
        query = query.eq("folder", folder);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching media:", error);
        return;
      }

      setMediaItems((data as MediaItem[]) || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase, folder]);

  useEffect(() => {
    if (open) {
      fetchMedia();
      setSelectedItem(null);
      setActiveTab("library");
    }
  }, [open, fetchMedia]);

  const handleSelect = (item: MediaItem) => {
    setSelectedItem(item);
  };

  const handleConfirm = () => {
    if (selectedItem) {
      onSelect(selectedItem.public_url, selectedItem);
      onOpenChange(false);
    }
  };

  const handleUploadComplete = (url: string) => {
    // Refresh the media list and switch to library tab
    fetchMedia();
    setActiveTab("library");
    // Auto-select the newly uploaded image
    onSelect(url);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload a new image or select from your media library
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "library" | "upload")}
          className="flex-1 flex flex-col min-h-0"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="flex-1 overflow-auto mt-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <MediaGrid
                items={mediaItems}
                selectionMode="single"
                selectedId={selectedItem?.id}
                onSelect={handleSelect}
              />
            )}
          </TabsContent>

          <TabsContent value="upload" className="flex-1 mt-4">
            <div className="max-w-md mx-auto">
              <ImageUploader
                value=""
                onChange={handleUploadComplete}
                folder={folder || "content"}
                aspectRatio="auto"
                saveToMediaLibrary
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedItem || activeTab !== "library"}
          >
            Select Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
