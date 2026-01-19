-- =====================================================
-- FIX: RLS Infinite Recursion on profiles table
-- Run this in Supabase SQL Editor to fix the existing policies
-- =====================================================

-- Create helper functions that bypass RLS (SECURITY DEFINER)
-- This prevents infinite recursion when checking roles in policies

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.user_has_role(required_roles TEXT[])
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = ANY(required_roles)
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- Fix PROFILES table policies
-- =====================================================

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.get_user_role() = 'admin');

-- =====================================================
-- Fix CATEGORIES table policies
-- =====================================================

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

-- =====================================================
-- Fix POSTS table policies
-- =====================================================

DROP POLICY IF EXISTS "Editors can read all posts" ON public.posts;
CREATE POLICY "Editors can read all posts"
  ON public.posts FOR SELECT
  USING (public.user_has_role(ARRAY['admin', 'editor']));

DROP POLICY IF EXISTS "Authors can create posts" ON public.posts;
CREATE POLICY "Authors can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (public.user_has_role(ARRAY['admin', 'editor', 'author']));

DROP POLICY IF EXISTS "Editors can update all posts" ON public.posts;
CREATE POLICY "Editors can update all posts"
  ON public.posts FOR UPDATE
  USING (public.user_has_role(ARRAY['admin', 'editor']));

DROP POLICY IF EXISTS "Admins can delete any post" ON public.posts;
CREATE POLICY "Admins can delete any post"
  ON public.posts FOR DELETE
  USING (public.get_user_role() = 'admin');

-- =====================================================
-- Fix STORAGE policies
-- =====================================================

DROP POLICY IF EXISTS "Authors can upload blog images" ON storage.objects;
CREATE POLICY "Authors can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' AND
    public.user_has_role(ARRAY['admin', 'editor', 'author'])
  );

DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    public.get_user_role() = 'admin'
  );

-- =====================================================
-- DONE! The RLS infinite recursion should now be fixed.
-- =====================================================
