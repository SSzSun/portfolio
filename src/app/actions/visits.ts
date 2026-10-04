"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getVisitCount } from "@/lib/data";

const SEEN_COOKIE = "pf_seen";

/**
 * Counts one visit per browser session. Repeat calls in the same session
 * return the current total without incrementing.
 */
export async function registerVisit(): Promise<number> {
  const store = await cookies();
  if (store.has(SEEN_COOKIE)) return getVisitCount();

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("increment_visit");
  if (error) return getVisitCount();

  // Session cookie (no maxAge): cleared when the browser closes.
  store.set(SEEN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return data;
}
