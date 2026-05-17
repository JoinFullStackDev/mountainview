-- =====================================================
-- Media Library Table
-- Tracks all uploaded media files with metadata
-- =====================================================

CREATE TABLE public.media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  folder TEXT DEFAULT 'general',
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_media_folder ON public.media(folder);
CREATE INDEX idx_media_uploaded_by ON public.media(uploaded_by);
CREATE INDEX idx_media_created_at ON public.media(created_at DESC);

-- =====================================================
-- Row Level Security
-- Uses existing helper functions to avoid recursion
-- =====================================================

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- All authenticated users can view media
CREATE POLICY "Authenticated users can view media"
  ON public.media FOR SELECT
  TO authenticated
  USING (true);

-- Authors, editors, admins can upload media
CREATE POLICY "Authors can upload media"
  ON public.media FOR INSERT
  TO authenticated
  WITH CHECK (
    public.user_has_role(ARRAY['admin', 'editor', 'author'])
  );

-- Users can update their own media (for alt_text, etc.)
CREATE POLICY "Users can update own media"
  ON public.media FOR UPDATE
  TO authenticated
  USING (uploaded_by = auth.uid())
  WITH CHECK (uploaded_by = auth.uid());

-- Users can delete their own media, admins can delete any
CREATE POLICY "Users can delete own media or admin can delete any"
  ON public.media FOR DELETE
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    public.get_user_role() = 'admin'
  );
