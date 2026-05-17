-- Migration: Add 'medical-kit' to form_type CHECK constraint
-- This alters the existing form_submissions table to allow the new form type

-- Drop the existing constraint
ALTER TABLE form_submissions 
DROP CONSTRAINT IF EXISTS form_submissions_form_type_check;

-- Add the updated constraint with 'medical-kit' included
ALTER TABLE form_submissions 
ADD CONSTRAINT form_submissions_form_type_check 
CHECK (form_type IN ('contact', 'transfer', 'medical-kit'));
