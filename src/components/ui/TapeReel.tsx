/** Decorative spinning cassette reel. */
export function TapeReel({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`reel ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="32" cy="32" r="29" />
      <circle cx="32" cy="32" r="8" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="12"
          x2="32"
          y2="22"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </svg>
  );
}
