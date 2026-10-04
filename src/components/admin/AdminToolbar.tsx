"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { ActionResult } from "@/app/actions/result";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

type Props = {
  label: string;
  visible: boolean;
  onEdit: () => void;
  onToggle: (next: boolean) => Promise<ActionResult>;
  onDelete: () => Promise<ActionResult>;
};

/** Per-item customizer controls: visibility switch, edit, delete with confirm. */
export function AdminToolbar({ label, visible, onEdit, onToggle, onDelete }: Props) {
  const [optimistic, setOptimistic] = useState(visible);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<ActionResult>, rollback?: () => void) =>
    startTransition(async () => {
      setError(null);
      const res = await fn();
      if (!res.ok) {
        rollback?.();
        setError(res.error);
      }
    });

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-amber/40 pt-3">
      <Switch
        label={`Show ${label}`}
        checked={optimistic}
        disabled={pending}
        onChange={(next) => {
          setOptimistic(next);
          run(() => onToggle(next), () => setOptimistic(!next));
        }}
      />
      <Button variant="ghost" size="sm" onClick={onEdit} disabled={pending}>
        <Pencil aria-hidden="true" className="size-4" /> Edit
      </Button>
      {confirming ? (
        <span className="inline-flex items-center gap-2">
          <span className="font-mono text-xs text-tape">Delete?</span>
          <Button
            variant="danger"
            size="sm"
            disabled={pending}
            onClick={() => run(onDelete, () => setConfirming(false))}
          >
            Yes
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
            No
          </Button>
        </span>
      ) : (
        <Button variant="danger" size="sm" onClick={() => setConfirming(true)} disabled={pending}>
          <Trash2 aria-hidden="true" className="size-4" /> Delete
        </Button>
      )}
      {error && (
        <p role="alert" className="w-full font-mono text-xs text-tape">
          {error}
        </p>
      )}
    </div>
  );
}
