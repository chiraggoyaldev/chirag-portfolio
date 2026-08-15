"use client";

import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { sections } from "@/lib/sections";
import { site } from "@/lib/content";
import { onOpenPalette } from "@/lib/palette-bus";

/**
 * ⌘K palette. A shortcut for people who like shortcuts — every action in here
 * is also a visible link or button somewhere on the page, so nothing is only
 * reachable through it.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ⌘K / Ctrl+K toggles.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => onOpenPalette(() => setOpen(true)), []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    // Let the dialog finish closing before we move the viewport or focus.
    requestAnimationFrame(fn);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the mailto action still works.
    }
  }, []);

  const socialLinks = [
    {
      key: "github",
      label: "GitHub",
      icon: GithubIcon,
      href: site.socials.github,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: LinkedinIcon,
      href: site.socials.linkedin,
    },
    { key: "x", label: "X / Twitter", icon: XIcon, href: site.socials.x },
  ].filter((s) => s.href);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      overlayClassName="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18vh] z-50 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border-hi bg-surface shadow-[0_32px_100px_-20px_rgb(0_0_0/0.95)]"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <span aria-hidden className="font-mono text-sm text-accent">
          $
        </span>
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full bg-transparent py-4 font-mono text-sm text-text outline-none placeholder:text-dim"
        />
      </div>

      <Command.List className="max-h-[52vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center font-mono text-sm text-dim">
          No matches.
        </Command.Empty>

        <Command.Group
          heading="Navigate"
          className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-dim"
        >
          {sections.map((s) => (
            <Command.Item
              key={s.id}
              value={`${s.nav} ${s.title} ${s.command}`}
              onSelect={() =>
                run(() => {
                  window.location.hash = s.id;
                })
              }
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
            >
              <ArrowRight className="size-4 shrink-0 text-dim" />
              <span>{s.nav}</span>
              <span className="ml-auto text-xs text-dim">{s.index}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="CV"
          className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-dim"
        >
          <Command.Item
            value="download cv resume pdf"
            onSelect={() =>
              run(() => {
                const a = document.createElement("a");
                a.href = site.cv;
                a.download = "";
                a.click();
              })
            }
            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
          >
            <Download className="size-4 shrink-0 text-dim" />
            Download CV (PDF)
          </Command.Item>

          <Command.Item
            value="view cv resume online browser"
            onSelect={() =>
              run(() => {
                window.open("/resume", "_blank", "noopener,noreferrer");
              })
            }
            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
          >
            <FileText className="size-4 shrink-0 text-dim" />
            View CV in browser
          </Command.Item>
        </Command.Group>

        <Command.Group
          heading="Contact"
          className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-dim"
        >
          <Command.Item
            value="email send mail contact"
            onSelect={() =>
              run(() => {
                window.location.href = `mailto:${site.email}`;
              })
            }
            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
          >
            <Mail className="size-4 shrink-0 text-dim" />
            Send me an email
          </Command.Item>

          <Command.Item
            value="copy email address clipboard"
            onSelect={copyEmail}
            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
          >
            {copied ? (
              <Check className="size-4 shrink-0 text-accent" />
            ) : (
              <Copy className="size-4 shrink-0 text-dim" />
            )}
            {copied ? "Copied to clipboard" : "Copy email address"}
          </Command.Item>
        </Command.Group>

        {socialLinks.length > 0 && (
          <Command.Group
            heading="Elsewhere"
            className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-dim"
          >
            {socialLinks.map(({ key, label, icon: Icon, href }) => (
              <Command.Item
                key={key}
                value={label}
                onSelect={() =>
                  run(() => {
                    window.open(href, "_blank", "noopener,noreferrer");
                  })
                }
                className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-text"
              >
                <Icon className="size-4 shrink-0 text-dim" />
                {label}
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>

      <div className="flex items-center gap-4 border-t border-border bg-surface-2 px-4 py-2.5">
        <Hint keys="↑ ↓" label="navigate" />
        <Hint keys="↵" label="select" />
        <Hint keys="esc" label="close" />
      </div>
    </Command.Dialog>
  );
}

function Hint({ keys, label }: { keys: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-dim">
      <kbd className="rounded border border-border-hi bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
        {keys}
      </kbd>
      {label}
    </span>
  );
}
