import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null | undefined;

function supabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
}

function supabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function getSupabase(): SupabaseClient | null {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return null;

  if (typeof window === "undefined") {
    return createClient(url, key);
  }

  if (browserClient === undefined) {
    browserClient = createClient(url, key);
  }
  return browserClient;
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl() && supabaseKey());
}
