import { useId } from "react";
import type { Locale } from "@/lib/i18n";

type FlagProps = { locale: Locale; size?: number; className?: string };

// Round flags beside the language names in the language menu. Decorative:
// the language name next to each flag is what assistive technology reads.
// English uses the UK flag, as the English copy is British English.
export function Flag({ locale, size = 20, className }: FlagProps) {
  const id = useId();
  const svg = { className, width: size, height: size, "aria-hidden": true } as const;

  if (locale === "es") {
    return (
      <svg {...svg} viewBox="0 0 30 30">
        <rect width="30" height="30" fill="#aa151b" />
        <rect y="7.5" width="30" height="15" fill="#f1bf00" />
      </svg>
    );
  }

  if (locale === "fr") {
    return (
      <svg {...svg} viewBox="0 0 30 30">
        <rect width="10" height="30" fill="#002395" />
        <rect x="10" width="10" height="30" fill="#fff" />
        <rect x="20" width="10" height="30" fill="#ed2939" />
      </svg>
    );
  }

  // Union Jack (60×30), cropped to its centre square.
  return (
    <svg {...svg} viewBox="15 0 30 30">
      <clipPath id={id}>
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${id})`} stroke="#c8102e" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}
