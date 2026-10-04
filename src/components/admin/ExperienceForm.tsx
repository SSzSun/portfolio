"use client";

import { useState, useTransition } from "react";
import { createExperience, updateExperience } from "@/app/actions/experiences";
import { Button } from "@/components/ui/Button";
import { FormError, splitList, TextAreaField, TextField } from "@/components/ui/Field";
import type { Experience } from "@/lib/data";

type Props = {
  initial: Experience | null;
  onDone: () => void;
};

export function ExperienceForm({ initial, onDone }: Props) {
  const [company, setCompany] = useState(initial?.company ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [start, setStart] = useState(initial?.period_start ?? "");
  const [end, setEnd] = useState(initial?.period_end ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tech, setTech] = useState(initial?.tech_stack.join(", ") ?? "");
  const [order, setOrder] = useState(String(initial?.sort_order ?? 0));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      company,
      role,
      period_start: start,
      period_end: end || null,
      description,
      tech_stack: splitList(tech),
      is_visible: initial?.is_visible ?? true,
      sort_order: Number.parseInt(order, 10) || 0,
    };
    startTransition(async () => {
      setError(null);
      const res = initial
        ? await updateExperience(initial.id, input)
        : await createExperience(input);
      if (res.ok) onDone();
      else setError(res.error);
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <TextField label="Company" required value={company} onChange={(e) => setCompany(e.target.value)} />
      <TextField label="Role" required value={role} onChange={(e) => setRole(e.target.value)} />
      <TextField label="Start" type="date" required value={start} onChange={(e) => setStart(e.target.value)} />
      <TextField
        label="End"
        type="date"
        hint="Leave empty for present"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <TextAreaField
        label="Description"
        className="sm:col-span-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Tech stack"
        hint="Comma separated"
        className="sm:col-span-2"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />
      <TextField
        label="Sort order"
        type="number"
        min={0}
        hint="Lower shows first"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />
      <div className="flex flex-col justify-end gap-2 sm:col-span-2">
        <FormError message={error} />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onDone}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
