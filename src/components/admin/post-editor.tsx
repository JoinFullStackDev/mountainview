"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TipTapEditor } from "./tiptap-editor";
import { ImageUploader } from "./image-uploader";
import { Loader2, Save, Eye, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Post, Category } from "@/types/database";

interface PostEditorProps {
  post?: Post;
  categories: Category[];
  authorId: string;
  authorName: string;
}

interface FieldErrors {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Error message component for inline field errors
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-sm text-destructive flex items-center gap-1.5 mt-1.5">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

export function PostEditor({ post, categories, authorId, authorName }: PostEditorProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!post;

  const [loading, setLoading] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  
  // Refs for scrolling to error fields
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLButtonElement>(null);
  
  // Form state
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status === "published" ? "published" : "draft"
  );
  
  // SEO state
  const [seoTitle, setSeoTitle] = useState(post?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description || "");
  const [seoCanonical, setSeoCanonical] = useState(post?.seo_canonical || "");
  const [ogImage, setOgImage] = useState(post?.og_image || "");
  const [noIndex, setNoIndex] = useState(post?.no_index || false);

  // Clear specific error when field changes
  const clearError = useCallback((field: keyof FieldErrors) => {
    setErrors((prev) => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    clearError("title");
    if (!isEditing || slug === generateSlug(post?.title || "")) {
      setSlug(generateSlug(value));
      clearError("slug");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!slug.trim()) {
      newErrors.slug = "Slug is required";
    }
    if (!excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    }
    if (!content.trim() || content === "<p></p>") {
      newErrors.content = "Content is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);

    // If there are errors, scroll to the first one
    if (Object.keys(newErrors).length > 0) {
      const errorCount = Object.keys(newErrors).length;
      toast.error(
        `Please fix ${errorCount} ${errorCount === 1 ? "error" : "errors"} before saving`,
        { duration: 4000 }
      );

      // Scroll to first error field
      if (newErrors.title && titleRef.current) {
        titleRef.current.focus();
        titleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.slug && slugRef.current) {
        slugRef.current.focus();
        slugRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.excerpt && excerptRef.current) {
        excerptRef.current.focus();
        excerptRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.content && contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.category && categoryRef.current) {
        categoryRef.current.focus();
        categoryRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return false;
    }

    return true;
  };

  const handleSave = async (publishStatus: "draft" | "published") => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const readTime = calculateReadTime(content);

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        category,
        featured_image: featuredImage || null,
        read_time: readTime,
        status: publishStatus,
        published_at: publishStatus === "published" ? new Date().toISOString() : null,
        author_id: authorId,
        author_name: authorName,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        seo_canonical: seoCanonical || null,
        og_image: ogImage || null,
        no_index: noIndex,
      };

      if (isEditing && post) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase.from("posts") as any)
          .update(postData)
          .eq("id", post.id);

        if (error) throw error;
        toast.success("Post updated successfully");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase.from("posts") as any)
          .insert(postData);

        if (error) throw error;
        toast.success("Post created successfully");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className={cn(errors.title && "text-destructive")}>
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                ref={titleRef}
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title"
                className={cn(errors.title && "border-destructive focus-visible:ring-destructive")}
              />
              <FieldError message={errors.title} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug" className={cn(errors.slug && "text-destructive")}>
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input
                ref={slugRef}
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  clearError("slug");
                }}
                placeholder="post-url-slug"
                className={cn(errors.slug && "border-destructive focus-visible:ring-destructive")}
              />
              <FieldError message={errors.slug} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt" className={cn(errors.excerpt && "text-destructive")}>
                Excerpt <span className="text-destructive">*</span>
              </Label>
              <Textarea
                ref={excerptRef}
                id="excerpt"
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  clearError("excerpt");
                }}
                placeholder="Brief description of the post (shown in previews)"
                rows={3}
                className={cn(errors.excerpt && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.excerpt ? (
                <FieldError message={errors.excerpt} />
              ) : (
                <p className="text-xs text-muted-foreground">
                  {excerpt.length}/160 characters recommended
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card ref={contentRef}>
          <CardHeader>
            <CardTitle className={cn(errors.content && "text-destructive")}>
              Content <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "rounded-md",
              errors.content && "ring-1 ring-destructive"
            )}>
              <TipTapEditor 
                content={content} 
                onChange={(value) => {
                  setContent(value);
                  clearError("content");
                }} 
              />
            </div>
            <FieldError message={errors.content} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <button
              type="button"
              className="flex items-center justify-between w-full"
              onClick={() => setShowSeo(!showSeo)}
            >
              <CardTitle>SEO Settings</CardTitle>
              {showSeo ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </CardHeader>
          {showSeo && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || "Override the page title for search engines"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={excerpt || "Description for search engine results"}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoCanonical">Canonical URL</Label>
                <Input
                  id="seoCanonical"
                  value={seoCanonical}
                  onChange={(e) => setSeoCanonical(e.target.value)}
                  placeholder="https://example.com/original-post"
                />
              </div>
              
              <div className="space-y-2">
                <ImageUploader
                  label="Open Graph Image"
                  value={ogImage}
                  onChange={setOgImage}
                  folder="og-images"
                  aspectRatio="video"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200x630px for social sharing
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="noIndex"
                  checked={noIndex}
                  onCheckedChange={setNoIndex}
                />
                <Label htmlFor="noIndex">
                  No Index (hide from search engines)
                </Label>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Publish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleSave("draft")}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Draft
              </Button>
              <Button
                className="flex-1"
                onClick={() => handleSave("published")}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                Publish
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={cn(errors.category && "text-destructive")}>
              Category <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={category} 
              onValueChange={(value) => {
                setCategory(value);
                clearError("category");
              }}
            >
              <SelectTrigger 
                ref={categoryRef}
                className={cn(errors.category && "border-destructive focus:ring-destructive")}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.category} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader
              value={featuredImage}
              onChange={setFeaturedImage}
              folder="featured"
              aspectRatio="video"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
