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
        className="relative h-5 w-9 rounded-sm border-2 border-static bg-ink"
      >
        <span
          className={`absolute top-0.5 size-3 bg-beige transition-transform duration-200 ${
            checked ? "translate-x-[1.1rem]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="font-mono text-xs uppercase text-static">
        {checked ? "On" : "Off"}
      </span>
    </button>
  );
}
