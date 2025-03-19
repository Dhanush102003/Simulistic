/*
  # Update Applications Table Policies

  1. Security Changes
    - Remove the general SELECT policy
    - Add policy to only allow admin users to view applications
    - Keep the insert policy for public submissions

  Note: Admin users are those with email ending in @simulistic.com
*/

-- Drop existing select policy
DROP POLICY IF EXISTS "Only authenticated users can read applications" ON applications;

-- Create new admin-only select policy
CREATE POLICY "Only admin users can read applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' LIKE '%@simulistic.com');