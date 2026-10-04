import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const control =
  "w-full rounded-[0.5rem] border border-static/60 bg-ink px-3 py-2 font-mono text-sm text-offwhite " +
  "placeholder:text-static/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crt";

type Base = { label: string; hint?: string };

/** Label above input, hint below. No floating labels (design.md). */
export function TextField({ label, hint, className = "", ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-base uppercase tracking-wider text-beige">
        {label}
      </label>
      <input id={id} className={control} aria-describedby={hint ? `${id}-hint` : undefined} {...rest} />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 font-mono text-xs text-static">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  hint,
  className = "",
  ...rest
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-base uppercase tracking-wider text-beige">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={control}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...rest}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 font-mono text-xs text-static">
          {hint}
        </p>
      )}
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="font-mono text-sm text-tape">
      {message}
    </p>
  );
}

/** "a, b , c" -> ["a","b","c"] */
export function splitList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
