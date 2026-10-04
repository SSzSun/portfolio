"use client";

import { useState } from "react";
import { ExternalLink, FolderOpen, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { deleteProject, setProjectVisible } from "@/app/actions/projects";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminToolbar } from "@/components/admin/AdminToolbar";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Reveal } from "@/components/effects/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonClass } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GithubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/lib/data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { SectionHeading } from "./SectionHeading";

type Editing = { item: Project | null } | null;

export function Projects({ items }: { items: Project[] }) {
  const { editMode } = useAdmin();
  const [editing, setEditing] = useState<Editing>(null);
  const shown = editMode ? items : items.filter((i) => i.is_visible);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section bg-panel/40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="projects-title" index="03" title="Projects" />
          {editMode && (
            <Button size="sm" onClick={() => setEditing({ item: null })}>
              <Plus aria-hidden="true" className="size-4" /> Add project
            </Button>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 border-2 border-dashed border-charcoal p-10 text-center">
            <FolderOpen aria-hidden="true" className="size-8 text-static" />
            <p className="text-lg text-static">No projects recorded on this tape yet.</p>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {shown.map((p, i) => (
              <li key={p.id}>
                <Reveal index={i % 2} className="h-full">
                  <article
                    className={`pixel-border flex h-full flex-col rounded-[0.5rem] bg-panel p-5 transition-transform duration-200 hover:-translate-y-0.5 ${
                      p.is_visible ? "" : "opacity-50"
                    }`}
                  >
                    <h3 className="text-3xl text-offwhite">{p.title}</h3>
                    {p.summary && (
                      <p className="mt-2 whitespace-pre-line text-beige">{p.summary}</p>
                    )}

                    {p.tech_stack.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                        {p.tech_stack.map((t) => (
                          <li key={t}>
                            <Badge>{t}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}

                    <ArchitectureDiagram diagram={p.architecture_diagram} title={p.title} />
                    {p.architecture && (
                      <p className="mt-3 whitespace-pre-line font-mono text-sm text-static">
                        {p.architecture}
                      </p>
                    )}

                    {p.metrics.length > 0 && (
                      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="border border-charcoal bg-ink p-3">
                            <dt className="font-mono text-xs uppercase text-static">{m.label}</dt>
                            <dd className="glow-amber mt-1 flex items-center gap-1 text-2xl text-amber">
                              {m.trend === "up" ? (
                                <TrendingUp aria-label="up" className="size-4" />
                              ) : (
                                <TrendingDown aria-label="down" className="size-4" />
                              )}
                              {m.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {(p.github_url || p.demo_url) && (
                      <div className="mt-auto flex flex-wrap gap-3 pt-5">
                        {p.github_url && (
                          <a
                            href={p.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonClass("ghost", "sm")}
                          >
                            <GithubIcon className="size-4" /> Source
                          </a>
                        )}
                        {p.demo_url && (
                          <a
                            href={p.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonClass("primary", "sm")}
                          >
                            <ExternalLink aria-hidden="true" className="size-4" /> Live demo
                          </a>
                        )}
                      </div>
                    )}

                    {editMode && (
                      <div className="mt-4">
                        <AdminToolbar
                          label={p.title}
                          visible={p.is_visible}
                          onEdit={() => setEditing({ item: p })}
                          onToggle={(v) => setProjectVisible(p.id, v)}
                          onDelete={() => deleteProject(p.id)}
                        />
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        wide
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing?.item ? "Edit project" : "New project"}
      >
        {editing && (
          <ProjectForm
            key={editing.item?.id ?? "new"}
            initial={editing.item}
            onDone={() => setEditing(null)}
          />
        )}
      </Modal>
    </section>
  );
}
