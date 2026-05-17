-- =====================================================
-- Migration 00008: Simplify roles to admin/staff and drop form_submissions
-- =====================================================
-- This migration:
--   1. Drops the form_submissions table (replaced by Resend email).
--   2. Collapses the role enum from 4 roles (admin/editor/author/viewer)
--      down to 2 roles (admin/staff).
--   3. Updates handle_new_user() to default new profiles to 'staff'.
--   4. Rewrites every RLS policy that referenced the old role names so
--      only 'admin' and 'staff' have write access to posts, categories,
--      media, and the blog-images storage bucket.
--
-- It is safe to run on databases that have already had migrations
-- 00001-00007 applied. All DROPs are guarded with IF EXISTS.
-- =====================================================

-- ---------------------------------------------------------------
-- 1. Drop form_submissions
-- ---------------------------------------------------------------

DROP TABLE IF EXISTS public.form_submissions CASCADE;

-- ---------------------------------------------------------------
-- 2. Collapse roles to admin/staff
-- ---------------------------------------------------------------

-- Drop the existing CHECK constraint (Postgres autogenerates the name).
DO $$
DECLARE
  v_constraint_name TEXT;
BEGIN
  SELECT conname
  INTO v_constraint_name
  FROM pg_constraint
  WHERE conrelid = 'public.profiles'::regclass
    AND contype = 'c'
    AND pg_get_constraintdef(oid) ILIKE '%role%IN%';

  IF v_constraint_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.profiles DROP CONSTRAINT %I', v_constraint_name);
  END IF;
END $$;

-- Migrate existing rows. Preserve admins; collapse everything else to staff.
UPDATE public.profiles
SET role = 'staff'
WHERE role NOT IN ('admin', 'staff');

-- Re-apply the constraint with only the two valid roles.
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'staff'));

-- Update the default for new rows (defense in depth; trigger also enforces this).
ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'staff';

-- ---------------------------------------------------------------
-- 3. Update handle_new_user trigger to default to 'staff'
-- ---------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'staff'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ---------------------------------------------------------------
-- 4. Rewrite RLS policies to use only admin/staff
-- ---------------------------------------------------------------

-- ---- profiles ----
-- Keep the helper functions (get_user_role, user_has_role) introduced in
-- fix_rls_recursion.sql — they continue to work because they read whatever
-- role is in the profiles table.

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
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.get_user_role() = 'admin');

-- ---- categories ----

DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
CREATE POLICY "Public can read categories"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Editors can create categories" ON public.categories;
DROP POLICY IF EXISTS "Staff can create categories" ON public.categories;
CREATE POLICY "Staff can create categories"
  ON public.categories FOR INSERT
  WITH CHECK (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Editors can update categories" ON public.categories;
DROP POLICY IF EXISTS "Staff can update categories" ON public.categories;
CREATE POLICY "Staff can update categories"
  ON public.categories FOR UPDATE
  USING (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;
DROP POLICY IF EXISTS "Staff can delete categories" ON public.categories;
CREATE POLICY "Staff can delete categories"
  ON public.categories FOR DELETE
  USING (public.user_has_role(ARRAY['admin', 'staff']));

-- ---- posts ----

DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

DROP POLICY IF EXISTS "Authors can read own posts" ON public.posts;
DROP POLICY IF EXISTS "Editors can read all posts" ON public.posts;
DROP POLICY IF EXISTS "Staff can read all posts" ON public.posts;
CREATE POLICY "Staff can read all posts"
  ON public.posts FOR SELECT
  USING (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Authors can create posts" ON public.posts;
DROP POLICY IF EXISTS "Staff can create posts" ON public.posts;
CREATE POLICY "Staff can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Authors can update own posts" ON public.posts;
DROP POLICY IF EXISTS "Editors can update all posts" ON public.posts;
DROP POLICY IF EXISTS "Staff can update all posts" ON public.posts;
CREATE POLICY "Staff can update all posts"
  ON public.posts FOR UPDATE
  USING (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Authors can delete own drafts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete any post" ON public.posts;
DROP POLICY IF EXISTS "Staff can delete posts" ON public.posts;
CREATE POLICY "Staff can delete posts"
  ON public.posts FOR DELETE
  USING (public.user_has_role(ARRAY['admin', 'staff']));

-- ---- media ----

DROP POLICY IF EXISTS "Authenticated users can view media" ON public.media;
CREATE POLICY "Authenticated users can view media"
  ON public.media FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authors can upload media" ON public.media;
DROP POLICY IF EXISTS "Staff can upload media" ON public.media;
CREATE POLICY "Staff can upload media"
  ON public.media FOR INSERT
  TO authenticated
  WITH CHECK (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Users can update own media" ON public.media;
DROP POLICY IF EXISTS "Staff can update media" ON public.media;
CREATE POLICY "Staff can update media"
  ON public.media FOR UPDATE
  TO authenticated
  USING (public.user_has_role(ARRAY['admin', 'staff']));

DROP POLICY IF EXISTS "Users can delete own media or admin can delete any" ON public.media;
DROP POLICY IF EXISTS "Staff can delete media" ON public.media;
CREATE POLICY "Staff can delete media"
  ON public.media FOR DELETE
  TO authenticated
  USING (public.user_has_role(ARRAY['admin', 'staff']));

-- ---- storage.objects (blog-images bucket) ----

DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Authors can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Staff can upload blog images" ON storage.objects;
CREATE POLICY "Staff can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' AND
    public.user_has_role(ARRAY['admin', 'staff'])
  );

DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
DROP POLICY IF EXISTS "Staff can update blog images" ON storage.objects;
CREATE POLICY "Staff can update blog images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images' AND
    public.user_has_role(ARRAY['admin', 'staff'])
  );

DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Staff can delete blog images" ON storage.objects;
CREATE POLICY "Staff can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    public.user_has_role(ARRAY['admin', 'staff'])
  );

-- =====================================================
-- DONE
-- =====================================================
