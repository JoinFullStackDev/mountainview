-- Create posts table
CREATE TABLE public.posts (
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
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for performance
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_status_published ON public.posts(status, published_at DESC);
CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_posts_category ON public.posts(category);

-- RLS Policies for posts

-- Anyone can read published posts (public blog)
CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

-- Authors can read their own posts (any status)
CREATE POLICY "Authors can read own posts"
  ON public.posts FOR SELECT
  USING (author_id = auth.uid());

-- Editors and admins can read all posts
CREATE POLICY "Editors can read all posts"
  ON public.posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Authors, editors, admins can create posts
CREATE POLICY "Authors can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor', 'author')
    )
  );

-- Authors can update their own posts
CREATE POLICY "Authors can update own posts"
  ON public.posts FOR UPDATE
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Editors and admins can update any post
CREATE POLICY "Editors can update all posts"
  ON public.posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Authors can delete their own draft posts
CREATE POLICY "Authors can delete own drafts"
  ON public.posts FOR DELETE
  USING (
    author_id = auth.uid() AND status = 'draft'
  );

-- Admins can delete any post
CREATE POLICY "Admins can delete any post"
  ON public.posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
