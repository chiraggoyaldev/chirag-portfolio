"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/content";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard access can be denied; the mailto link is the fallback.
        }
      }}
      className="inline-flex items-center gap-2 rounded-md border border-border-hi bg-surface-2 px-3 py-2 font-mono text-xs text-muted transition-colors duration-200 hover:border-dim hover:text-text"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-accent" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copy address
        </>
      )}
    </button>
  );
}
