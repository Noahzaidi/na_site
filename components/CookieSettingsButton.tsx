"use client";

import type { ReactNode } from "react";
import { openCookieSettings } from "@/lib/consent";

/** Reopens the cookie settings dialog from anywhere (footer, privacy policy). */
export function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      {children}
    </button>
  );
}
