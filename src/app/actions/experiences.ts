"use server";

import { revalidatePath } from "next/cache";
import { createClient, getIsAdmin } from "@/lib/supabase/server";
import {
  experienceInputSchema,
  firstIssue,
  idSchema,
  type ExperienceInput,
} from "@/lib/validators";
import { fail, ok, type ActionResult } from "./result";

async function guard(): Promise<ActionResult | null> {
  return (await getIsAdmin()) ? null : fail("Not authorized");
}

export async function createExperience(input: ExperienceInput): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsed = experienceInputSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const supabase = await createClient();
  const { error } = await supabase.from("experiences").insert(parsed.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}

export async function updateExperience(
  id: string,
  input: ExperienceInput,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsedId = idSchema.safeParse(id);
  const parsed = experienceInputSchema.safeParse(input);
  if (!parsedId.success) return fail("Invalid id");
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const supabase = await createClient();
  const { error } = await supabase
    .from("experiences")
    .update(parsed.data)
    .eq("id", parsedId.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}

export async function setExperienceVisible(
  id: string,
  visible: boolean,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return fail("Invalid id");

  const supabase = await createClient();
  const { error } = await supabase
    .from("experiences")
    .update({ is_visible: visible })
    .eq("id", parsedId.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return fail("Invalid id");

  const supabase = await createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", parsedId.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}
