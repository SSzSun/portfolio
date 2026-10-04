export type ActionResult = { ok: true } | { ok: false; error: string };

export const ok: ActionResult = { ok: true };

export function fail(error: string): ActionResult {
  return { ok: false, error };
}
