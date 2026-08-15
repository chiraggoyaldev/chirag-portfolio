"use client";

import { useState } from "react";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const field =
  "w-full rounded-md border border-border-hi bg-surface-2 px-3.5 py-2.5 text-sm text-text " +
  "placeholder:text-dim transition-colors duration-200 focus:border-accent/50 focus:outline-none " +
  "disabled:opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const busy = status.kind === "sending";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !json?.ok) {
        setStatus({
          kind: "error",
          message: json?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and retry.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        // Announced to screen readers when it replaces the form.
        role="status"
        className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent/10 p-5"
      >
        <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
        <div>
          <p className="font-medium text-accent">Message sent.</p>
          <p className="mt-1 text-sm text-muted">
            Thanks — I&apos;ll get back to you within a day or two.{" "}
            <button
              type="button"
              onClick={() => setStatus({ kind: "idle" })}
              className="text-accent underline underline-offset-2 hover:text-accent-hi"
            >
              Send another
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-cmd mb-2 block text-dim">
            name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            disabled={busy}
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="label-cmd mb-2 block text-dim">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            disabled={busy}
            placeholder="you@company.com"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label-cmd mb-2 block text-dim">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={5000}
          disabled={busy}
          placeholder="What are you building, and what's in the way?"
          className={cn(field, "resize-y")}
        />
      </div>

      {/* Honeypot. Hidden from people and from assistive tech; bots fill it in
          and get silently dropped server-side. Not `display:none`, which some
          bots specifically skip. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-300"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent/60 hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden className="size-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
