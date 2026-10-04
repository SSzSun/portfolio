"use client";

import { useState, useTransition } from "react";
import { createProject, updateProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { FormError, splitList, TextAreaField, TextField } from "@/components/ui/Field";
import type { Project } from "@/lib/data";
import type { Diagram, Metric } from "@/lib/validators";

type Props = {
  initial: Project | null;
  onDone: () => void;
};

/** Metrics as lines: "Label | Value | up|down" */
function metricsToText(m: Metric[]): string {
  return m.map((x) => `${x.label} | ${x.value} | ${x.trend}`).join("\n");
}
function textToMetrics(text: string): Metric[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label = "", value = "", trend = "up"] = l.split("|").map((s) => s.trim());
      return { label, value, trend: trend === "down" ? "down" : "up" };
    });
}

/** Diagram as lines: "Client -> API : REST" */
function diagramToText(d: Diagram): string {
  const label = (id: string) => d.nodes.find((n) => n.id === id)?.label ?? id;
  return d.edges
    .map((e) => `${label(e.from)} -> ${label(e.to)}${e.label ? ` : ${e.label}` : ""}`)
    .join("\n");
}
function textToDiagram(text: string): Diagram {
  const nodes: Diagram["nodes"] = [];
  const idFor = (label: string) => {
    const existing = nodes.find((n) => n.label === label);
    if (existing) return existing.id;
    const id = `n${nodes.length + 1}`;
    nodes.push({ id, label });
    return id;
  };
  const edges: Diagram["edges"] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const [flow = "", edgeLabel] = line.split(":").map((s) => s.trim());
    const parts = flow.split("->").map((s) => s.trim()).filter(Boolean);
    if (parts.length === 1) idFor(parts[0]);
    for (let i = 0; i < parts.length - 1; i++) {
      edges.push({
        from: idFor(parts[i]),
        to: idFor(parts[i + 1]),
        ...(edgeLabel ? { label: edgeLabel } : {}),
      });
    }
  }
  return { nodes, edges };
}

export function ProjectForm({ initial, onDone }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [architecture, setArchitecture] = useState(initial?.architecture ?? "");
  const [tech, setTech] = useState(initial?.tech_stack.join(", ") ?? "");
  const [diagram, setDiagram] = useState(
    initial ? diagramToText(initial.architecture_diagram) : "",
  );
  const [metrics, setMetrics] = useState(initial ? metricsToText(initial.metrics) : "");
  const [github, setGithub] = useState(initial?.github_url ?? "");
  const [demo, setDemo] = useState(initial?.demo_url ?? "");
  const [order, setOrder] = useState(String(initial?.sort_order ?? 0));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      title,
      summary,
      architecture,
      tech_stack: splitList(tech),
      architecture_diagram: textToDiagram(diagram),
      metrics: textToMetrics(metrics),
      github_url: github,
      demo_url: demo,
      is_visible: initial?.is_visible ?? true,
      sort_order: Number.parseInt(order, 10) || 0,
    };
    startTransition(async () => {
      setError(null);
      const res = initial ? await updateProject(initial.id, input) : await createProject(input);
      if (res.ok) onDone();
      else setError(res.error);
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <TextField
        label="Title"
        required
        className="sm:col-span-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextAreaField
        label="Summary"
        className="sm:col-span-2"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <TextAreaField
        label="Architecture notes"
        className="sm:col-span-2"
        value={architecture}
        onChange={(e) => setArchitecture(e.target.value)}
      />
      <TextField
        label="Tech stack"
        hint="Comma separated"
        className="sm:col-span-2"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />
      <TextAreaField
        label="Diagram"
        hint="One flow per line: Client -> API -> DB : SQL"
        className="sm:col-span-2"
        value={diagram}
        onChange={(e) => setDiagram(e.target.value)}
      />
      <TextAreaField
        label="Metrics"
        hint="One per line: Latency | -40% | down"
        className="sm:col-span-2"
        rows={3}
        value={metrics}
        onChange={(e) => setMetrics(e.target.value)}
      />
      <TextField
        label="GitHub URL"
        type="url"
        placeholder="https://"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <TextField
        label="Demo URL"
        type="url"
        placeholder="https://"
        value={demo}
        onChange={(e) => setDemo(e.target.value)}
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
