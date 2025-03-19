/*
  # Create applications table and storage

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `role` (text)
      - `name` (text)
      - `gender` (text)
      - `employment_type` (text)
      - `source` (text)
      - `resume_path` (text)
      - `application_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Storage
    - Create bucket for storing resumes
*/

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  name text NOT NULL,
  gender text NOT NULL,
  employment_type text NOT NULL,
  source text NOT NULL,
  resume_path text NOT NULL,
  application_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting applications
CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reading applications for authenticated users only
CREATE POLICY "Only authenticated users can read applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);