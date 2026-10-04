"use client";

import { useState } from "react";
import { Briefcase, Plus } from "lucide-react";
import {
  deleteExperience,
  setExperienceVisible,
} from "@/app/actions/experiences";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminToolbar } from "@/components/admin/AdminToolbar";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { Reveal } from "@/components/effects/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Experience as ExperienceItem } from "@/lib/data";
import { formatPeriod } from "@/lib/format";
import { SectionHeading } from "./SectionHeading";

type Editing = { item: ExperienceItem | null } | null;

export function Experience({ items }: { items: ExperienceItem[] }) {
  const { editMode } = useAdmin();
  const [editing, setEditing] = useState<Editing>(null);
  const shown = editMode ? items : items.filter((i) => i.is_visible);

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="experience-title" index="02" title="Work Experience" />
          {editMode && (
            <Button size="sm" onClick={() => setEditing({ item: null })}>
              <Plus aria-hidden="true" className="size-4" /> Add experience
            </Button>
          )}
        </div>

        {shown.length === 0 ? (
          <EmptyState />
        ) : (
          <ol className="relative mt-12 border-l-2 border-charcoal md:ml-40">
            {shown.map((item, i) => (
              <li key={item.id} className="relative mb-10 pl-6 last:mb-0 md:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[7px] top-2 size-3 ${
                    item.period_end ? "bg-static" : "bg-crt shadow-[0_0_8px_#33ff00]"
                  }`}
                />
                <Reveal index={i}>
                  <p className="font-mono text-xs uppercase tracking-widest text-amber md:absolute md:-left-40 md:top-1 md:w-32 md:text-right">
                    {formatPeriod(item.period_start, item.period_end)}
                  </p>
                  <article
                    className={`pixel-border mt-2 rounded-[0.5rem] bg-panel p-5 md:mt-0 ${
                      item.is_visible ? "" : "opacity-50"
                    }`}
                  >
                    <h3 className="text-2xl text-offwhite">{item.role}</h3>
                    <p className="text-lg text-crt">@ {item.company}</p>
                    {item.description && (
                      <p className="mt-3 max-w-[72ch] whitespace-pre-line text-beige">
                        {item.description}
                      </p>
                    )}
                    {item.tech_stack.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                        {item.tech_stack.map((t) => (
                          <li key={t}>
                            <Badge tone="static">{t}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                    {editMode && (
                      <div className="mt-4">
                        <AdminToolbar
                          label={item.role}
                          visible={item.is_visible}
                          onEdit={() => setEditing({ item })}
                          onToggle={(v) => setExperienceVisible(item.id, v)}
                          onDelete={() => deleteExperience(item.id)}
                        />
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </div>

      <Modal
        wide
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing?.item ? "Edit experience" : "New experience"}
      >
        {editing && (
          <ExperienceForm
            key={editing.item?.id ?? "new"}
            initial={editing.item}
            onDone={() => setEditing(null)}
          />
        )}
      </Modal>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 border-2 border-dashed border-charcoal p-10 text-center">
      <Briefcase aria-hidden="true" className="size-8 text-static" />
      <p className="text-lg text-static">No work history loaded on this tape yet.</p>
    </div>
  );
}
