-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories

-- Anyone can read categories (public)
CREATE POLICY "Public can read categories"
  ON public.categories FOR SELECT
  USING (true);

-- Editors and admins can create categories
CREATE POLICY "Editors can create categories"
  ON public.categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Editors and admins can update categories
CREATE POLICY "Editors can update categories"
  ON public.categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Only admins can delete categories
CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Seed initial categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Health Tips', 'health-tips', 'General health and wellness tips for everyday life'),
  ('Pharmacy Services', 'pharmacy-services', 'Information about our pharmacy services and offerings'),
  ('Immunizations', 'immunizations', 'Vaccine information and immunization services');
