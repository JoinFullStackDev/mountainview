"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
  folder?: string;
  aspectRatio?: "video" | "square" | "auto";
}

export function ImageUploader({
  value,
  onChange,
  label = "Image",
  bucket = "blog-images",
  folder = "featured",
  aspectRatio = "video",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value || "");

  const supabase = createClient();

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) return;

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File too large. Maximum size is 5MB.");
        return;
      }

      setIsUploading(true);

      try {
        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        onChange(urlData.publicUrl);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, onChange, supabase.storage]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      toast.success("Image URL saved");
    }
  };

  const handleRemove = async () => {
    // If the image was uploaded to our storage, try to delete it
    if (value && value.includes(bucket)) {
      try {
        // Extract the path from the URL
        const url = new URL(value);
        const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
        if (pathMatch) {
          const filePath = pathMatch[1];
          await supabase.storage.from(bucket).remove([filePath]);
        }
      } catch (error) {
        console.error("Failed to delete image from storage:", error);
      }
    }
    onChange("");
    setUrlInput("");
  };

  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    auto: "",
  }[aspectRatio];

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("upload")}
        >
          <Upload className="h-4 w-4 mr-1.5" />
          Upload
        </Button>
        <Button
          type="button"
          variant={mode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("url")}
        >
          <LinkIcon className="h-4 w-4 mr-1.5" />
          URL
        </Button>
      </div>

      {/* Upload Mode */}
      {mode === "upload" && !value && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            aspectClass
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm font-medium">
                  Drop an image here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG, PNG, GIF, WebP up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* URL Mode */}
      {mode === "url" && !value && (
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
          >
            Add
          </Button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className={cn("relative rounded-lg overflow-hidden bg-muted", aspectClass)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
