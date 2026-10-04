"use server";

import { revalidatePath } from "next/cache";
import { createClient, getIsAdmin } from "@/lib/supabase/server";
import { firstIssue, summarySchema } from "@/lib/validators";
import { fail, ok, type ActionResult } from "./result";

export async function updateSummary(value: string): Promise<ActionResult> {
  if (!(await getIsAdmin())) return fail("Not authorized");
  const parsed = summarySchema.safeParse(value);
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key: "summary", value: parsed.data });
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}
