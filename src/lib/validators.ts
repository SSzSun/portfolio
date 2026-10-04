import { z } from "zod";

const httpUrl = z
  .string()
  .trim()
  .max(300)
  .regex(/^https?:\/\/\S+$/, "Must start with http:// or https://");

// Empty string from a form field means "no link".
const optionalUrl = z
  .union([httpUrl, z.literal("")])
  .nullable()
  .transform((v) => (v ? v : null));

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const techStack = z
  .array(z.string().trim().min(1).max(40))
  .max(20, "Up to 20 items");

export const idSchema = z.uuid();

export const metricSchema = z.object({
  label: z.string().trim().min(1, "Label required").max(60),
  value: z.string().trim().min(1, "Value required").max(20),
  trend: z.enum(["up", "down"]),
});

export const diagramNodeSchema = z.object({
  id: z.string().min(1).max(40),
  label: z.string().trim().min(1).max(40),
});

export const diagramEdgeSchema = z.object({
  from: z.string().min(1).max(40),
  to: z.string().min(1).max(40),
  label: z.string().trim().max(24).optional(),
});

export const diagramSchema = z
  .object({
    nodes: z.array(diagramNodeSchema).max(8, "Up to 8 nodes"),
    edges: z.array(diagramEdgeSchema).max(12, "Up to 12 connections"),
  })
  .refine(
    (d) => {
      const ids = new Set(d.nodes.map((n) => n.id));
      return d.edges.every((e) => ids.has(e.from) && ids.has(e.to));
    },
    { message: "Every connection must reference a known node" },
  );

export const experienceInputSchema = z
  .object({
    company: z.string().trim().min(1, "Company required").max(120),
    role: z.string().trim().min(1, "Role required").max(120),
    period_start: isoDate,
    period_end: isoDate.nullable(),
    description: z.string().trim().max(4000),
    tech_stack: techStack,
    is_visible: z.boolean(),
    sort_order: z.number().int().min(0).max(9999),
  })
  .refine((v) => v.period_end === null || v.period_end >= v.period_start, {
    message: "End date must be after start date",
    path: ["period_end"],
  });

export const projectInputSchema = z.object({
  title: z.string().trim().min(1, "Title required").max(160),
  summary: z.string().trim().max(2000),
  architecture: z.string().trim().max(4000),
  tech_stack: techStack,
  architecture_diagram: diagramSchema,
  metrics: z.array(metricSchema).max(6, "Up to 6 metrics"),
  github_url: optionalUrl,
  demo_url: optionalUrl,
  is_visible: z.boolean(),
  sort_order: z.number().int().min(0).max(9999),
});

export const emailSchema = z.email().max(254);

export const summarySchema = z.string().trim().min(1, "Summary required").max(2000);

export type Metric = z.infer<typeof metricSchema>;
export type Diagram = z.infer<typeof diagramSchema>;
export type DiagramNode = z.infer<typeof diagramNodeSchema>;
export type DiagramEdge = z.infer<typeof diagramEdgeSchema>;
export type ExperienceInput = z.infer<typeof experienceInputSchema>;
export type ProjectInput = z.input<typeof projectInputSchema>;

/** First human-readable message from a zod error. */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid input";
  const field = issue.path.join(".");
  return field ? `${field}: ${issue.message}` : issue.message;
}
