"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { updateSummary } from "@/app/actions/content";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Reveal } from "@/components/effects/Reveal";
import { Button } from "@/components/ui/Button";
import { FormError, TextAreaField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";

/** Hero summary paragraph, editable by the admin in edit mode. */
export function HeroSummary({ summary }: { summary: string }) {
  const { editMode } = useAdmin();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(summary);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const openEditor = () => {
    setDraft(summary);
    setError(null);
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setError(null);
      const res = await updateSummary(draft);
      if (res.ok) setOpen(false);
      else setError(res.error);
    });
  };

  return (
    <>
      <Reveal>
        <p className="mt-6 max-w-[65ch] whitespace-pre-line text-xl text-beige">{summary}</p>
      </Reveal>
      {editMode && (
        <div className="mt-3">
          <Button variant="ghost" size="sm" onClick={openEditor}>
            <Pencil aria-hidden="true" className="size-4" /> Edit summary
          </Button>
        </div>
      )}

      <Modal wide open={open} onClose={() => setOpen(false)} title="Edit summary">
        <form onSubmit={submit} className="grid gap-4">
          <TextAreaField
            label="Summary"
            hint="Shown under your name. Up to 2000 characters."
            rows={6}
            maxLength={2000}
            required
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <FormError message={error} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
