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


import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200 });
  }

  const { email, recaptchaToken } = await req.json();

  // Validate reCAPTCHA
  const recaptchaSecret = Deno.env.get('RECAPTCHA_SECRET_KEY');
  const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: recaptchaSecret!,
      response: recaptchaToken,
    }),
  });
  
  const recaptchaResult = await recaptchaResponse.json();
  if (!recaptchaResult.success) {
    return new Response(JSON.stringify({ error: 'Invalid reCAPTCHA' }), { status: 400 });
  }

  // Create Supabase client with service role
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // Use service role key
  );

  // Insert email into newsletter_subscriptions table
  const { data, error } = await supabaseClient
    .from('newsletter_subscriptions')
    .insert([{ email }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), { status: 200 });
});