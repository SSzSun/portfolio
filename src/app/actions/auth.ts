"use server";

import { revalidatePath } from "next/cache";
import { ADMIN_EMAIL, createClient } from "@/lib/supabase/server";
import { emailSchema } from "@/lib/validators";
import { fail, ok, type ActionResult } from "./result";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function requestMagicLink(email: string): Promise<ActionResult> {
  const parsed = emailSchema.safeParse(email.trim().toLowerCase());
  if (!parsed.success) return fail("Enter a valid email");

  // Same response for any address so the admin email cannot be probed.
  if (parsed.data !== ADMIN_EMAIL) return ok;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback`,
      shouldCreateUser: true,
    },
  });
  if (error) return fail(error.message);
  return ok;
}

export async function signOut(): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}
