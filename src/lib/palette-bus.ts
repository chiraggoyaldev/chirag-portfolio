/**
 * Tiny event bus so any component can open the ⌘K palette without threading a
 * context provider through the tree.
 */
const EVENT = "portfolio:open-palette";

export function openPalette() {
  window.dispatchEvent(new Event(EVENT));
}

export function onOpenPalette(handler: () => void) {
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
