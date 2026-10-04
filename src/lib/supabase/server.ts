import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { SUPABASE_KEY, SUPABASE_URL } from "./env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component: cookies are read-only there.
          // The middleware refreshes the session instead.
        }
      },
    },
  });
}

/** True when the current request carries a session for an allowlisted admin. */
export async function getIsAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data) return false;
  const email = data.claims.email;
  if (typeof email !== "string") return false;
  // UI gate only. RLS (private.is_admin) is the real guard on every write.
  return email.toLowerCase() === ADMIN_EMAIL;
}

export const ADMIN_EMAIL = "jaruphat.kp@gmail.com";
