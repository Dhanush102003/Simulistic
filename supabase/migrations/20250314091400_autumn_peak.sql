/*
  # Create storage bucket for resumes

  1. Storage
    - Create a public bucket named 'resumes' for storing application documents
    - Enable RLS policies for secure access
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Enable RLS
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'resumes');

-- Allow authenticated users to read resumes
CREATE POLICY "Authenticated users can read resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');