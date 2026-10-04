"use client";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
};

/** Hardware-style toggle with an LED. */
export function Switch({ checked, onChange, label, disabled }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="group inline-flex cursor-pointer items-center gap-2 disabled:opacity-50"
    >
      <span
        aria-hidden="true"
        className={`size-2.5 rounded-full transition-colors ${
          checked ? "bg-crt shadow-[0_0_6px_#33ff00]" : "bg-charcoal"
        }`}
      />
      <span
        aria-hidden="true"
        className="relative block h-5 w-9 shrink-0 rounded-sm border-2 border-static bg-ink"
      >
        {/* Explicit left: buttons center text, which would shift an unpositioned thumb. */}
        <span
          className={`absolute top-0.5 left-0.5 size-3 transition-transform duration-200 ${
            checked ? "translate-x-4 bg-crt" : "translate-x-0 bg-beige"
          }`}
        />
      </span>
      <span className="font-mono text-xs uppercase text-static">
        {checked ? "On" : "Off"}
      </span>
    </button>
  );
}
