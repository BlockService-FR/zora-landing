/*
  # Create Newsletter Subscriptions Table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `verified` (boolean)
      - `verification_token` (text)
      - `last_submission_time` (timestamp)
      - `submission_count` (integer)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for authenticated users to read their own data
    - Add policy for service role to create new subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  verified boolean DEFAULT false,
  verification_token text,
  last_submission_time timestamptz DEFAULT now(),
  submission_count integer DEFAULT 1,
  CHECK (submission_count >= 0)
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for reading own subscription
CREATE POLICY "Users can read own subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (email = current_user);

-- Create policy for inserting new subscriptions (service role only)
CREATE POLICY "Service role can create subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email 
  ON newsletter_subscriptions(email);

-- Create index for verification token lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_verification_token 
  ON newsletter_subscriptions(verification_token);