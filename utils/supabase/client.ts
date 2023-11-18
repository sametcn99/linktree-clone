import { createBrowserClient } from "@supabase/ssr";

// Function to create a Supabase client for browser-side usage
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase project URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Supabase anonymous key
  );
