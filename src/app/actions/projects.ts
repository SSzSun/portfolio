"use server";

import { revalidatePath } from "next/cache";
import { createClient, getIsAdmin } from "@/lib/supabase/server";
import {
  firstIssue,
  idSchema,
  projectInputSchema,
  type ProjectInput,
} from "@/lib/validators";
import { fail, ok, type ActionResult } from "./result";

async function guard(): Promise<ActionResult | null> {
  return (await getIsAdmin()) ? null : fail("Not authorized");
}

export async function createProject(input: ProjectInput): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsed = projectInputSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(parsed.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}

export async function updateProject(
  id: string,
  input: ProjectInput,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsedId = idSchema.safeParse(id);
  const parsed = projectInputSchema.safeParse(input);
  if (!parsedId.success) return fail("Invalid id");
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("id", parsedId.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}

export async function setProjectVisible(
  id: string,
  visible: boolean,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return fail("Invalid id");

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ is_visible: visible })
    .eq("id", parsedId.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return fail("Invalid id");

  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", parsedId.data);
  if (error) return fail(error.message);
  revalidatePath("/");
  return ok;
}
