-- =====================================================
-- Mountain View Pharmacy CMS - Combined Database Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- =====================================================

-- 1. Create updated_at trigger function (used by multiple tables)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper function to get current user's role (SECURITY DEFINER bypasses RLS)
-- This prevents infinite recursion when checking roles in policies
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function to check if current user has a specific role
CREATE OR REPLACE FUNCTION public.user_has_role(required_roles TEXT[])
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = ANY(required_roles)
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- 2. PROFILES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'author', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role() = 'admin');

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.get_user_role() = 'admin');

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- =====================================================
-- 3. CATEGORIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
CREATE POLICY "Public can read categories"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Editors can create categories" ON public.categories;
CREATE POLICY "Editors can create categories"
  ON public.categories FOR INSERT
  WITH CHECK (public.user_has_role(ARRAY['admin', 'editor']));

DROP POLICY IF EXISTS "Editors can update categories" ON public.categories;
CREATE POLICY "Editors can update categories"
  ON public.categories FOR UPDATE
  USING (public.user_has_role(ARRAY['admin', 'editor']));

DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;
CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  USING (public.get_user_role() = 'admin');

-- Seed initial categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Health Tips', 'health-tips', 'General health and wellness tips for everyday life'),
  ('Pharmacy Services', 'pharmacy-services', 'Information about our pharmacy services and offerings'),
  ('Immunizations', 'immunizations', 'Vaccine information and immunization services')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 4. POSTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES public.profiles(id),
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  featured_image TEXT,
  read_time TEXT,
  -- SEO fields
  seo_title TEXT,
  seo_description TEXT,
  seo_canonical TEXT,
  og_image TEXT,
  no_index BOOLEAN DEFAULT FALSE,
  -- Metadata
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON public.posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);

-- RLS Policies for posts
DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

DROP POLICY IF EXISTS "Authors can read own posts" ON public.posts;
CREATE POLICY "Authors can read own posts"
  ON public.posts FOR SELECT
  USING (author_id = auth.uid());

DROP POLICY IF EXISTS "Editors can read all posts" ON public.posts;
CREATE POLICY "Editors can read all posts"
  ON public.posts FOR SELECT
  USING (public.user_has_role(ARRAY['admin', 'editor']));

DROP POLICY IF EXISTS "Authors can create posts" ON public.posts;
CREATE POLICY "Authors can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (public.user_has_role(ARRAY['admin', 'editor', 'author']));

DROP POLICY IF EXISTS "Authors can update own posts" ON public.posts;
CREATE POLICY "Authors can update own posts"
  ON public.posts FOR UPDATE
  USING (author_id = auth.uid());

DROP POLICY IF EXISTS "Editors can update all posts" ON public.posts;
CREATE POLICY "Editors can update all posts"
  ON public.posts FOR UPDATE
  USING (public.user_has_role(ARRAY['admin', 'editor']));

DROP POLICY IF EXISTS "Authors can delete own drafts" ON public.posts;
CREATE POLICY "Authors can delete own drafts"
  ON public.posts FOR DELETE
  USING (author_id = auth.uid() AND status = 'draft');

DROP POLICY IF EXISTS "Admins can delete any post" ON public.posts;
CREATE POLICY "Admins can delete any post"
  ON public.posts FOR DELETE
  USING (public.get_user_role() = 'admin');

-- =====================================================
-- 5. STORAGE BUCKET FOR BLOG IMAGES
-- =====================================================

-- Create storage bucket (this may error if bucket exists, that's OK)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Authors can upload blog images" ON storage.objects;
CREATE POLICY "Authors can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' AND
    public.user_has_role(ARRAY['admin', 'editor', 'author'])
  );

DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
CREATE POLICY "Users can update own images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND owner = auth.uid());

DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    public.get_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND owner = auth.uid());

-- =====================================================
-- DONE! 
-- Next steps:
-- 1. Create a user in Authentication > Users
-- 2. Update their role to 'admin' in the profiles table
-- 3. Run the content migration: npm run migrate
-- =====================================================
