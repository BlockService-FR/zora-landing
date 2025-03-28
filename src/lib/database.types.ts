export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          created_at: string | null
          verified: boolean | null
          verification_token: string | null
          last_submission_time: string | null
          submission_count: number | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string | null
          verified?: boolean | null
          verification_token?: string | null
          last_submission_time?: string | null
          submission_count?: number | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string | null
          verified?: boolean | null
          verification_token?: string | null
          last_submission_time?: string | null
          submission_count?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Shortcuts for common table types
export type NewsletterSubscription = Tables<'newsletter_subscriptions'>