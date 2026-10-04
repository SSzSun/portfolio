"use client";

import { useState, useTransition } from "react";
import { requestMagicLink } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { FormError, TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { useAdmin } from "./AdminProvider";

export function LoginDialog() {
  const { loginOpen, setLoginOpen } = useAdmin();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const close = () => {
    setLoginOpen(false);
    setSent(false);
    setError(null);
  };

  return (
    <Modal open={loginOpen} onClose={close} title="Admin access">
      {sent ? (
        <p className="text-lg text-beige">
          If that address is authorized, a sign-in link is on its way. Check your inbox.
        </p>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            startTransition(async () => {
              const res = await requestMagicLink(email);
              if (res.ok) setSent(true);
              else setError(res.error);
            });
          }}
        >
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormError message={error} />
          <Button type="submit" disabled={pending}>
            {pending ? "Sending..." : "Send magic link"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
