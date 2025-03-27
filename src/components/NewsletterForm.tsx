import React, { useState, useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { supabase, RATE_LIMIT_WINDOW, MAX_SUBMISSIONS_PER_WINDOW } from '../lib/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from "@supabase/supabase-js";
import { Loader2 } from 'lucide-react';

const emailSchema = z.string().email('Invalid email format');

interface SubmissionError {
  message: string;
  code: string;
}

export const NewsletterForm: React.FC = () => {
  const { t } = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubmissionError | null>(null);
  const [success, setSuccess] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate email format
      emailSchema.parse(email);

      // Verify reCAPTCHA
      // if (!executeRecaptcha) {
      //   throw new Error('reCAPTCHA not initialized');
      // }
      // const token = await executeRecaptcha('newsletter_signup');

      // if (!token) {
      //   throw new Error('Failed to verify reCAPTCHA');
      // }

      

const { data, error } = await supabase.functions.invoke('register-newsletter', {
  body: { 'email': email, 'recaptchaToken': 'test' },
  method: 'POST'
});

if (error instanceof FunctionsHttpError) {
  const errorMessage = await error.context.json()
  console.log('Function returned an error', errorMessage)
} else if (error instanceof FunctionsRelayError) {
  console.log('Relay error:', error.message)
} else if (error instanceof FunctionsFetchError) {
  console.log('Fetch error:', error.message)
}

      setSuccess(true);
      setEmail('');
      setGdprConsent(false);

    } catch (err) {
      console.error('Submission error:', err);
      setError({
        message: err.message || 'An unexpected error occurred',
        code: err.code || 'UNKNOWN_ERROR'
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, executeRecaptcha, gdprConsent]);

  if (success) {
    return (
      <div className="text-2xl text-purple-600 font-bold animate-bounce-gentle">
        {t('form.success')}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('form.emailPlaceholder')}
          className={`
            w-full px-6 py-4 rounded-full bg-white text-gray-800 text-lg
            border-2 transition-all duration-200
            ${error ? 'border-red-400 shake' : 'border-purple-200'}
            focus:border-purple-400 focus:outline-none
            hover:scale-105
          `}
          disabled={isLoading}
          required
        />
        {error && (
          <p className="absolute -bottom-6 left-4 text-red-500 text-sm">
            {error.message}
          </p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-1 w-5 h-5 accent-purple-500"
          id="gdprConsent"
          required
          disabled={isLoading}
        />
        <label htmlFor="gdprConsent" className="text-lg text-gray-700">
          {t('form.consent')}
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !gdprConsent}
        className={`
          w-full bg-gradient-to-r from-purple-500 to-pink-500
          text-white text-xl font-bold py-4 px-8 rounded-full
          transform transition-all duration-300
          ${isLoading ? 'opacity-80' : 'hover:scale-105 hover:shadow-lg'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Processing...
          </span>
        ) : (
          t('form.submit')
        )}
      </button>
    </form>
  );
};