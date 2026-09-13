type IconProps = { className?: string };

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" {...stroke} />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4v11m-4.5-4.5L10 15l4.5-4.5" {...stroke} />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" {...stroke} />
    </svg>
  );
}

export function FlagIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" {...stroke} strokeWidth={1.3} />
      <path d="M8 4.9v3.6" {...stroke} />
      <circle cx="8" cy="11.1" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 4.5h6v6M11.5 4.5l-7 7" {...stroke} />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 3.5v9M10.5 3.5v9" {...stroke} strokeWidth={1.8} />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 3.6v8.8a.5.5 0 0 0 .77.42l6.6-4.4a.5.5 0 0 0 0-.84l-6.6-4.4A.5.5 0 0 0 5 3.6Z" fill="currentColor" />
    </svg>
  );
}
