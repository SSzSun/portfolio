"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
};

/** Native <dialog> modal: focus trap, Escape and backdrop close come for free. */
export function Modal({ open, onClose, title, children, wide }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`pixel-border m-auto max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-[0.5rem] bg-panel p-0 text-offwhite backdrop:bg-ink/80 ${
        wide ? "max-w-3xl" : "max-w-md"
      }`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-charcoal bg-navy px-5 py-3">
        <h2 id={titleId} className="glow text-2xl text-crt">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex size-8 cursor-pointer items-center justify-center text-static hover:text-crt"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
