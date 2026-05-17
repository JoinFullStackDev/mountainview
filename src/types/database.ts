export type UserRole = "admin" | "staff";

export type PostStatus = "draft" | "published" | "archived";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string | null;
  author_id: string | null;
  author_name: string;
  category: string;
  featured_image: string | null;
  read_time: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_canonical: string | null;
  og_image: string | null;
  no_index: boolean;
  status: PostStatus;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  file_size: number;
  mime_type: string;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  folder: string;
  uploaded_by: string | null;
  created_at: string;
}

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Post, "id" | "created_at">>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at">;
        Update: Partial<Omit<Category, "id" | "created_at">>;
      };
      media: {
        Row: MediaItem;
        Insert: Omit<MediaItem, "id" | "created_at">;
        Update: Partial<Omit<MediaItem, "id" | "created_at">>;
      };
    };
  };
}

// Frontend-friendly blog post type (matches existing structure)
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

// Transform database post to frontend format
export function dbPostToBlogPost(post: Post): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.published_at || post.created_at,
    author: post.author_name,
    category: post.category,
    image: post.featured_image || "/placeholder.svg",
    readTime: post.read_time || "5 min read",
  };
}
