"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { registerVisit } from "@/app/actions/visits";

const VisitContext = createContext<number>(0);

/** Registers this session's visit once and shares the total with Navbar and Footer. */
export function VisitProvider({
  initial,
  children,
}: {
  initial: number;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    let active = true;
    registerVisit()
      .then((n) => {
        if (active) setCount(n);
      })
      .catch(() => {
        // Counter is cosmetic; keep the server-rendered value.
      });
    return () => {
      active = false;
    };
  }, []);

  return <VisitContext.Provider value={count}>{children}</VisitContext.Provider>;
}

export function useVisitCount(): number {
  return useContext(VisitContext);
}
