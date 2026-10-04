"use client";

import { Eye } from "lucide-react";
import { useVisitCount } from "./VisitProvider";

/** LED dot-matrix style counter, zero-padded to 6 digits. */
export function VisitorBadge({ className = "" }: { className?: string }) {
  const count = useVisitCount();
  const digits = String(count).padStart(6, "0");

  return (
    <span
      className={`inline-flex items-center gap-2 border-2 border-charcoal bg-ink px-2 py-0.5 ${className}`}
      title="Total visits"
    >
      <Eye aria-hidden="true" className="size-4 text-amber" />
      <span className="sr-only">Total visits:</span>
      <span className="glow-amber font-mono text-sm tabular-nums tracking-[0.2em] text-amber">
        {digits}
      </span>
    </span>
  );
}
