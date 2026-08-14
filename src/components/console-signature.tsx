"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

/**
 * Easter egg for anyone who opens devtools — which, on a developer's portfolio,
 * is a decent share of the interesting visitors.
 */
export function ConsoleSignature() {
  useEffect(() => {
    const banner = [
      "┌──────────────────────────────────────────┐",
      "│                                          │",
      `│   ${site.name.toUpperCase().padEnd(38)} │`,
      `│   ${site.role.toLowerCase().padEnd(38)} │`,
      "│                                          │",
      "└──────────────────────────────────────────┘",
    ].join("\n");

    console.log(
      `%c${banner}`,
      "color:#4ade80;font-family:ui-monospace,monospace;line-height:1.2",
    );
    console.log(
      `%cNeed something like this built? %c${site.email}`,
      "color:#8f8f8f",
      "color:#4ade80;font-weight:600",
    );
  }, []);

  return null;
}
