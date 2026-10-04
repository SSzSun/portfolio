"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AdminState = {
  /** Server-verified admin session. */
  isAdmin: boolean;
  /** Customizer controls visible (admin only). */
  editMode: boolean;
  setEditMode: (on: boolean) => void;
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
};

const AdminContext = createContext<AdminState | null>(null);

export function AdminProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const [editMode, setEditMode] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Coming back from the magic link (?admin=1) turns the customizer on.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("admin") || url.searchParams.has("auth_error")) {
      if (isAdmin && url.searchParams.has("admin")) setEditMode(true);
      url.searchParams.delete("admin");
      url.searchParams.delete("auth_error");
      window.history.replaceState(null, "", url.pathname + url.hash);
    }
  }, [isAdmin]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        editMode: isAdmin && editMode,
        setEditMode,
        loginOpen,
        setLoginOpen,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminState {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
