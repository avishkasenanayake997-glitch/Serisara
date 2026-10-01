import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// ============================================================
// Supabase Admin Client (Service Role — SERVER ONLY)
// ============================================================
// This client bypasses Row Level Security.
// NEVER expose the service-role key to the frontend.

export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ============================================================
// Supabase Client for User Context
// ============================================================
// Used when we want RLS to apply (pass user's JWT)

export function createSupabaseClientForUser(accessToken: string) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
