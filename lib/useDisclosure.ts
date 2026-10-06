import { type RefObject, useEffect } from "react";

/**
 * Header disclosures (mobile menu, language switcher) are native <details>, so
 * they work without JavaScript. This only adds Escape (closes and returns
 * focus to the summary), outside-click and close-on-link behaviour.
 */
export function useDisclosure(ref: RefObject<HTMLDetailsElement | null>) {
  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    const onDocumentClick = (event: MouseEvent) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false;
    };
    const onDetailsClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a")) details.open = false;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocumentClick);
    details.addEventListener("click", onDetailsClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onDocumentClick);
      details.removeEventListener("click", onDetailsClick);
    };
  }, [ref]);
}
