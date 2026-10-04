"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

/** Shows the contact email with a one-click copy button. */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied): the address stays visible to copy by hand.
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="break-all font-mono text-lg text-beige">{site.email}</span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex size-11 items-center justify-center border-2 border-charcoal text-beige transition-colors duration-200 hover:border-crt hover:text-crt"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-5 text-crt" />
        ) : (
          <Copy aria-hidden="true" className="size-5" />
        )}
      </button>
      <span role="status" aria-live="polite" className="font-mono text-xs uppercase text-crt">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
