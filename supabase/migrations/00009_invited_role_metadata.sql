-- =====================================================
-- Migration 00009: Honor invited_role metadata in handle_new_user
-- =====================================================
-- This migration updates the public.handle_new_user() trigger
-- function so it reads `invited_role` from auth.users.raw_user_meta_data
-- when present. Supabase Auth's `inviteUserByEmail` lets us attach
-- arbitrary `data` to a new auth user, so this lets an admin invite
-- another admin (or staff) by passing { invited_role: 'admin' | 'staff' }
-- on the invite call.
--
-- Behavior:
--   * raw_user_meta_data.invited_role IN ('admin', 'staff')
--       -> profile created with that role
--   * anything else / missing
--       -> defaults to 'staff' (same as migration 00008)
--
-- The function remains SECURITY DEFINER so it can write to
-- public.profiles regardless of the inserting role.
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT;
BEGIN
  v_role := NEW.raw_user_meta_data->>'invited_role';
  IF v_role IS NULL OR v_role NOT IN ('admin', 'staff') THEN
    v_role := 'staff';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    v_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- DONE
-- =====================================================
