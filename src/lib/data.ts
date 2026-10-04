import "server-only";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import type { ExperienceRow, ProjectRow } from "@/types/database";
import {
  diagramSchema,
  metricSchema,
  type Diagram,
  type Metric,
} from "@/lib/validators";

export type Experience = ExperienceRow;

export type Project = Omit<ProjectRow, "metrics" | "architecture_diagram"> & {
  metrics: Metric[];
  architecture_diagram: Diagram;
};

const EMPTY_DIAGRAM: Diagram = { nodes: [], edges: [] };

/** jsonb columns arrive as Json; narrow them, dropping malformed entries. */
function toProject(row: ProjectRow): Project {
  const metrics = Array.isArray(row.metrics)
    ? row.metrics.flatMap((m) => {
        const parsed = metricSchema.safeParse(m);
        return parsed.success ? [parsed.data] : [];
      })
    : [];
  const diagram = diagramSchema.safeParse(row.architecture_diagram);
  return {
    ...row,
    metrics,
    architecture_diagram: diagram.success ? diagram.data : EMPTY_DIAGRAM,
  };
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("period_start", { ascending: false });
  if (error) {
    console.error("getExperiences", error.message);
    return [];
  }
  return data;
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getProjects", error.message);
    return [];
  }
  return data.map(toProject);
}

/** Hero summary from site_content; falls back to the copy in site.ts. */
export async function getSummary(): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "summary")
    .maybeSingle();
  if (error) console.error("getSummary", error.message);
  return data?.value || site.summary;
}

export async function getVisitCount(): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_stats")
    .select("value")
    .eq("key", "total_visits")
    .maybeSingle();
  if (error || !data) return 0;
  return data.value;
}
