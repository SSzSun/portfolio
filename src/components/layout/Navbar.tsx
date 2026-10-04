"use client";

import { useEffect, useState } from "react";
import { LogIn, LogOut, Menu, SlidersHorizontal, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { useAdmin } from "@/components/admin/AdminProvider";
import { signOut } from "@/app/actions/auth";
import { VisitorBadge } from "./VisitorBadge";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");
  const { isAdmin, editMode, setEditMode, setLoginOpen } = useAdmin();

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-[100] border-b-2 border-charcoal bg-ink/90 backdrop-blur">
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#about" className="glow text-2xl text-crt">
          {">"} {site.nickname.toUpperCase()}.SYS
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`relative text-lg uppercase tracking-wider transition-colors hover:text-crt ${
                  active === l.href ? "text-crt" : "text-beige"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-0.5 w-full bg-crt" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <VisitorBadge className="hidden sm:inline-flex" />
          <AdminControls
            isAdmin={isAdmin}
            editMode={editMode}
            onToggleEdit={() => setEditMode(!editMode)}
            onLogin={() => setLoginOpen(true)}
          />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-crt md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t-2 border-charcoal bg-ink md:hidden">
          <ul className="container-x flex flex-col py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-xl uppercase tracking-wider ${
                    active === l.href ? "text-crt" : "text-beige"
                  }`}
                >
                  {">"} {l.label}
                </a>
              </li>
            ))}
            <li className="py-3 sm:hidden">
              <VisitorBadge />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function AdminControls({
  isAdmin,
  editMode,
  onToggleEdit,
  onLogin,
}: {
  isAdmin: boolean;
  editMode: boolean;
  onToggleEdit: () => void;
  onLogin: () => void;
}) {
  const iconBtn =
    "inline-flex size-9 items-center justify-center border-2 transition-colors cursor-pointer";

  if (!isAdmin) {
    return (
      <button
        type="button"
        onClick={onLogin}
        aria-label="Admin sign in"
        title="Admin sign in"
        className={`${iconBtn} border-charcoal text-static hover:border-static hover:text-crt`}
      >
        <LogIn aria-hidden="true" className="size-4" />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={onToggleEdit}
        aria-pressed={editMode}
        aria-label="Toggle customizer"
        title="Toggle customizer"
        className={`${iconBtn} ${
          editMode ? "border-amber bg-amber/15 text-amber" : "border-charcoal text-static hover:text-amber"
        }`}
      >
        <SlidersHorizontal aria-hidden="true" className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => void signOut()}
        aria-label="Sign out"
        title="Sign out"
        className={`${iconBtn} border-charcoal text-static hover:border-tape hover:text-tape`}
      >
        <LogOut aria-hidden="true" className="size-4" />
      </button>
    </>
  );
}
