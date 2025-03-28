import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const requestSchema = z.object({
  email: z.string().email(),
  recaptchaToken: z.string(),
});

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const { email, recaptchaToken } = requestSchema.parse(body);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check rate limiting
    const { data: existingSubscriptions } = await supabaseClient
      .from('newsletter_subscriptions')
      .select('last_submission_time, submission_count')
      .eq('email', email)
      .single();

    if (existingSubscriptions) {
      const lastSubmissionTime = new Date(existingSubscriptions.last_submission_time);
      const now = new Date();
      const timeDiff = (now.getTime() - lastSubmissionTime.getTime()) / 1000;

      if (timeDiff < RATE_LIMIT_WINDOW && existingSubscriptions.submission_count >= MAX_SUBMISSIONS_PER_WINDOW) {
        return new Response(
          JSON.stringify({ 
            error: 'Too many attempts. Please try again later.' 
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Skip reCAPTCHA verification in development
    if (Deno.env.get('ENVIRONMENT') !== 'development') {
      // Verify reCAPTCHA
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: Deno.env.get('RECAPTCHA_SECRET_KEY') ?? '',
          response: recaptchaToken,
        }),
      });

      const recaptchaResult = await recaptchaResponse.json();
      console.log('reCAPTCHA verification result:', recaptchaResult);
      
      if (!recaptchaResult.success) {
        return new Response(
          JSON.stringify({ error: 'Invalid reCAPTCHA verification' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Insert or update subscription
    const { error: upsertError } = await supabaseClient
      .from('newsletter_subscriptions')
      .upsert({
        email,
        last_submission_time: new Date().toISOString(),
        submission_count: existingSubscriptions 
          ? existingSubscriptions.submission_count + 1 
          : 1
      });

    if (upsertError) {
      console.error('Database error:', upsertError);
      throw upsertError;
    }

    return new Response(
      JSON.stringify({ message: 'Successfully subscribed to newsletter!' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});