import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { ConsoleSignature } from "@/components/console-signature";

/**
 * Chrome for the portfolio itself. Lives in a route group so that `/resume`,
 * which is a printable document rather than a page of the site, renders
 * without a nav, footer or command palette wrapped around it.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-accent"
      >
        Skip to content
      </a>
      <span id="top" />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <CommandPalette />
      <ConsoleSignature />
    </>
  );
}
