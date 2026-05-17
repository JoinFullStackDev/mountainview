-- =====================================================
-- Form Submissions Table
-- Stores contact, transfer, and medical kit form submissions
-- =====================================================

CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'transfer', 'medical-kit')),
  data JSONB NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  turnstile_verified BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying by form type and date
CREATE INDEX idx_form_submissions_type ON public.form_submissions(form_type);
CREATE INDEX idx_form_submissions_submitted_at ON public.form_submissions(submitted_at DESC);

-- =====================================================
-- Row Level Security
-- Only admins can view submissions (no public insert via RLS - use service role)
-- =====================================================

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Admins can view all submissions
CREATE POLICY "Admins can view submissions"
  ON public.form_submissions FOR SELECT
  USING (public.get_user_role() = 'admin');

-- No INSERT policy - insertions are done via service role key server-side
-- This prevents direct public submissions via Supabase client

-- Admins can delete submissions
CREATE POLICY "Admins can delete submissions"
  ON public.form_submissions FOR DELETE
  USING (public.get_user_role() = 'admin');
