"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  text: string;
  speedMs?: number;
  className?: string;
};

/** Command-line style typing effect. Full text is always exposed to screen readers. */
export function TypewriterText({ text, speedMs = 55, className }: Props) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speedMs);
    return () => window.clearInterval(id);
  }, [text, speedMs, reduce]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        <span className="cursor-blink">_</span>
      </span>
    </span>
  );
}
