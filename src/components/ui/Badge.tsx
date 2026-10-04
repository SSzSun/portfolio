type Tone = "crt" | "amber" | "static";

const tones: Record<Tone, string> = {
  crt: "border-crt/60 text-crt",
  amber: "border-amber/60 text-amber",
  static: "border-static/60 text-static",
};

export function Badge({ children, tone = "crt" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 font-mono text-xs uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
