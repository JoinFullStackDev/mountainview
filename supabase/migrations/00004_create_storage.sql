-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Storage Policies for blog-images bucket

-- Anyone can view images (public bucket)
CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Authors, editors, admins can upload images
CREATE POLICY "Authors can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor', 'author')
    )
  );

-- Authors can update their own uploaded images
CREATE POLICY "Users can update own images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images' AND
    owner = auth.uid()
  );

-- Admins can delete any image
CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can delete their own images
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    owner = auth.uid()
  );
