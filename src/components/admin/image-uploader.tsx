"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon, FolderOpen, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
  folder?: string;
  aspectRatio?: "video" | "square" | "auto";
  saveToMediaLibrary?: boolean;
  showLibraryOption?: boolean;
  onLibraryClick?: () => void;
  allowMultiple?: boolean;
  onMultipleUploadComplete?: () => void;
}

interface UploadProgress {
  fileName: string;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
}

/**
 * Get image dimensions from a File
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

export function ImageUploader({
  value,
  onChange,
  label = "Image",
  bucket = "blog-images",
  folder = "featured",
  aspectRatio = "video",
  saveToMediaLibrary = false,
  showLibraryOption = false,
  onLibraryClick,
  allowMultiple = false,
  onMultipleUploadComplete,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<"upload" | "url" | "library">("upload");
  const [urlInput, setUrlInput] = useState(value || "");
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  const supabase = createClient();

  const uploadSingleFile = useCallback(
    async (file: File): Promise<string | null> => {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type for ${file.name}. Please upload a JPEG, PNG, GIF, or WebP image.`);
        return null;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`);
        return null;
      }

      try {
        // Get image dimensions
        let dimensions: { width: number; height: number } | null = null;
        try {
          dimensions = await getImageDimensions(file);
        } catch (err) {
          console.warn("Could not get image dimensions:", err);
        }

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

        const publicUrl = urlData.publicUrl;

        // Save to media library if enabled
        if (saveToMediaLibrary) {
          const { data: userData } = await supabase.auth.getUser();
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error: mediaError } = await (supabase.from("media") as any).insert({
            file_name: file.name,
            file_path: data.path,
            public_url: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            width: dimensions?.width || null,
            height: dimensions?.height || null,
            folder: folder,
            uploaded_by: userData?.user?.id || null,
          });

          if (mediaError) {
            console.error("Error saving to media library:", mediaError);
          }
        }

        return publicUrl;
      } catch (error) {
        console.error("Upload failed:", error);
        return null;
      }
    },
    [bucket, folder, supabase, saveToMediaLibrary]
  );

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      const url = await uploadSingleFile(file);
      if (url) {
        onChange(url);
        if (!saveToMediaLibrary) {
          toast.success("Image uploaded successfully");
        }
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
      setIsUploading(false);
    },
    [uploadSingleFile, onChange, saveToMediaLibrary]
  );

  const handleMultipleUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      setIsUploading(true);
      
      // Initialize progress tracking
      const initialProgress: UploadProgress[] = files.map((file) => ({
        fileName: file.name,
        status: "pending",
        progress: 0,
      }));
      setUploadProgress(initialProgress);

      let successCount = 0;
      let lastUrl: string | null = null;

      // Upload files sequentially to avoid overwhelming the server
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update status to uploading
        setUploadProgress((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, status: "uploading", progress: 50 } : p
          )
        );

        const url = await uploadSingleFile(file);
        
        if (url) {
          successCount++;
          lastUrl = url;
          setUploadProgress((prev) =>
            prev.map((p, idx) =>
              idx === i ? { ...p, status: "success", progress: 100 } : p
            )
          );
        } else {
          setUploadProgress((prev) =>
            prev.map((p, idx) =>
              idx === i ? { ...p, status: "error", progress: 100 } : p
            )
          );
        }
      }

      // Show completion message
      if (successCount === files.length) {
        toast.success(`${successCount} image${successCount > 1 ? "s" : ""} uploaded successfully`);
      } else if (successCount > 0) {
        toast.warning(`${successCount} of ${files.length} images uploaded successfully`);
      } else {
        toast.error("Failed to upload images");
      }

      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress([]);
        setIsUploading(false);
        
        // Call completion callback for multiple uploads
        if (onMultipleUploadComplete && successCount > 0) {
          onMultipleUploadComplete();
        } else if (lastUrl && successCount === 1) {
          // For single file in multiple mode, still call onChange
          onChange(lastUrl);
        }
      }, 1500);
    },
    [uploadSingleFile, onChange, onMultipleUploadComplete]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (allowMultiple && files.length > 1) {
      handleMultipleUpload(Array.from(files));
    } else {
      handleUpload(files[0]);
    }
    
    // Reset input value to allow selecting the same files again
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      if (allowMultiple && files.length > 1) {
        handleMultipleUpload(Array.from(files));
      } else {
        handleUpload(files[0]);
      }
    },
    [allowMultiple, handleUpload, handleMultipleUpload]
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
    const trimmedUrl = urlInput.trim();
    
    if (!trimmedUrl) {
      toast.error("Please enter a URL");
      return;
    }

    // Validate URL format
    try {
      const parsedUrl = new URL(trimmedUrl);
      
      // Only allow HTTPS URLs for security
      if (parsedUrl.protocol !== "https:") {
        toast.error("Only HTTPS URLs are allowed for security reasons");
        return;
      }

      // Validate URL points to an image (by extension)
      const pathname = parsedUrl.pathname.toLowerCase();
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
      const hasValidExtension = validExtensions.some((ext) => pathname.endsWith(ext));
      
      // Also allow known CDN URLs without extension check
      const allowedHosts = [
        "images.unsplash.com",
        "cdn.jsdelivr.net",
        "res.cloudinary.com",
        "i.imgur.com",
        "storage.googleapis.com",
      ];
      // Allow any supabase storage URL
      const isSupabaseStorage = parsedUrl.hostname.endsWith(".supabase.co");
      const isAllowedHost = allowedHosts.includes(parsedUrl.hostname);

      if (!hasValidExtension && !isSupabaseStorage && !isAllowedHost) {
        toast.error("URL must point to an image file (.jpg, .png, .gif, .webp, .svg)");
        return;
      }

      onChange(trimmedUrl);
      toast.success("Image URL saved");
    } catch {
      toast.error("Please enter a valid URL");
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

  const handleLibraryClick = () => {
    if (onLibraryClick) {
      onLibraryClick();
    }
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
      <div className="flex gap-2 flex-wrap">
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
        {showLibraryOption && (
          <Button
            type="button"
            variant={mode === "library" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setMode("library");
              handleLibraryClick();
            }}
          >
            <FolderOpen className="h-4 w-4 mr-1.5" />
            Library
          </Button>
        )}
      </div>

      {/* Upload Mode */}
      {mode === "upload" && !value && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            aspectClass,
            !aspectClass && "min-h-[200px]"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple={allowMultiple}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            {isUploading && uploadProgress.length === 0 ? (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : uploadProgress.length > 0 ? (
              <div className="w-full max-w-xs space-y-2">
                <p className="text-sm font-medium mb-3">
                  Uploading {uploadProgress.length} image{uploadProgress.length > 1 ? "s" : ""}...
                </p>
                {uploadProgress.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate max-w-[180px]">{item.fileName}</span>
                      {item.status === "success" && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                      {item.status === "error" && (
                        <X className="h-4 w-4 text-destructive flex-shrink-0" />
                      )}
                      {item.status === "uploading" && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
                      )}
                    </div>
                    <Progress value={item.progress} className="h-1" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm font-medium">
                  Drop {allowMultiple ? "images" : "an image"} here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG, PNG, GIF, WebP up to 5MB{allowMultiple ? " each" : ""}
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

      {/* Library Mode - shows hint to open picker */}
      {mode === "library" && !value && showLibraryOption && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg transition-colors border-muted-foreground/25 hover:border-primary/50 cursor-pointer",
            aspectClass,
            !aspectClass && "min-h-[200px]"
          )}
          onClick={handleLibraryClick}
        >
          <div className="flex flex-col items-center justify-center p-4 text-center h-full min-h-[200px]">
            <FolderOpen className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium">
              Click to open Media Library
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Select from previously uploaded images
            </p>
          </div>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className={cn("relative rounded-lg overflow-hidden bg-muted", aspectClass, !aspectClass && "max-h-[300px]")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className={cn("object-cover w-full", aspectClass ? "h-full" : "max-h-[300px]")}
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
